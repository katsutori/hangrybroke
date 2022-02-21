import React from 'react';
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

// Import components
import OneRoll from '../RecipeRoll/OneRoll';

import './CategoryView.css'

const CategoryView = () => {
    const {id} = useParams()
    const recipes = useSelector(state => state.recipeState.entries)
    const selected = recipes?.filter(one => one.categories[0].name === id)
    const cats = ["Lunch", "Breakfast", "Snack", "Dinner", "Soup", "Salad", "Drinks", "Dessert"]

    if (!selected || !cats.includes(id)) {
        return (
            <div className='category-container'>
                <h1 className='category-h1'>Is not loading... Nada</h1>
            </div>
        )
    }

    return (
        <>
        <div className='category-container'>
            <h1 className='category-h1'>Category: <span className='category-h1-span'>{id}</span></h1>
            {selected.length ? <div className='recipe-roll-container'>
                {selected.map((recipe, idx) => (
                    <OneRoll key={idx} recipe={recipe} />
                ))}
            </div>:<div className='category-empty'>There's nothing here. How about adding a recipe? <Link className='category-add-link' to='/recipes/new'>Contribute to this lonely place.</Link></div>}
        </div>
        </>
    )
}

export default CategoryView
