import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'

// Import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

// Import states
import { getAllRecipes, removeRecipe } from '../../../../store/recipe'
import { getAllReviews, removeOneReview } from '../../../../store/review'
import { getAllIngredients } from '../../../../store/ingredient'
import { deleteIngredient } from '../../../../store/ingredient'
import placeholder from '../../../../img/placeholder.jpg'

// Import CSS
import './SingleRecipe.css'

// Import Components
import AddReviewForm from '../AddReviewForm'
import EditReviewForm from '../EditReviewForm'
import AddIngredientForm from '../AddIngredientForm'
import EditIngredientForm from '../EditIngredientForm'

const SingleRecipe = () => {
    const dispatch= useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipeState.entries)
    const ingredient = useSelector(state => state.ingredientState.entries)
    const reviews = useSelector(state => state.reviewState.entries)
    const target = recipes.find(single => single.id === +id)
    const singleReview = reviews.filter(single => single.recipe_id === +id)
    const ingredientSet = ingredient.filter(single => single.recipe_id === +id)
    const [working, setWorking] = useState(false)
    const [editing, setEditing] = useState(-1)
    const [ingredientEditing, setIngredientEditing] = useState(-1)

    let rating = 0;
    const ratings = singleReview?.map(review => review.rating)

    if (ratings?.length) {
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        setEditing(false)
    }, [reviews])

    useEffect(() => {
        setIngredientEditing(-1)
    }, [ingredient])

    useEffect(() => {
        (async() => {
            await dispatch(getAllRecipes())
            await dispatch(getAllReviews(id))
            await dispatch(getAllIngredients())
        })();
    }, [dispatch, id])

    const handleDeleteRecipe = async (e) => {
        e.preventDefault()
        await dispatch(removeRecipe(id))
        history.push('/')
    }

    const handleDeleteIngredient = (id) => async (e) => {
        e.preventDefault()
        await dispatch(deleteIngredient(id))
        await dispatch(getAllIngredients())
    }

    const handleDeleteReview = (delete_id) => async (e) => {
        e.preventDefault()

        let reviewToDeleteId = delete_id
        const payload = {
            reviewToDeleteId,
            recipeId: id
        }

        await dispatch(removeOneReview(payload))
    }

    if (!target) {
        return (
            <div className='category-container'>
                <h1 className='category-h1'>Is not loading... Nada</h1>
            </div>
        )
    }

    return (
        <div className='single-recipe-container'>
            <div className='single-meta'>
                <div className='single-title'>{target.name}</div>
                <div className='single-by'>By {target.user.username}</div>
            </div>
            <div className='single-photo'>
                <div>
                    <h2 className='single-h2'>{target.user.username}'s thoughts:</h2>
                    <p className='single-script'>{target.description}</p>
                </div>
                {target.photos.length ? <div className='single-photo-container' style={{backgroundImage: `url(${target.photos[0].url})`}}></div>:<div className='single-photo-container' style={{backgroundImage: `url(${placeholder})`}}></div>}
            </div>
            <div className='cat-reviews'>
                <div className='single-cat'><span className='single-span'>Category:</span> <Link className='single-link' to={`/categories/${target.categories[target.categories.length - 1].name}`}>{target.categories[target.categories.length - 1].name}</Link></div>
                <div className='single-stars'>
                    {user.id === target.user_id ? <Link className='delete-recipe-button' to={`/recipes/${id}/photos/upload`}>Upload Photo</Link>:<></>}
                    {user.id === target.user_id ? <Link className='delete-recipe-button' to={`/recipes/${id}/edit`}>Edit Recipe</Link>:<></>}
                    {user.id === target.user_id ? <button className='delete-recipe-button' onClick={handleDeleteRecipe}>Delete Recipe</button>:<></>}
                    <span className="stars" style={{"--rating": `${rating}`}}></span>
                    </div>
            </div>
            <div className='butt-section'>
                <div className='single-ingredients'>
                    <div className='ingredients-container ing-controls'>
                        <div className='ing-name ing-name-head'><h2 className='single-h2 ing-h2'>Ingredients: </h2></div>
                        <div className='ing-butt-cont'>{target.user_id === user.id ? <button className='ingredient-tool-toggle' onClick={() => setWorking(!working)}><FontAwesomeIcon icon={faPencil} className='fa-ing' /></button>:<></>}</div>
                    </div>
                    <div>
                    {ingredientSet?.map((one, idx) => (
                        <div key={idx}>
                            <div className='ingredients-container' key={idx}>
                                <div className='ing-name'>{one.name}</div>
                                <div className='ing-butt-cont'>
                                {working === true && ingredientEditing === idx &&  target.user_id === user.id ? <button onClick={() => setIngredientEditing(-1)} className='ing-butt'><FontAwesomeIcon icon={faXmark} className='fa-ing-close' /></button>:<></>}
                                {working === true && target.user_id === user.id ? <button onClick={() => setIngredientEditing(idx)} className='ing-butt'>Edit</button>:<></>}
                                {working === true && target.user_id === user.id ? <button onClick={handleDeleteIngredient(one.id)} className='ing-butt'>Delete</button>:<></>}
                                </div>
                            </div>
                            {working === true && ingredientEditing === idx && user.id === target.user_id ? <div><EditIngredientForm ingredientId={one.id} ingredientName={one.name}/></div>:<></>}
                        </div>
                    ))}
                    <div className='ingredients-container-add'>
                        {target.user_id === user.id ? <AddIngredientForm />:<></>}
                    </div>
                    </div>
                </div>
                <div>
                    <div className='cooking-instructions'>
                        <h2 className='single-h2'>Cooking Instructions:</h2>
                        <p>{target.instructions}</p>
                    </div>
                    <div className='reviews'>
                    <h2 className='single-h2'>Reviews:</h2>
                        {singleReview?.map((review, idx) => (
                            <div key={idx} className='one-review'>
                            <p className='review-by'><span className='review-by-span'>Review by:</span> {review.user?.username}</p>
                            <p key={idx}>{review.review}</p>
                                <div className='id-review'>
                                    {user.id === review.user_id ? <button onClick={() => setEditing(idx)} className='single-butts'>Edit</button>:<></>}
                                    {editing === idx && user.id === review.user_id ? <button onClick={() => setEditing(-1)} className='single-butts'>Cancel</button>:<></>}
                                    {user.id === review.user_id ? <button onClick={handleDeleteReview(review.id)} className='single-butts'>Delete</button>:<></>}
                                    <span className="stars" style={{"--rating": `${review.rating}`}}></span>
                                </div>
                                <div>{editing === idx && user.id === review.user_id ? <EditReviewForm reviewId={review.id}/>:<></>}</div>

                            </div>
                        ))}
                        <AddReviewForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRecipe
