import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import logo from '../../../img/logo.png'
import './SplashNavigation.css'


function SplashNavigation() {
    const [formValue, setFormValue] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormValue('')
        history.push('/login')
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
                    <div className="dropdown">
                            <button className="dropbtn">ABOUT
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <a href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer" className='gh'>GitHub Repo</a>
                                <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer" className='li'>LinkedIn</a>
                            </div>
                        </div>
                        <Link className='login-button' to='/login'> LOG IN</Link>
                        <Link className='signup-button' to='/signup'> SIGN UP</Link>
                </div>

            </div>


        </div>
        </>
    )
}

export default SplashNavigation
