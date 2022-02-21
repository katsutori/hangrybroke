import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editOneReview, getAllReviews } from '../../../../store/review';
import './EditReviewForm.css'

const EditReviewForm = ({reviewId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()
    const reviews = useSelector(state => state.reviewState.entries)
    const user = useSelector(state => state.session.user)
    const selected = reviews.find(one => one.id === reviewId)

    if(selected) {
        localStorage.setItem('rating', selected.rating)
        localStorage.setItem('review', selected.review)
    }

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(localStorage.getItem('rating'));
    const [review, setReview] = useState(localStorage.getItem('review'));

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: selected.id,
            rating: parseInt(rating, 10),
            review,
            recipeId: +id,
            userId: user.id
        }


        const editedReview = await dispatch(editOneReview(payload))


        if (editedReview.errors) {
            setErrors(editedReview.errors)
        }
        else if (!editedReview.errors) {
            await dispatch(getAllReviews(id))
            setRating(0)
            setReview("")
            history.push(`/recipes/${id}`)
        }
    }


    return (
        <div className='new-review-form-container'>
            <form onSubmit={handleSubmit}>
            <h1 className='single-h2 edit-h2'>Edit your cooking notes</h1>
                {errors.length ?
                <div className="error-container">
                    <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                    </ul>
                </div>
                :<></>}
                <label className="new-review-label" htmlFor="rating"> Rating
                <div className="rating" id="rating" onChange={e => setRating(e.target.value)}>
                        <input
                            className="star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value="5"
                            defaultChecked={parseInt(rating) === 5}
                        />
                        <label className="star star-1 star-label" htmlFor="star-1"></label>
                        <input
                            className="star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value="4"
                            defaultChecked={parseInt(rating) === 4}
                        />
                        <label className="star star-2 star-label" htmlFor="star-2"></label>
                        <input
                            className="star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value="3"
                            defaultChecked={parseInt(rating) === 3}
                        />
                        <label className="star star-3 star-label" htmlFor="star-3"></label>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value="2"
                            defaultChecked={parseInt(rating) === 2}
                        />
                        <label className="star star-4 star-label" htmlFor="star-4"></label>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value="1"
                            defaultChecked={parseInt(rating) === 1}
                        />
                        <label className="star star-5 star-label" htmlFor="star-5"></label>
                </div>
                </label>
                <div>
                    <label className="new-review-label"> Edit your thoughts on this recipe
                        <textarea
                            className='new-review-input'
                            id="review-text"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Review"
                        />
                    </label>
                </div>
                <div className='buttons-container'>
                    <button className='add-review-button' type='submit'>Submit Edit</button>

                </div>
            </form>
        </div>
    )
}

export default EditReviewForm
