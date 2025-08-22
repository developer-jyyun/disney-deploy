# 📺 Disney+ Clone Project

## 🚀 프로젝트 소개

이 프로젝트는 **React + Firebase**를 활용하여 구현한 디즈니플러스 클론 사이트입니다.  
Firebase 인증을 통해 **Google 로그인 및 게스트 모드**를 지원하며,  
사용자는 영화와 TV 프로그램을 탐색하고 상세 정보를 확인할 수 있습니다.

## ⚙️ 주요 기능

- [x] **게스트 모드**: 로그인하지 않아도 메인 화면을 자유롭게 둘러볼 수 있습니다.
- [x] **Google 로그인 (Firebase Auth)**: 구글 계정으로 로그인하여 개인화된 기능 사용 가능
- [x] **배너(Banner)**: 랜덤 영화/TV 프로그램을 메인 배너에 표시
- [x] **Row/TrendingRow**: 영화 목록을 슬라이드 형식으로 표시 (트렌딩은 3D 효과 지원)
- [x] **모달(MovieModal)**: 영화 카드 클릭 시 상세 정보 모달창 표시
- [x] **검색(SearchPage)**: 디바운스 적용으로 불필요한 API 호출을 줄이고 최종 입력 기준으로 검색 실행
- [x] **반응형 디자인**: 다양한 디바이스에 맞춘 최적화 레이아웃

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
