import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { newRecipes } from '../../../../store/recipe';
import { getAllRecipes } from '../../../../store/recipe';
import './AddRecipeForm.css'


const NewRecipeForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [category, setCategory] = useState("Breakfast")
    const [ingredient_one, setOne] = useState("")
    const [ingredient_two, setTwo] = useState("")
    const [ingredient_three, setThree] = useState("")
    const [ingredient_four, setFour] = useState("")
    const [ingredient_five, setFive] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handlePost = async (e) => {
        e.preventDefault()
        let user_id = user.id

        const newRecipe = await dispatch(newRecipes(name, description, instructions, category, ingredient_one, user_id))

        if(newRecipe.errors) {
            setErrors(newRecipe.errors)
        }

        else if (!newRecipe.errors) {

        if (ingredient_one){
            await fetch('/api/recipes/new/ingredient', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_one,
                    recipe_id: newRecipe.id
                })
            })
        }

        if (ingredient_two){
            await fetch('/api/recipes/new/ingredient', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_two,
                    recipe_id: newRecipe.id
                })
            })
        }

        if (ingredient_three){
            await fetch('/api/recipes/new/ingredient', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_three,
                    recipe_id: newRecipe.id
                })
            })
        }

        if (ingredient_four){
            await fetch('/api/recipes/new/ingredient', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_four,
                    recipe_id: newRecipe.id
                })
            })
        }

        if (ingredient_five){
            await fetch('/api/recipes/new/ingredient', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_five,
                    recipe_id: newRecipe.id
                })
            })
        }
        await dispatch(getAllRecipes())
        history.push(`/recipes/${newRecipe.id}`)
    }
    }

    return (
        <div className='new-recipe-form-container'>
            <form className='recipe-form-container' onSubmit={handlePost}>
                <h1 className='new-recipe-h1'>Add your budget recipe!</h1>
                <div >
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label className='new-recipe-label'> Recipe Name
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={name}
                            onChange={ e => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Description
                        <textarea
                            className='new-recipe-input'
                            type='text'
                            value={description}
                            onChange={ e => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Instructions
                        <textarea
                            className='new-recipe-input'
                            type='text'
                            value={instructions}
                            onChange={ e => setInstructions(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Choose a Category
                    <select className='new-recipe-select'  value={category} onChange={ e => setCategory(e.target.value)}>
                                <option  value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Soup">Soup</option>
                                <option value="Salad">Salad</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Ingredient (optional)
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={ingredient_one}
                            onChange={ e => setOne(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Ingredient (optional)
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={ingredient_two}
                            onChange={ e => setTwo(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Ingredient (optional)
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={ingredient_three}
                            onChange={ e => setThree(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Ingredient (optional)
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={ingredient_four}
                            onChange={ e => setFour(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className='new-recipe-label'> Ingredient (optional)
                        <input
                            className='new-recipe-input'
                            type='text'
                            value={ingredient_five}
                            onChange={ e => setFive(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button className='recipe-form-buttons' type='submit'>Add Recipe</button>
                </div>
            </form>
        </div>
    )
}

export default NewRecipeForm
