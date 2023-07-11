import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {

    const {setUser, setToken} = useStateContext();
    const {errors, setErrors} = useState();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        // setErrors(null)
        axiosInstance.post('/signup', payload)
            .then((res)=>{
                setUser(res.data.user)
                setToken(res.data.token)
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })

    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1>Signup for free</h1>
                    {errors && <div className="alert">
                            {Object.keys(errors).map(key =>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" name="name" placeholder="Full Name" />
                    <input ref={emailRef} type="email" name="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" name="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" name="password_confirmation" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Submit</button>
                    <p className="message">
                        Already have a account? <br />
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
