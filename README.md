# React : 디즈니플러스 클론 코딩

https://diseneyplus-ffe32.web.app

![디즈니플러스](https://github.com/developer-jyyun/disney-deploy/assets/131247158/4ca34e93-922a-4663-90d5-e2bbc13ab728)

# cinelab-ott

TMDB 데이터와 Firebase 인증으로 구성한 **기능 중심 미니 OTT 데모**

> _UI 1:1 클론이 아닌, **API 가공/인증/라우팅**에 초점을 맞춘 프로젝트입니다._

---

## ✨ 핵심 기능

- **Firebase 구글 로그인 & 게스트 모드**

  - 네비 우측 **로그인**: 구글 팝업 로그인(자동 로그인 유지)
  - **게스트로 둘러보기**: 로그인 없이 메인 접근, 로그인 시 자동 전환
  - `returnTo` 지원: 게스트가 보던 페이지 → 로그인 성공 후 **원래 페이지로 복귀**
  - 지속성: `browserLocalPersistence`(자동 로그인)

- **콘텐츠 섹션**

  - **트렌딩 나우**: TMDB 트렌딩 API 결과 표시
  - **평점순**: TMDB Top Rated 결과 표시
  - (선택) 최근 30일 신규/Top10 등으로 확장 가능

- **검색**

  - 상단 검색창에서 Enter → `/search?q=...`
  - 현재는 **영화 결과만 상세 페이지로 이동**(TV는 필터링)

- **반응형 네비게이션**
  - 모바일: 로고/버튼 1줄 + 검색창 2줄 **가운데 정렬**
  - 프로필 호버 시 **드롭다운(로그아웃)** 표시

---

## 🧰 기술 스택

- **React (CRA)**, **styled-components**
- **Firebase Authentication (Google)**
- **TMDB API** (axios)
- 라우팅: **react-router-dom**

---

## 📂 프로젝트 구조(요약)

```
src/
  api/
    axios.js           # TMDB axios 인스턴스
    requests.js        # 엔드포인트 모음
  components/
    Nav.js             # 네비 + 검색 + 프로필 드롭다운
    Row.js / Tile.js   # 가로 스크롤 행 + 카드
  pages/
    LoginPage/
    MainPage/
    SearchPage/
  firebase.js          # Firebase 초기화 (env 사용)
  utils/
    buckets.js         # (옵션) 로컬 정렬/필터 유틸
```

---

## ⚙️ 환경 변수(.env)

루트에 `.env` 파일 생성:

```
# TMDB
REACT_APP_TMDB_KEY=YOUR_TMDB_API_KEY

# Firebase
REACT_APP_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_PROJECT_ID=your-project
REACT_APP_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=XXXXXXX
REACT_APP_APP_ID=1:XXXXXXX:web:XXXXXXXX
REACT_APP_MEASUREMENT_ID=G-XXXXXXXXXX
```

> 배포 서비스(Vercel/Netlify 등)에도 동일 키를 **환경변수로 등록**하세요.  
> Firebase 콘솔 → Authentication → **Authorized domains**에 배포 도메인 추가 필수.

---

## ▶️ 설치 & 실행

```bash
npm install
npm start
```

**스크립트**

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "CI=false react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

---

## 🔌 TMDB 요청(현재 동작)

`src/api/requests.js`

- `/trending/all/week` : 전세계 기준 **주간 트렌딩**(movie+tv)
- `/movie/top_rated` : TMDB 기준 **영화 평점순**

> “트렌딩/평점순”은 **서버에서 정렬된 결과**를 그대로 표시합니다.

---

## 🚀 확장안(필요 시 간단 교체)

`src/api/requests.js`에 옵션 엔드포인트를 추가해 두면, Row에 넘기는 `fetchUrl`만 교체하여 느낌을 바꿀 수 있습니다.

```js
export const fetchTrendingDay = "/trending/all/day"; // 일간 '지금 뜨는'
export const fetchTrendingKR =
  "/discover/movie?region=KR&sort_by=popularity.desc&include_adult=false";
export const fetchTopRatedStrict =
  "/discover/movie?sort_by=vote_average.desc&vote_count.gte=200";
```

(또는) 로컬에서 일관된 버킷을 만들고 싶다면 `utils/buckets.js`의 `buildBuckets` 사용:

- popularity 내림차순 → **트렌딩**
- vote_average 내림차순 + 표본수 하한 → **평점순**
- 최근 30일 → **신규**

---

## 🔎 검색 주의사항

- 현재 상세 페이지는 **영화만** 지원 → 검색 결과에서 TV는 필터링하여 링크 노출.
- TV 상세를 추가하려면 `/tv/:id` 라우트와 API 분기를 추가하세요.

---

## 🧩 레이아웃 메모

- Nav는 `position: sticky` → 메인 컨텐츠에서 `top: 72px` 같은 보정 **불필요**
- 프로필 드롭다운은 기본 `opacity:0 / visibility:hidden / pointer-events:none`  
  → `:hover`일 때만 보이도록 처리(고정 이슈 방지)
- 모바일 헤더: `flex-wrap: wrap` + `SearchBox`에 `flex: 1 1 100%; margin: 6px auto 0;`로 **2번째 줄 전체폭 + 가운데**

---

## 🧭 배포 체크리스트

- **환경변수**: 배포 콘솔에 `REACT_APP_*` 등록
- **Firebase Auth**: 배포 도메인 Authorized domains 추가
- **SPA 리라이트**
  - Netlify: `_redirects` → `/* /index.html 200`
  - Firebase Hosting: `firebase.json` → rewrites
  - GitHub Pages: 404.html 트릭 또는 GitHub Actions

---

## 📌 포지셔닝(포트폴리오 문구 예시)

> “디즈니+ 레퍼런스를 차용한 **OTT 데모**로, **TMDB 데이터 가공/분류(트렌딩·평점순·신규)**와 **Firebase 인증(구글/게스트)**, **클라이언트 라우팅**에 중점을 두었습니다. UI는 단순화하여 기능 검증을 우선했습니다.”

---

## 📍 향후 계획

- 히어로 CTA/스크림 정리, 가로 스크롤 **스냅 행** + 순위 배지(Top10)
- 카드 스켈레톤/에러 상태, 이미지 폴백 최적화
- TV 상세 라우트 추가, 트렌딩 KR/일간 옵션 토글
- 무한 스크롤/캐싱(RTK Query or SWR) 검토

---

## 📝 라이선스/출처

- 데이터: [TMDB](https://www.themoviedb.org/) — _This product uses the TMDB API but is not endorsed or certified by TMDB._
- 로고/이미지는 학습/데모 목적의 레퍼런스 사용
