import React from 'react'
import {Link} from 'react-router-dom'
import './OneRoll.css'

import placeholder from '../../../../../img/placeholder.jpg'

const OneRoll = ({recipe}) => {

    let rating = 0
    const ratings = recipe.reviews?.map(review => review.rating)
    if (ratings?.length) {
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }


    return (
        <div className='one-roll-container'>
            {recipe.photos.length ? <div className='one-roll-image' style={{backgroundImage: `url(${recipe.photos[0].url})`}}></div>:<div className='one-roll-image' style={{backgroundImage: `url(${placeholder})`}}></div>}
            <div className='one-roll-title'>
                <h2>{recipe.name}</h2>
                <p>By: {recipe.user.username}</p>
            </div>
            <div className='one-roll-bottom'>
                <span className="stars2" style={{"--rating": `${rating}`}}></span>
                <div><Link className='get-recipe-button' to={`/recipes/${recipe.id}`}>Get Recipe</Link></div>
            </div>
        </div>
    )
}


export default OneRoll
