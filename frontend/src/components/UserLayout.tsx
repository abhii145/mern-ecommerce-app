import { Outlet } from 'react-router-dom';
import Header from './Header';

const UserLayout = () => {
  return (
    <div>
     <Header/>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout