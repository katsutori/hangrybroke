import React, {useEffect} from 'react'
import { useDispatch} from 'react-redux'

// Import components
import { getAllRecipes } from '../../../store/recipe'
import FeaturedRecipe from './Featured'
import RecipeRoll from './RecipeRoll'
import './HomeApp.css'


const HomeApp = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
          await dispatch(getAllRecipes())
        })();
      }, [dispatch]);

    return (
        <>
            <div className='home-container'>
                <FeaturedRecipe />
                <RecipeRoll />
            </div>
        </>
    )
}


export default HomeApp
