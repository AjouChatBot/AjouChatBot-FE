// src/pages/Login.tsx

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import Icon from '../components/Icons/Icon';
import { useUser } from '../contexts/UserContext';
import { loginWithGoogle } from '../services/authService';
import { getAccountInfo } from '../services/accountService';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useUser();
  const loginInProgressRef = useRef(false);

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (loginInProgressRef.current) return;
    loginInProgressRef.current = true;

    if (credentialResponse.credential) {
      try {
        const loginRes = await loginWithGoogle(credentialResponse.credential);
        const { access_token, refresh_token } = loginRes.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        setAccessToken(access_token);

        const response = await getAccountInfo();
        const userInfo = response.data;

        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);

        console.log('로그인 성공:', userInfo);
        navigate('/home');
      } catch (err) {
        console.error('로그인 실패:', err);
      }
    }
  };

  const handleLoginError = () => {
    console.log('로그인 실패');
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      navigate('/home');
    }
  }, []);

  return (
    <Layout>
      <div className='flex flex-row w-full h-full'>
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
