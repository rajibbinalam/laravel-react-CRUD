import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {setNotification} = useStateContext()
    const [loading, setLoading] = useState(false);
    const { errors, setErrors } = useState();
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosInstance
                .get(`/users/${id}`)
                .then((response) => {
                    // console.log(response.data.data);
                    setUser(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(user.id){
            axiosInstance.put(`/users/${user.id}`, user)
                .then((response) => {
                    setNotification('User Updated Success')
                    navigate('/users');
                })
                .catch((error) => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setErrors(response.data.errors);
                    }
                })
        }else{
            axiosInstance.post(`/users`, user)
                .then((response) => {
                    setNotification('User Created Success')
                    navigate('/users');
                })
                .catch((error) => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setErrors(response.data.errors);
                    }
                })
        }
    };
    return (
        <div>
            <div>
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    {user.id && <h2>Update User: {user.name}</h2>}
                    {!user.id && <h2> New User</h2>}
                    <Link className="btn-add" to={'/users'}>List</Link>
                </div>

                {loading && <div className="text-center">Loading...</div>}
                <br />
                <div className="form mt-1">
                    <form action="" onSubmit={onSubmit}>
                        {errors && (
                            <div className="alert">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                        <input
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            value={user.name}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            value={user.email}
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            name="password_confirmation"
                            placeholder="Password Confirmation"
                        />
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
