import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import AuthorizeStack from '../AuthorizeStack/AuthorizeStack';
import UnauthorizeStack from '../UnauthorizeStack/UnauthorizeStack';

const RootNavigator = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return token ? <AuthorizeStack /> : <UnauthorizeStack />;
};
export default RootNavigator;
