import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getAllIngredients } from '../../../../store/ingredient';
import { editOneIngredient } from '../../../../store/ingredient';

import './EditIngredientForm.css'

const EditIngredientForm = ({ingredientId, ingredientName}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(ingredientName);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ingId: ingredientId,
            name
        }

        const editedIng = await dispatch(editOneIngredient(payload))


        if (editedIng.errors) {
            setErrors(editedIng.errors)
        }
        else if (!editedIng.errors) {
            await dispatch(getAllIngredients())
            history.push(`/recipes/${id}`)
        }
    }


    return (
        <div className='edit-ing-form-container'>
            <form className='new-ing-form' onSubmit={handleSubmit}>
                {errors.length ?
                <div className="error-container">
                    <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                    </ul>
                </div>
                :<></>}
                <div>
                    <label className="edit-review-label"> Edit an ingredient
                        <input
                            className='new-ing-input'

                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Ingredient"
                        />
                    </label>
                </div>
                <div className='edit-ing-buttons-container'>
                    <button className='edit-ing-button' type='submit'>Edit Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default EditIngredientForm
