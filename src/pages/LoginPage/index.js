import React from "react";
import styled from "styled-components";
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // 로그인(자동 로그인 유지: localPersistence)
  const signIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await signInWithPopup(auth, provider);
      localStorage.setItem("userData", JSON.stringify(user));
      // 게스트 플래그가 남아있다면 제거
      localStorage.removeItem("guest");
      navigate("/main");
    } catch (e) {
      console.error(e);
    }
  };

  // 게스트로 둘러보기
  const continueAsGuest = () => {
    localStorage.setItem("guest", "true");
    navigate("/main");
  };

  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src="/images/cta-logo-one.svg" alt="logo-one" />

          <Buttons>
            <LoginButton onClick={signIn}>로그인</LoginButton>
            <GuestButton onClick={continueAsGuest}>
              로그인 없이 둘러보기
            </GuestButton>
          </Buttons>

          <Description>
            구글계정으로 쉽게 로그인 가능합니다. 게스트 버튼을 누르면 로그인
            없이 둘러 볼 수 있습니다.
          </Description>

          <LogoTwo src="images/cta-logo-two.png" alt="logo-two" />
        </Center>
      </Content>
    </Container>
  );
};

export default LoginPage;

/* styled-components */
const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;
const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;
const Center = styled.div`
  max-width: 650px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const LogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;
const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
  margin: 8px 0 12px;
`;
const LoginButton = styled.button`
  background-color: #0063e5;
  width: 100%;
  font-weight: 700;
  padding: 16px 0;
  color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 1px;
  border: none;
  &:hover {
    background-color: #0483ee;
  }
`;
const GuestButton = styled.button`
  background: #131a2a;
  color: #f9f9f9;
  width: 100%;
  font-weight: 700;
  padding: 16px 0;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 1px;
  border: none;
  &:hover {
    background: #0f1522;
  }
`;
const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 12px;
  margin: 8px 0 24px;
  line-height: 1.6;
  letter-spacing: 0.5px;
`;
const LogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;
