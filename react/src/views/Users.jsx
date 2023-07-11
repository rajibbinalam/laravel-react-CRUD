import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification} = useStateContext()


    useEffect(() => {
        getUsers();

    }, [])

    const getUsers = () => {
        setLoading(true);

        axiosInstance.get('/users')
            .then(({...res}) => {
                // console.log(res);
                setUsers(res.data.data)
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })

    }


    const onDelete = (user) => {
        if(!window.confirm('Are you sure you want')){
            return;
        }
        axiosInstance.delete('/users/'+user.id)
            .then((res) => {
                // console.log(res);
                setNotification('User deleted successfully')
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            })
    }
  return (
    <div>
        <div style={{ display:"flex", justifyContent:'space-between', alignItems:'center' }}>
            <h1>Users</h1>
            <Link to={'/users/create'} className="btn-add">Create New</Link>
        </div>
        <div className="aimated fadeInDown card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {loading &&
                <tbody>
                    <tr><td style={{ textAlign:"center" }} colSpan={5}>Loading</td></tr>
                </tbody>
                }
                <tbody>
                    {users && users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                        <Link className="btn-edit" to={'/users/'+user.id}>Edit</Link>
                        <button onClick={e => onDelete(user)} className="btn-delete">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users

