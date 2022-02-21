import { Link } from 'react-router-dom'
import './SplashImage.css'

import SignUpForm from '../../auth/SignUpForm'
import LoginForm from '../../auth/LoginForm'
import logo from '../../../img/landing.png'

function SplashImage({view}) {

    if (view === 'normal') {
        return (
            <div className='main-container'>
                <div className='splash-content'>

                    <div className='left'>
                    </div>

                    <div className='right'>
                        <div className='right-info-container'>
                            <img alt='landing logo' src={logo} />
                            <div className='blurb'>Broke Student's Choice</div>
                            <h1 className='blurb-h1'>Broke & Hangry's Classics</h1>
                            <p className='blurb-p'>Flavorful and cheap favorites from the archives <br></br> of broke college students.</p>
                            <Link className='log-buttons' to='/login'>LOG IN</Link>
                            <Link className='log-buttons' to='/signup'>SIGN UP</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    if (view === 'login') {
        return (
            <div className='main-container'>
                <div className='splash-content'>

                    <div className='left'>
                    </div>

                    <div className='right'>
                           <div className='right-info-container login-right'>
                            <p className='log-heading'>Log in to Broke & Hangry</p>
                            <p>Need to <Link className='log-heading' to='/signup'>SIGN UP</Link> for a Broke & Hangry account? </p>
                            <img alt='landing logo' src={logo} />
                            <LoginForm />
                           </div>

                    </div>

                </div>
            </div>
        )
    }

    if (view === 'signup') {
        return (
            <div className='main-container'>
                <div className='splash-content'>

                    <div className='left'>
                    </div>

                    <div className='right'>
                           <div className='right-info-container login-right'>
                            <p className='log-heading'>Sign Up for Broke & Hangry</p>
                            <p>Already have an account? <Link className='log-heading' to='/login'>LOG IN</Link></p>
                            <img alt='landing logo' src={logo} />
                            <SignUpForm />
                           </div>

                    </div>

                </div>
            </div>
        )
    }

}


export default SplashImage
