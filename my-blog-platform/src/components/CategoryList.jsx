import React from 'react';

import CategoryItem from './CategoryItem';



const CategoryList = () => {
    
  const categories = [
    { title: 'AcademicResources', url: '/DisplayPost/filter/AcademicResources' },
    { title: 'CareerServices', url: '/DisplayPost/filter/CareerServices' },
    { title: 'Campus', url: '/DisplayPost/filter/Campus' },
    { title: 'Culture', url: '/DisplayPost/filter/Culture' },
    { title: 'Local', url: '/DisplayPost/filter/Local' },
    { title: 'Social', url: '/DisplayPost/filter/Social' },
    { title: 'Sports', url: '/DisplayPost/filter/Sports' },
    { title: 'Health', url: '/DisplayPost/filter/Health' },
    { title: 'Technology', url: '/DisplayPost/filter/Technology' },
    { title: 'Travel', url: '/DisplayPost/filter/Travel' },
    { title: 'Alumni', url: '/DisplayPost/filter/Alumni' },
  ];

  return (
    <div className="category-list">
      {categories.map((category, index) => (
          <CategoryItem key={index} title={category.title} />
      ))}
    </div>
  );
};

export default CategoryList;
