import { useEffect, useState, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false); // ✅ 드롭다운 상태
  const dropdownRef = useRef(null);

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

  // 게스트에서 바로 구글 팝업 로그인
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

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* ✅ 검색창은 여기! */}
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
        </SearchBox>

        {userData?.photoURL ? (
          <SignOut ref={dropdownRef}>
            <UserImg
              src={userData.photoURL}
              alt={userData.displayName}
              onClick={() => setIsOpen((prev) => !prev)}
            />
            {isOpen && (
              <DropDown>
                <button onClick={handleSignOut}>로그아웃</button>
              </DropDown>
            )}
          </SignOut>
        ) : guest ? (
          <AuthArea>
            <LoginCta onClick={signInFromNav}>로그인</LoginCta>
          </AuthArea>
        ) : null}
      </div>
    </NavWrapper>
  );
};

export default Nav;

/* --- styled-components --- */
const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #0b0d17;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  & > .inner {
    margin: 0 auto;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;

    @media (max-width: 768px) {
      gap: 12px;
    }
  }
`;

const Logo = styled.a`
  flex: 0 0 auto;
  width: 84px;

  img {
    width: 100%;
    display: block;
  }
`;

const AuthArea = styled.div`
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0; /* 자동 밀림 제거 */
    order: 1; /* 로고랑 같은 줄 */
    margin-left: auto; /* 로고 오른쪽에 배치 */
  }
`;
const SearchBox = styled.div`
  flex: 1;
  max-width: 520px;
  position: relative;

  input {
    height: 40px;
    padding: 0 12px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    order: 2;
  }
`;

const LoginCta = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 140px;
  padding: 10px 0;
  background: rgba(20, 22, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);

  button {
    width: 100%;
    padding: 8px 0;
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SignOut = styled.div`
  margin-left: auto;
  position: relative;
`;
