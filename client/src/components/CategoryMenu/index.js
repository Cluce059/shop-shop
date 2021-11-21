import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState"; 
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu({ setCategory }) {
  //const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  //const categories = categoryData?.categories || [];
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  
useEffect(() => {
  //id cat data exists/is changed by usequery then run dispatch()
  if (categoryData) {
    // execute dispatch using action that determines the state of categories
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
  }
}, [categoryData, dispatch]);

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
