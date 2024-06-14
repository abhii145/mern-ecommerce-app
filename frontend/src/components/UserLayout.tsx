import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UserLayout = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <div>
      <Header user={ user} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout