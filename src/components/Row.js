import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Row.css";
import MovieModal from "./MovieModal/MovieModal";

function Row({ title, fetchUrl, showRating = false, id, size = "large" }) {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const fetchMovieData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(fetchUrl);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="row" id={id}>
      {title && <h2 className="row-title">{title}</h2>}

      {movies.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView="auto"
          spaceBetween={15}
          className="poster-swiper"
        >
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <SwiperSlide
                key={movie.id}
                className={`poster-slide ${size === "small" ? "small" : ""}`}
              >
                <div className="poster-card" onClick={() => handleClick(movie)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.poster_path || movie.backdrop_path
                    }`}
                    alt={movie.title || movie.name}
                    className="poster-img"
                    loading="lazy"
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
      )}

      {isModalOpen && (
        <MovieModal {...movieSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default Row;
