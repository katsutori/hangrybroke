const LOAD_INGREDIENTS = 'ingredients/LOAD'
const REMOVE_INGREDIENTS = 'ingredients/REMOVE'
const ADD_INGREDIENTS = 'ingredients/ADD'
const EDIT_INGREDIENTS = 'ingredients/EDIT'

export const editIngredients = payload => {
    return {
        type: EDIT_INGREDIENTS,
        payload
    }
}

export const addIngredients = payload => {
    return {
        type: ADD_INGREDIENTS,
        payload
    }
}

export const loadIngredients = payload => {
    return {
        type: LOAD_INGREDIENTS,
        payload
    }
}

export const removeIngredient = payload => {
    return {
        type: REMOVE_INGREDIENTS,
        payload
    }
}

export const addNewIngredient = payload => async dispatch => {

    const response = await fetch(`/api/ingredients`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newIng = await response.json()
        dispatch(addIngredients(newIng))
        return newIng
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const deleteIngredient = ingredient => async dispatch => {
    const response = await fetch(`/api/ingredients/delete/${ingredient}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(removeIngredient(deleted))
    }
}

export const getAllIngredients = recipeId => async dispatch => {
    const response = await fetch (`/api/ingredients`)

    if (response.ok) {
        const ingreds = await response.json()
        dispatch(loadIngredients(ingreds))
        return ingreds
    }
}

export const editOneIngredient = payload => async dispatch => {
    const response = await fetch(`/api/ingredients/${payload.ingId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const editedIng = await response.json()
        dispatch(editIngredients(editedIng))
        return editedIng
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

const initialState = { entries: []}

const ingredientReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_INGREDIENTS:
            return { ...state, entries: [...action.payload.data]}
        case REMOVE_INGREDIENTS:
            newState = {...state}
            delete newState[action.payload]
            return newState
        case EDIT_INGREDIENTS:
            return { ...state, [action.payload.id]: action.id}

        default:
            return state
    }
}

export default ingredientReducer
