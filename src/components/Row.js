import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import "./Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieModal from "./MovieModal/MovieModal";

const Row = ({ title, fetchUrl, type }) => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const fetchMovieData = useCallback(async () => {
    const response = await axiosInstance.get(fetchUrl);
    setMovies(response.data.results || []);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={6}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 14 },
          1200: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="movie-card" onClick={() => handleClick(movie)}>
              <img
                className="movie-card__img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <div className="movie-card__overlay">
                <h3>{movie.title || movie.name}</h3>
                {type === "rated" && (
                  <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && (
        <MovieModal {...movieSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default Row;
