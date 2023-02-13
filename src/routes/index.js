// import { useAuth } from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();
  // console.log('🚀 ~ file: index.js:7 ~ Routes ~ user', user);
  // const user = true;
  return (
    <>
      {user ? <AppRoutes /> : <AuthRoutes />}
      {/* <AppRoutes /> */}
    </>
  );
}
