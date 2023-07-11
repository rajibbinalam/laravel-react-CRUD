import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosInstance from "../utils/axios";

function Login() {

    const {setUser, setToken} = useStateContext();
    const {errors, setErrors} = useState();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        // setErrors(null)
        axiosInstance.post('/login', payload)
            .then((res)=>{
                setUser(res.data.user)
                setToken(res.data.token)
            })
            .catch(err => {
                // console.log(err);
                const response = err.response;
                if(response && response.status === 422){
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors(response.data.message);
                    }
                }
            })

    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1>Login into your account</h1>
                    {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" name="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" name="password" placeholder="Password" />
                    <button className="btn btn-block">Submit</button>
                    <p className="message">
                        Not Registered ? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;
