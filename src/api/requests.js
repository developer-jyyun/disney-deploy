const API_KEY = process.env.REACT_APP_TMDB_KEY;

const requests = {
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",

  // ✅ 회사 ID 기반 필터링
  fetchDisney: `/discover/movie?api_key=${API_KEY}&with_companies=2`,
  fetchPixar: `/discover/movie?api_key=${API_KEY}&with_companies=3`,
  fetchMarvel: `/discover/movie?api_key=${API_KEY}&with_companies=420`,
  fetchStarWars: `/discover/movie?api_key=${API_KEY}&with_companies=1`,
  fetchNationalGeographic: `/discover/movie?api_key=${API_KEY}&with_companies=7521`, // 네셔널지오그래픽
};

export default requests;
