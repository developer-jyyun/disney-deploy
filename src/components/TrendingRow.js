import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import requests from "../api/requests";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TrendingRow.css";

const TrendingRow = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(requests.fetchTrending);
      setMovies(response.data.results || []);
    };
    fetchData();
  }, []);

  return (
    <div className="trending-row">
      <h2 className="row-title">🔥 Trending Now</h2>
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={6}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        coverflowEffect={{
          rotate: 20,
          stretch: -20,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
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
              {/* ✅ 별점 제거 */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRow;
