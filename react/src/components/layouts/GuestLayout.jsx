import {Navigate, Outlet} from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

function GuestLayout() {

    const {token} = useStateContext();

    if(token){
        return <Navigate to="/dashboard" />
    }
  return (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default GuestLayout
