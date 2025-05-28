import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();
  const location = useLocation();
  const isMobilePath = location.pathname.startsWith('/m');

  if (!user) {
    // 모바일 경로인 경우 /m/login으로, 그 외의 경우 /login으로 리다이렉트
    return <Navigate to={isMobilePath ? '/m/login' : '/login'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
