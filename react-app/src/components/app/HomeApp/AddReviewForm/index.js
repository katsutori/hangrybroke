import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { newReview, getAllReviews } from '../../../../store/review';
import './AddReviewForm.css'

const AddReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [toggle, setToggle] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            rating: parseInt(rating),
            review,
            recipeId: id,
            userId: user.id
        }

        const newRev = await dispatch(newReview(payload))


        if (newRev.errors) {
            setErrors(newRev.errors)
        }
        else if (!newRev.errors) {
            await dispatch(getAllReviews(id))
            setRating(0)
            setReview("")
            setToggle(true)
            history.push(`/recipes/${id}`)
        }
    }


    return (
        <div className='new-review-form-container'>
            <form onSubmit={handleSubmit}>
            <h1 className='single-h2'>Cooking notes</h1>
                {errors.length ?
                <div className="error-container">
                    <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                    </ul>
                </div>
                :<></>}
                {toggle === false ? <label className="new-review-label" htmlFor="rating"> Rating
                <div className="rating" id="rating" onChange={e => setRating(e.target.value)}>
                        <input
                            className="star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value="5"
                        />
                        <label className="star star-1 star-label" htmlFor="star-1"></label>
                        <input
                            className="star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value="4"
                        />
                        <label className="star star-2 star-label" htmlFor="star-2"></label>
                        <input
                            className="star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value="3"
                        />
                        <label className="star star-3 star-label" htmlFor="star-3"></label>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value="2"
                        />
                        <label className="star star-4 star-label" htmlFor="star-4"></label>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value="1"
                        />
                        <label className="star star-5 star-label" htmlFor="star-5"></label>
                </div>
                </label>:<></>}
                <div>
                    {toggle === true ? <button className="new-review-label review-toggle" onClick={() => setToggle(!toggle)}>Leave your thoughts on this recipe? ▼</button>:<label className="new-review-label"> Leave your thoughts on this recipe
                        <textarea
                            className='new-review-input'
                            id="review-text"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Review"
                        />
                    </label>}
                </div>
                <div className='buttons-container'>
                    {toggle === false ? <button className='add-review-button' type='submit'>Add Review</button>:<></>}
                    {toggle === false ? <button className='add-review-button cancel-review' onClick={() => setToggle(!toggle)} type='button'>Cancel</button>:<></>}
                </div>
            </form>
        </div>
    )
}

export default AddReviewForm
