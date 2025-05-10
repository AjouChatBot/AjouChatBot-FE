// src/pages/Login.tsx
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Icon from '../components/Icons/Icon';
import { useUser } from '../contexts/UserContext';
import { getAccountInfo } from '../services/accountService';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google unique user ID
}

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: GoogleUser = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
      console.log('로그인 성공:', decoded);
      navigate('/home');
    }
  };

  const handleLoginError = () => {
    console.log('로그인 실패');
  };

  // useEffect(() => {
  //   // 이미 로그인 되어 있다면 바로 home으로
  //   const stored = localStorage.getItem('user');
  //   if (stored) {
  //     navigate('/home');
  //   }
  // }, []);
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      getAccountInfo()
        .then(() => {
          navigate('/home');
        })
        .catch(() => {
          localStorage.removeItem('user');
        });
    }
  }, []);

  return (
    <Layout>
      <div className='flex flex-roww-full h-full'>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <Icon name='mainlogo_login' size={256} />
          <Icon name='amatetext' size={197} />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <Icon name='loginchatimage' size={516} />
          <div className='w-[516px] h-[80px]'>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              text='signin_with'
            />
          </div>
          <p className='text-base text-blue_c mt-4 text-center'>
            A.mate는 아주대 Google 계정으로 로그인하므로
            <br />
            별도의 회원가입이 없어요.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
