import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Row.css";
import MovieModal from "./MovieModal/MovieModal";

const Row = ({ title, fetchUrl, showRating = false }) => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  // 데이터 로드
  const fetchMovieData = useCallback(async () => {
    const response = await axiosInstance.get(fetchUrl);
    setMovies(response.data.results || []);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  // 카드 클릭 → 모달 열기
  const handleClick = (movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="row">
      {title && <h2 className="row-title">{title}</h2>}

      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={6}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 14 },
          1200: { slidesPerView: 6, spaceBetween: 20 },
        }}
        className="poster-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="poster-slide">
            <div className="poster-card" onClick={() => handleClick(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="poster-img"
              />
              {showRating && (
                <div className="poster-rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 모달 */}
      {isModalOpen && (
        <MovieModal {...movieSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default Row;
