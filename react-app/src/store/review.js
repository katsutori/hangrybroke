const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const EDIT_REVIEW = 'reviews/EDIT'
const DELETE_REVIEW = 'reviews/DELETE'

export const loadReviews = payload => {
    return {
        type: LOAD_REVIEWS,
        payload
    }
}

export const addReview = payload => {
    return {
        type: ADD_REVIEW,
        payload
    }
}

export const editReview = payload => {
    return {
        type: EDIT_REVIEW,
        payload
    }
}

export const deleteReview = payload => {
    return {
        type: DELETE_REVIEW,
        payload
    }
}

export const getAllReviews = recipeId => async dispatch => {

    const response = await fetch (`/api/recipe/${recipeId}/reviews/`)

    if (response.ok) {
        const reviews = await response.json()

        dispatch(loadReviews(reviews))
        return reviews
    }
}

export const newReview = (payload) => async dispatch => {

    const response = await fetch(`/api/recipe/${payload.recipeId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newRev = await response.json()

        dispatch(addReview(newRev))
        return newRev
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const editOneReview = payload => async dispatch => {

    const response = await fetch(`/api/recipe/${payload.recipeId}/reviews/${payload.id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const editedRev = await response.json()
        dispatch(editReview(editedRev))
        return editedRev
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const removeOneReview = payload => async dispatch => {

    const response = await fetch(`/api/recipe/${payload.recipeId}/reviews/${payload.reviewToDeleteId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const deleteMessage = await response.json()

        dispatch(deleteReview(payload))
        return deleteMessage
    }
}

const initialState = { entries: [] }

const reviewReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, entries: [...action.payload.reviews]}
        case ADD_REVIEW:
            newState = { ...state }


            return { ...newState }
        case EDIT_REVIEW:
            newState = { ...state }

            return { ...newState }
        case DELETE_REVIEW:
            newState = { ...state }

            let target = action.payload.reviewToDeleteId
            let removing = newState.entries.find(review => review.id === target)
            let idx = newState.entries.indexOf(removing)

            let stateHalf1 = newState.entries.slice(0, idx)
            let stateHalf2 = newState.entries.slice(idx + 1)

            return { ...newState, entries: [...stateHalf1, ...stateHalf2] }
        default:
            return state;
    }
}

export default reviewReducer
