import { useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import './SplashPage.css'

import SplashImage from "../SplashImage";

function SplashPage({view}) {
    const sessionUser = useSelector(state => state.session.user)

    if(sessionUser) return (
        <Redirect to='/' />
    )

    return (
        <div className='splash-container'>

         <SplashImage view={view}/>

        </div>
    )
}


export default SplashPage
