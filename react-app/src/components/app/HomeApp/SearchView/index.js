import React from 'react';
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

// Import components
import OneRoll from '../RecipeRoll/OneRoll';

const SearchView = () => {
    const {id} = useParams()
    const recipes = useSelector(state => state.recipeState.entries)
    let query = id;
    if (query.includes(' ')) {
        query = query.split(' ')
    } else {
        query = [query]
    }

    const selected = recipes?.filter(one => {
        for(let i = 0; i < query.length; i++) {
            if (one?.name?.toLowerCase().includes(query[i].toLowerCase())) {
                return one
            } else if (one?.name?.toLowerCase().includes(query[i].substring(0, 3).toLowerCase())) {
                return one
            } else if (one?.name?.toLowerCase().includes(query[i].substring(query[i].length - 3).toLowerCase())) {
                return one
            }
        }
    })

    if (!selected.length) {
        return (
            <div className='category-container'>
                <h1 className='category-h1'>Is not loading... Nada</h1>
            </div>
        )
    }

    return (
        <>
        <div className='category-container'>
            <h1 className='category-h1'>Search Result for: <span className='category-h1-span'>{id}</span></h1>
            {selected.length ? <div className='recipe-roll-container'>
                {selected.map((recipe, idx) => (
                    <OneRoll key={idx} recipe={recipe} />
                ))}
            </div>:<div className='category-empty'>There's nothing here. How about adding a recipe? <Link className='category-add-link' to='/recipes/new'>Contribute to this lonely place.</Link></div>}
        </div>
        </>
    )
}

export default SearchView
