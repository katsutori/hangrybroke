import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import LogoutButton from '../../auth/LogoutButton'

import logo from '../../../img/logo.png'
import './AppNavigation.css'

function AppNavigation() {
    const [formValue, setFormValue] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search/${formValue}`)
        setFormValue('')
    }

    return (
        <>
        <div className='main-logged'>
            <div className='main'>
                <div className='logo-nav'>
                    <Link to='/'><img className='header-logo' alt='logo' src={logo} /></Link>
                </div>
                <div className='search-form-nav'>
                    <form className='search-from' onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-nav-res' />
                        <input
                        value={formValue}
                        onChange={e=>setFormValue(e.target.value)}
                        className='search-input'
                        placeholder='What would you like to cook?'
                        />
                    </form>
                </div>
                <div className='splash-navigation'>
                    <Link className='recipe-button' to='/recipes/new'>ADD RECIPE</Link>
                    <div className="dropdown">
                            <button className="dropbtn">CATEGORIES
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <Link to='/categories/Breakfast'>Breakfast</Link>
                            <Link to='/categories/Lunch'>Lunch</Link>
                            <Link to='/categories/Dinner'>Dinner</Link>
                            <Link to='/categories/Dessert'>Dessert</Link>
                            <Link to='/categories/Soup'>Soup</Link>
                            <Link to='/categories/Salad'>Salad</Link>
                            <Link to='/categories/Drinks'>Drinks</Link>
                            </div>
                    </div>
                    <div className="dropdown">
                            <button className="dropbtn">ABOUT
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <a href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer" className='gh'>GitHub Repo</a>
                                <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer" className='li'>LinkedIn</a>
                            </div>
                    </div>
                        <LogoutButton className='login-button' />
                </div>

            </div>


        </div>
        </>
    )
}

export default AppNavigation
