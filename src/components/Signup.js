import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import { Link } from "react-router-dom";

import { useState } from "react";

const Signup = () => {


  const [registerSucessful, setRegisterSucessful] = useState(false)
  const [formData, setFormData] = useState( {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    repeatPassword: ''
  })

  const auth = getAuth();
  const analytics = getAnalytics();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const createUser = (e) => {

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed i

       updateProfile(auth.currentUser, {
        displayName: `${formData.name} ${formData.lastName}`
        })


        setRegisterSucessful(true)


      })   
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log( errorCode)
        if (errorCode === 'auth/email-already-in-use') showMessage('input-email', 'Email istnieje') 
      });
  };

  const check = (e) => {
    e.preventDefault()

    let error = 0

    const passwordRegex = new RegExp( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z0-9!@#$%^&*()?]{8,}$/);

    let xx = document.querySelectorAll('input')

    xx.forEach( (ele) => {
      console.log(ele.nextSibling, 'ddddd')

      const www = ele.nextSibling

      ele.nextSibling?.remove()

    })

    xx.forEach((ele) => {
      console.log(ele)
      
      if (ele.name === 'firstName' && formData.firstName === '') {
        ele.classList.add('red')
        error++
      }

      if (ele.name === 'lastName' && formData.lastName === '') {
        ele.classList.add('red')
        error++
      }
      if (ele.name === 'email') {
       const emailValid = emaiValidation()
       if (formData.email === '') {
        ele.classList.add('red')
        error++
      } else {
        if (!emailValid) {
          showMessage('input-email', 'Błędny adres email')
          error++
        }

      }
       
       
       
      }
      if (ele.name === 'password') {


        if (formData.password === '') {
          ele.classList.add('red')
          error++
        } else {
          if (!passwordStrong(formData.password)) {
            showMessage('input-password', 'Słaba siła hasła')
            error++
          }
        }

        ele.classList.add('red')
        error++
      }
      if (ele.name === 'repeatPassword') {
        const passVal = passwordValidation(formData.password, formData.repeatPassword)

        if (formData.password === '') {
          ele.classList.add('red')
          error++

        }

        if (!passVal) {
          showMessage('input-repeatpassword', 'Hasła  nie są zgodne')
          error++
        }

        
      }
      
      
    })
    
    console.log(error)
    
    if (error === 1) createUser(e)
    


  }

  const showMessage = (className, massage) => {
    const input = document.querySelector(`.${className}`)

    const element = document.createElement("p");

    const textNode = document.createTextNode(massage);

    element.appendChild(textNode);

    input.parentNode.appendChild(element);

  }

  const passwordValidation = (password, repeatPassword) => {


    return password === repeatPassword ? true : false

  }
  const passwordStrong = (password) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-]).{8,}$/


    return passwordRegex.test(password)

  }
  
  const emaiValidation = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    console.log(emailRegex.test(formData.email)) 
    return emailRegex.test(formData.email)
  }

  const passwordSame = () => {
    return formData.password === formData.repeatPassword ? true : false
  }

  if (registerSucessful) {
   return (
    <>
   <div className="signup-succesful">Udało się!
   
   <Link to='/'>Zaloguj się</Link>
   </div>
   </>
   )
  }

  return (
    <div className="signup">
      <h1>Załóż nowe konto</h1>
      <form onSubmit={(e) => (check(e))}>
        <div className="nameWrapper">
        
        <div className="wrapper">
        <input name="firstName" className="input-name" placeholder="Imię" value={formData.firstName} onChange={handleInputChange}></input>
        </div>
        <div className="wrapper">
        <input name="lastName" className="input-lastname" placeholder="Nazwisko" value={formData.lastName} onChange={handleInputChange}></input>
        </div>
        </div>
        
        <div className="wrapper">
        <input name="email" className="input-email" placeholder="Email" value={formData.email} onChange={handleInputChange}></input>
        </div>
        
        <div className="wrapper">
        <input name='password' className="input-password" type="password" placeholder="Hasło" value={formData.password} onChange={handleInputChange}></input>
        </div>
       
        <div className="wrapper">
        <input name='repeatPassword' className="input-repeatpassword" type="password" placeholder="Powtórz hasło" value={formData.repeatPassword} onChange={handleInputChange}></input>
        </div>
        <p>Posiadasz juź konto? <Link to='/' >
        Zaloguj się
      </Link></p>
        <button className="signup-submit" type="submit">Załóź konto</button>
      </form>
    </div>
  );
};


export default Signup;
