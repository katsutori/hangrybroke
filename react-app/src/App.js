import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



// Import States
import * as sessionActions from './store/session';
import { getAllRecipes } from './store/recipe';

// Import non-auth components
import SplashNavigation from './components/Splash/Navigation';
import Footer from './components/Splash/Footer';
import SplashPage from './components/Splash/SplashPage';

// Import auth components
import HomeApp from './components/app/HomeApp';
import AppNavigation from './components/app/AppNavigation';
import SingleRecipe from './components/app/HomeApp/SingleRecipe';
import NewRecipeForm from './components/app/HomeApp/AddRecipeForm';
import EditRecipeForm from './components/app/HomeApp/EditRecipe';
import UploadPicture from './components/app/HomeApp/PhotoUpload';
import CategoryView from './components/app/HomeApp/CategoryView';
import SearchView from './components/app/HomeApp/SearchView';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    (async() => {
      await dispatch(sessionActions.authenticate()).then(() => setLoaded(true))
      await dispatch(getAllRecipes())
    })();
  }, [dispatch, loaded]);

  if (!user) {
    return (
      <BrowserRouter>
        <SplashNavigation />
          <Switch>
            <Route path='/' exact={true}>
              <SplashPage view='normal'/>
            </Route>
            <Route path='/login' exact={true}>
              <SplashPage view='login'/>
            </Route>
            <Route path='/signup' exact={true}>
              <SplashPage view='signup'/>
            </Route>
            <Route>
              <div className='category-container'>
                  <h1 className='category-h1'>Is not loading... Nada</h1>
              </div>
            </Route>
          </Switch>
        <Footer />
      </BrowserRouter>
    )
  }


  return loaded && (
    <BrowserRouter>
      <AppNavigation />
      <Switch>
        <Route path='/' exact={true}>
          <HomeApp />
        </Route>
        <Route path='/login' exact={true}>
          <SplashPage view='login'/>
        </Route>
        <Route path='/signup' exact={true}>
          <SplashPage view='signup'/>
        </Route>
        <Route path='/recipes/new' exact={true}>
          <NewRecipeForm />
        </Route>
        <Route path='/recipes/:id' exact={true}>
          <SingleRecipe />
        </Route>
        <Route path='/recipes/:id/edit' exact={true}>
          <EditRecipeForm />
        </Route>
        <Route path='/recipes/:id/photos/upload' exact={true}>
              <UploadPicture />
        </Route>
        <Route path='/categories/:id' exact={true}>
          <CategoryView />
        </Route>
        <Route path='/search/:id' exact={true}>
            <SearchView />
        </Route>
        <Route>
            <div className='category-container'>
                <h1 className='category-h1'>Is not loading... Nada</h1>
            </div>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
