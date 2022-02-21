import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editingRecipe } from '../../../../store/recipe';
import { getAllRecipes } from '../../../../store/recipe';

const EditRecipeForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const recipes = useSelector(state => state.recipeState.entries)
    const target = recipes.find(single => single.id === +id)


    if (target) {
        localStorage.setItem('name', target.name)
        localStorage.setItem('description', target.description)
        localStorage.setItem('instructions', target.instructions)
        localStorage.setItem('category', target.categories[0]?.name)
        localStorage.setItem('one', target.ingredients[0]?.name)
        localStorage.setItem('two', target.ingredients[1]?.name)
        localStorage.setItem('three', target.ingredients[2]?.name)
        localStorage.setItem('four', target.ingredients[3]?.name)
        localStorage.setItem('five', target.ingredients[4]?.name)
    }


    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(localStorage.getItem('name'))
    const [description, setDescription] = useState(localStorage.getItem('description'))
    const [instructions, setInstructions] = useState(localStorage.getItem('instructions'))
    const [category, setCategory] = useState(localStorage.getItem('category'))
    const [ingredient_one] = useState(localStorage.getItem('one'))
    const [ingredient_two] = useState(localStorage.getItem('two'))
    const [ingredient_three] = useState(localStorage.getItem('three'))
    const [ingredient_four] = useState(localStorage.getItem('four'))
    const [ingredient_five] = useState(localStorage.getItem('five'))

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handlePost = async (e) => {
        e.preventDefault()
        let user_id = user.id
        const newRecipe = await dispatch(editingRecipe(name, description, instructions, category, ingredient_one, user_id, id))

        if(newRecipe.errors) {
            setErrors(newRecipe.errors)
        }

        else if (!newRecipe.errors) {

        if (ingredient_one !== 'undefined') {
            await fetch(`/api/recipes/ingredient/${target.ingredients[0]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_one,
                    recipe_id: id
                })
            })
        }

        if (ingredient_two !== 'undefined') {
            await fetch(`/api/recipes/ingredient/${target.ingredients[1]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_two,
                })
            })
        }

        if (ingredient_three !== 'undefined') {
            await fetch(`/api/recipes/ingredient/${target.ingredients[2]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_three,
                })
            })
        }

        if (ingredient_four !== 'undefined') {
            await fetch(`/api/recipes/ingredient/${target.ingredients[3]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_four,
                })
            })
        }

        if (ingredient_five !== 'undefined') {
            await fetch(`/api/recipes/ingredient/${target.ingredients[4]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_five,
                })
            })
        }

        await dispatch(getAllRecipes())
        history.push(`/recipes/${id}`)
    }
    }

    if(!target) {
        return (
            <h1>There's nothing here.</h1>
        )
    }

    return (
        <div className='new-recipe-form-container'>
            <form className='recipe-form-container' onSubmit={handlePost}>
                <h1 className='new-recipe-h1'>Edit your budget recipe!</h1>
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
                    <select className='new-recipe-select' value={category} onChange={ e => setCategory(e.target.value)}>
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
                    <button className='recipe-form-buttons' type='submit'>Edit Recipe</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipeForm
