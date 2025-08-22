import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import requests from "../api/requests";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./TrendingRow.css";
import "./Row.css";
import MovieModal from "./MovieModal/MovieModal";

const TrendingRow = () => {
  const [movies, setMovies] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  // ✅ 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(requests.fetchTrending);
        setMovies(response.data.results || []);
      } catch (err) {
        console.error("트렌딩 데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Swiper 초기 위치: 가운데 정렬 + 자동재생
  useEffect(() => {
    if (swiperInstance && movies.length > 0) {
      setTimeout(() => {
        swiperInstance.update();
        swiperInstance.slideToLoop(Math.floor(movies.length / 2), 0, false);
        swiperInstance.autoplay?.start();
      }, 100);
    }
  }, [swiperInstance, movies]);

  // ✅ 카드 클릭 → 모달 열기
  const handleClick = (movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="trending-row">
      <h2 className="row-title">🔥 Trending Now</h2>

      {movies.length > 0 && (
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={5}
          observer={true}
          observeParents={true}
          coverflowEffect={{
            rotate: 20,
            stretch: -40,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation
          speed={800}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                <div
                  className="movie-card trending-card"
                  onClick={() => handleClick(movie)}
                >
                  <img
                    className="movie-card__img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {/* ✅ 모달 */}
      {isModalOpen && (
        <MovieModal {...movieSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default TrendingRow;
