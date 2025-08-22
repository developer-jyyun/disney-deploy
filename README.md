# 📺 영화 정보 서비스

## 🚀 프로젝트 소개

이 프로젝트는 **React + Firebase**를 활용하여 구현한 영화 정보 서비스입니다.  
디즈니플러스의 UI를 참고하여, 로그인/게스트 모드, 검색, 모달 상세보기 등 주요 기능을 구현했습니다.  
(실제 영상 스트리밍은 제공하지 않습니다.)

## ✨ 핵심 기능

- [x] **Firebase 구글 로그인 & 게스트 모드**

  - 네비 우측 **로그인 버튼**: 구글 팝업 로그인 (자동 로그인 유지)
  - **게스트로 둘러보기**: 로그인 없이 메인 화면 접근 가능
  - `returnTo` 지원: 게스트 → 로그인 성공 후 원래 페이지 복귀
  - 지속성: `browserLocalPersistence`로 자동 로그인 유지

- [x] **콘텐츠 섹션**

  - **트렌딩 나우**: TMDB 트렌딩 API 결과 표시
  - **평점순**: TMDB Top Rated API 결과 표시
  - 카테고리 섹션 클릭 시 → 해당 콘텐츠 블록으로 스크롤 이동

- [x] **검색(Search)**

  - 상단 검색창에서 Enter → `/search?q=...` 이동
  - 디바운스 적용: 입력 멈춘 뒤 일정 시간 후에만 요청 실행

- [x] **반응형 네비게이션**
  - 모바일: 로고/버튼 1줄 + 검색창 2줄 (가운데 정렬)
  - 프로필 아이콘 호버 시 → 드롭다운(로그아웃) 표시

## 🛠 기술 스택

- **Frontend**: React, CSS
- **State Management**: React Hooks
- **API 통신**: Axios
- **Auth & Hosting**: Firebase Authentication, Firebase Hosting
- **기타**: Custom Hooks, React Router

## 📂 폴더 구조

```
src
 ┣ api
 ┃ ┣ axios.js           # axios 인스턴스
 ┃ ┗ requests.js        # API 요청 경로 정의
 ┣ components
 ┃ ┣ Banner.js / Banner.css
 ┃ ┣ Category.js
 ┃ ┣ Nav.js
 ┃ ┣ Row.js / Row.css
 ┃ ┣ TrendingRow.js / TrendingRow.css
 ┃ ┗ MovieModal/
 ┃    ┣ MovieModal.js / MovieModal.css
 ┣ hooks
 ┃ ┣ useDebounce.js
 ┃ ┗ useOnClickOutside.js
 ┣ pages
 ┃ ┣ DetailPage/
 ┃ ┣ LoginPage/
 ┃ ┣ MainPage/
 ┃ ┗ SearchPage/
 ┃    ┗ SearchPage.css
 ┣ utils
 ┃ ┗ truncate.js
 ┣ App.js
 ┣ firebase.js
 ┣ index.js
 ┣ index.css
```

## 🔑 실행 방법

```bash
# 설치
yarn install   # 또는 npm install

# 실행
yarn start     # 또는 npm start

# 빌드
yarn build
```
