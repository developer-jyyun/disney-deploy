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
      <div className="inner">
        <Logo onClick={() => navigate("/")}>
          <img src="/images/logo.svg" alt="Disney+" />
        </Logo>

        <SearchBox>
          <input
            type="text"
            placeholder="영화 / 시리즈 검색"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                navigate(
                  `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                );
            }}
          />
          <i className="icon">⌕</i>
        </SearchBox>

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
      </div>
    </NavWrapper>
  );
};

export default Nav;
const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #0b0d17;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  & > .inner {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap; /* 모바일 2줄 허용 */
  }

  @media (min-width: 768px) {
    & > .inner {
      height: 64px;
      padding: 0 28px;
      flex-wrap: nowrap; /* 데스크톱 1줄 */
    }
  }
`;

const Logo = styled.a`
  order: 1;
  flex: 0 0 auto;
  width: 84px;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

/* 모바일: 1줄째 오른쪽 / 데스크톱: 가장 오른쪽 */
const AuthArea = styled.div`
  order: 2;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    order: 3;
  }
`;

const LoginCta = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  background: transparent;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
  &:hover {
    background: #fff;
    color: #0b0d17;
    border-color: #fff;
  }
`;

/* 모바일: 2줄째 전체폭 가운데 / 데스크톱: 중앙 라인 */
const SearchBox = styled.div`
  position: relative;
  order: 4;
  flex: 1 1 100%;
  width: 100%;
  max-width: 520px;
  margin: 6px auto 0;

  input {
    width: 100%;
    height: 40px;
    padding: 0 36px 0 12px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    outline: none;
    box-sizing: border-box;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.72);
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
    pointer-events: none;
    font-style: normal;
  }

  @media (min-width: 768px) {
    order: 2;
    flex: 0 1 460px;
    max-width: 42vw;
    margin: 0 12px;
  }
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 140px;
  padding: 10px 12px;
  text-align: center;
  background: rgba(20, 22, 30, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  color: #fff;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(6px) scale(0.98);
  transform-origin: top right;
  transition:
    opacity 0.18s,
    transform 0.18s,
    visibility 0s 0.18s;

  button {
    width: 100%;
    background: transparent;
    color: #fff;
    border: 0;
    font-weight: 600;
    padding: 8px 0;
    cursor: pointer;
    border-radius: 8px;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SignOut = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover ${DropDown} {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0) scale(1);
    transition:
      opacity 0.18s,
      transform 0.18s;
  }
`;
