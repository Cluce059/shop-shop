import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState"; 
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu({ setCategory }) {
  //const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  //const categories = categoryData?.categories || [];
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  
  //id cat data exists/is changed by usequery then run dispatch()
              // execute dispatch using action that determines the state of categories
    useEffect(() => {
        if (categoryData) {
            dispatch({
            type: UPDATE_CATEGORIES,
            categories: categoryData.categories
            });
              categoryData.categories.forEach(category => {
              idbPromise('categories', 'put', category);
              });
            } else if (!loading) {
               idbPromise('categories', 'get').then(categories => {
               dispatch({
                  type: UPDATE_CATEGORIES,
                  categories: categories
                });
               });
             }
           }, [categoryData, loading, dispatch]);

const handleClick = id => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: id
  });
};

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            setCategory(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
