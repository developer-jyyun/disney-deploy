import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constant";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log("movieId::", movieId);

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get(`/movie/${movieId}`);
      setMovie(response.data);
      console.log("response.data::", response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;

  return (
    <section>
      {movie.backdrop_path ? (
        <img
          src={`${BASE_URL}/original${movie.backdrop_path}`}
          alt="detail-img"
          className="modal__poster-img"
        />
      ) : (
        <div style={noImgDiv}>해당 영화는 포스터가 제공되지 않습니다. 😂😂</div>
      )}

      <div style={divStyle}>
        <h2>{movie.title}</h2>
        <h4>평점: {movie.vote_average}</h4>
        <h4>개봉일: {movie.release_date}</h4>
        <p>{movie.overview}</p>
      </div>
    </section>
  );
};

export default DetailPage;

const divStyle = {
  padding: "2rem",
};

const noImgDiv = {
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};
