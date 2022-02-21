import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import './Featured.css'
import placeholder from '../../../../img/placeholder.jpg'
import fbg from '../../../../img/fbg.jpg'


const FeaturedRecipe = () => {
    const recipes = useSelector(state=> state.recipeState.entries)
    const converted = Object.values(recipes)
    const max = Object.values(recipes).length - 1
    const target = converted[Math.floor(Math.random() * max)]


    let rating = 0;
    const ratings = target?.reviews?.map(review => review.rating)
    if (ratings?.length) {
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }


    if (!target) {
        return (
            <h1>Is loading...</h1>
        )
    }

    if (!target.photos.length) {
        return (
            <>
                <div className='featured-container' style={{backgroundImage: `url(${fbg})`}}>
                    <div className='featured-left' style={{backgroundImage: `url(${placeholder})`}}></div>
                    <div className='featured-right'>
                        <div>
                        <h2>Featured Recipe</h2>
                        <p>{target.name}</p>
                        <h3>Description</h3>
                        <p className='featured-p'>{target.description}</p>
                        </div>
                        <div className='right-bottom'>
                        <p className='right-bottom-ele'><strong>By:</strong> {target.user.username}</p>
                        {target.reviews.length === 1 ? <p className='right-bottom-ele'>{target.reviews.length} review</p>:<p className='right-bottom-ele'>{target.reviews.length} reviews</p>}
                        <p className='right-bottom-ele'><span className="stars" style={{"--rating": `${rating}`}}></span></p>
                        <Link className='featured-button' to={`/recipes/${target.id}`}>Start Cookin'</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <div className='featured-container' style={{backgroundImage: `url(${fbg})`}}>
                <div className='featured-left' style={{backgroundImage: `url(${target.photos[0]?.url})`}}></div>
                <div className='featured-right'>
                    <div>
                    <h2>Broke <span className='span'>&</span> Hangry's</h2>
                    <h2 className='baby-header'>Featured Recipe</h2>
                    <p>{target.name}</p>
                    <h3 className='featured-h3'>Description</h3>
                    <p className='featured-p'>{target.description}</p>
                    </div>
                    <div className='right-bottom'>
                    <p className='right-bottom-ele'><span className='submit-by'>Submitted by:</span> {target.user.username}</p>
                    <p className='right-bottom-ele'>{target.reviews.length} reviews</p>
                    <p className='right-bottom-ele'><span className="stars" style={{"--rating": `${rating}`}}></span></p>
                    <Link className='featured-button' to={`/recipes/${target.id}`}>Start Cookin'</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedRecipe
