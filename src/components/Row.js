import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Row.css";

const Row = ({ title, fetchUrl, showRating = false, id }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(fetchUrl);

        // 응답 구조 안전하게 처리
        if (response?.data?.results) {
          setMovies(response.data.results);
        } else if (response?.data?.length) {
          // 혹시 results 대신 배열이 오는 경우
          setMovies(response.data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMovies([]); // 실패 시에도 안전하게 빈 배열
      }
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row" id={id}>
      {title && <h2 className="row-title">{title}</h2>}

      {movies.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={movies.length < 6 ? movies.length : 6}
          initialSlide={movies?.length > 0 ? Math.floor(movies.length / 2) : 0}
          spaceBetween={15}
          navigation={true}
          className="poster-swiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="poster-slide">
              <div className="poster-card">
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
      ) : (
        <p className="no-data">데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default Row;
