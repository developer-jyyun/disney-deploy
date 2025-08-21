import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import {
  auth,
  provider,
  setPersistence,
  browserLocalPersistence,
} from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

const initialUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Nav = () => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const [userData, setUserData] = useState(initialUserData);
  const [guest, setGuest] = useState(localStorage.getItem("guest") === "true");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem("userData");
      localStorage.removeItem("guest");
      setUserData({});
      setGuest(false);
      navigate("/");
    }
  };

  // 🔹 게스트에서 바로 구글 팝업 로그인
  const signInFromNav = async () => {
    try {
      // 보고 있던 경로 기억했다가 로그인 후 복귀
      const returnTo = `${pathname}${search}${hash}`;
      sessionStorage.setItem("returnTo", returnTo);

      // 자동 로그인 유지
      await setPersistence(auth, browserLocalPersistence);

      const { user } = await signInWithPopup(auth, provider);

      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.removeItem("guest");
      setUserData(user);
      setGuest(false);

      const dest = sessionStorage.getItem("returnTo") || "/main";
      sessionStorage.removeItem("returnTo");
      navigate(dest);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isGuest = localStorage.getItem("guest") === "true";
      const saved = sessionStorage.getItem("returnTo");

      if (user) {
        // 로그인 상태에서 로그인 페이지면 저장된 경로로 복귀(없으면 /main)
        if (pathname === "/") {
          navigate(saved || "/main");
          if (saved) sessionStorage.removeItem("returnTo");
        }
        if (!userData?.uid) {
          setUserData(user);
          localStorage.setItem("userData", JSON.stringify(user));
        }
        if (isGuest) {
          localStorage.removeItem("guest");
          setGuest(false);
        }
      } else {
        if (isGuest) {
          setGuest(true); // 게스트는 그대로 둘러보기 허용
        } else {
          if (pathname !== "/") navigate("/");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, pathname, userData?.uid]);

  return (
    <NavWrapper>
      <Logo onClick={() => navigate("/")}>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {userData?.photoURL ? (
        // 로그인 상태: 아바타 + 로그아웃
        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown onClick={handleSignOut}>
            <span>로그아웃</span>
          </DropDown>
        </SignOut>
      ) : guest ? (
        // 게스트 상태: 상단에 '로그인' 버튼 → 팝업 로그인
        <AuthArea>
          <LoginCta onClick={signInFromNav}>로그인</LoginCta>
        </AuthArea>
      ) : null}
    </NavWrapper>
  );
};

export default Nav;

/* styled-components */
const NavWrapper = styled.nav`
  background: #090b13;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 36px;
  align-items: center;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
const AuthArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const LoginCta = styled.button`
  background-color: #090b13;
  color: #f9f9f9;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 10px 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9dc;
    color: #000;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: #131313;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 6px;
  width: 120px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: #f9f9f9;
  text-align: center;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(6px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0s 0.18s;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover ${DropDown} {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
`;
