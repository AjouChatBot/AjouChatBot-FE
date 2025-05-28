import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import TalkArea from '../components/chat/TalkArea';
import Icon from '../components/Icons/Icon';
import { useUser } from '../contexts/UserContext';
import { loginWithGoogle } from '../services/authService';
import { getAccountInfo } from '../services/accountService';

const MobileLogin = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useUser();
  const loginInProgressRef = useRef(false);

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (loginInProgressRef.current) return;
    loginInProgressRef.current = true;

    if (credentialResponse.credential) {
      console.log('🪪 Google Credential:', credentialResponse.credential);

      try {
        const loginRes = await loginWithGoogle(credentialResponse.credential);
        const { access_token, refresh_token, ...user } = loginRes.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user', JSON.stringify(user));

        setAccessToken(access_token);

        const response = await getAccountInfo();
        const userInfo = response.data;

        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);

        console.log('로그인 성공:', userInfo);
        navigate('/m/home');
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
    <div
      className='w-screen min-h-screen flex flex-col px-6 py-2'
      style={{
        backgroundImage: 'url("/mobileloginbackground.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex flex-col items-center mt-[84px]'>
        <Icon name='amatetext_mobilelogin' size={150} />
      </div>

      <div className='px-6 fixed bottom-[115px] left-0 right-0 flex flex-col items-center'>
        <div className='w-full mb-11'>
          <div className='flex items-center mb-4'>
            <Icon name='mainlogo' size={32} />
            <p className='text-sm font-bold text-blue_a'>A.mate</p>
          </div>
          <TalkArea message='궁금한 게 있으신가요? 편하게 질문해주세요!' />
        </div>
        <div className='w-full'>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            text='signin_with'
            hosted_domain='ajou.ac.kr'
          />
        </div>
        <p className='text-sm text-mono_c mt-4 text-center'>
          A.mate는 아주대학교 Google 계정으로 사용할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default MobileLogin;
