import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '.';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const Dashboard: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <ProtectedRoute>
      <div className="Dashboard">
        {user?.fname} {user?.lname}
        <button
          onClick={() => {
            setUser(null);
          }}>
          Sign Out
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
