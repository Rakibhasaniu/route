import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Signup.css';



const Signup = () => {
    const[error, setError] = useState(null);

    const{createUser} = useContext(AuthContext);


    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);
        if(password.length < 6){
            setError('Password Must Be 6 Character Long');
            return;
        }

        if(password !== confirm){
            setError('Your Password didn,t match');
            return;
        }
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch(error => console.error(error))
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign Up</h3>
            <form onSubmit={handleSignup}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' required></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' required></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='confirm'>Confirm Password</label>
                    <input type='password' name='confirm' required></input>
                </div>

                <input className='btn-submit' type='submit' value='Login'/>
            </form>
            <p>Already Have An Account?<Link to='/login'>Login</Link> </p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Signup;