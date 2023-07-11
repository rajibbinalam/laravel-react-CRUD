import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosInstance from "../../utils/axios";

function DefaultLayout() {
    const {user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
      axiosInstance.get('/user')
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }, [])

    const handleLogout = (e) =>{
        e.preventDefault();
        axiosInstance.post('/logout')
        .then(() =>{
            setToken(null);
            setUser({});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={handleLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification &&
                <div className="notification">{notification}</div>
            }
        </div>
    );
}

export default DefaultLayout;
