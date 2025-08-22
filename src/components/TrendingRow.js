import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import requests from "../api/requests";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./TrendingRow.css";

const TrendingRow = () => {
  const [movies, setMovies] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  //  데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(requests.fetchTrending);
      setMovies(response.data.results || []);
    };
    fetchData();
  }, []);

  //  swiperInstance와 movies가 준비된 뒤 강제 초기화
  useEffect(() => {
    if (swiperInstance && movies.length > 0) {
      setTimeout(() => {
        swiperInstance.update();
        swiperInstance.slideToLoop(Math.floor(movies.length / 2), 0, false); // 중앙으로 이동
        swiperInstance.autoplay?.start(); // autoplay 강제 시작
      }, 100);
    }
  }, [swiperInstance, movies]);

  return (
    <div className="trending-row">
      <h2 className="row-title">🔥 Trending Now</h2>
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={800}
        coverflowEffect={{
          rotate: 20,
          stretch: -40,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={true}
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          // ⭐ DOM 업데이트 후 원근감/오토플레이 강제 보정
          setTimeout(() => {
            swiper.update();
            swiper.slideToLoop(Math.floor(swiper.slides.length / 2), 0, false);
            swiper.autoplay?.start();
          }, 200);
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRow;
