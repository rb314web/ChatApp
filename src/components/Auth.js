import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import { ReactComponent as GoogleSvg } from '../logo googleg 48dp.svg'

import Cookies from 'universal-cookie'
const cookies = new Cookies

export const Auth = (props) => {
    const {setIsAuth} = props

    const singWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider)
        console.log(result)
        cookies.set('auth-token', result.user.refreshToken)
        setIsAuth(true)
    }

    return (
        <div className="auth">
            <h1 className="auth-header">Zaloguj z Google</h1>
            <button className="auth-button" onClick={singWithGoogle}><GoogleSvg/>Zaloguj się!</button>
        </div>
    )
}