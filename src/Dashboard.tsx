import { useRecoilValue } from 'recoil';
import { userState } from '.';

const Dashboard: React.FC = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="Dashboard">
      {user?.fname} {user?.lname}
    </div>
  );
};

export default Dashboard;
