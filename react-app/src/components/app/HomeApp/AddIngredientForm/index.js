import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getAllIngredients } from '../../../../store/ingredient';
import { addNewIngredient } from '../../../../store/ingredient';

import './AddIngredient.css'

const AddIngredientForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const [errors, setErrors] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [toggle, setToggle] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: ingredient,
            recipe_id: +id
        }

        const newIng = await dispatch(addNewIngredient(payload))


        if (newIng.errors) {
            setErrors(newIng.errors)
        }
        else if (!newIng.errors) {
            await dispatch(getAllIngredients())
            setIngredient("")
            setToggle(true)
            history.push(`/recipes/${id}`)
        }
    }


    return (
        <div className='new-ing-form-container'>
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
                    {toggle === true ? <button className="new-review-label ing-toggle" onClick={() => setToggle(!toggle)}>Add an ingredient? ▼</button>:<label className="new-review-label"> Add an ingredient
                        <input
                            className='new-ing-input'

                            value={ingredient}
                            onChange={e => setIngredient(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Ingredient"
                        />
                    </label>}
                </div>
                <div className='ing-buttons-container'>
                    {toggle === false ? <button className='add-ing-button' type='submit'>Add Ingredient</button>:<></>}
                    {toggle === false ? <button className='add-ing-button cancel-review' onClick={() => setToggle(!toggle)} type='button'>Cancel</button>:<></>}
                </div>
            </form>
        </div>
    )
}

export default AddIngredientForm
