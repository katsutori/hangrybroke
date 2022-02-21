import React from 'react'
import {useSelector} from 'react-redux'

import OneRoll from './OneRoll'
import './RecipeRoll.css'

const RecipeRoll = () => {
    const recipes = useSelector(state=> state.recipeState.entries)

    if (!recipes) {
        return (
            <h1>Is loading...</h1>
        )
    }

    return (
        <div className='recipe-roll-container'>
            {recipes.map((recipe, idx) => (
                <OneRoll key={idx} recipe={recipe} />
            ))}
        </div>
    )
}

export default RecipeRoll
