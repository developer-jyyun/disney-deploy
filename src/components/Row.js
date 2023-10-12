import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal/MovieModal";
const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const fetchMovieData = useCallback(async () => {
    const response = await axiosInstance.get(fetchUrl);
    console.log(response);
    setMovies(response.data.results);
  }, []);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movieItem) => {
    setIsModalOpen(true);
    setMovieSelected(movieItem);
  };
  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div className="row__posters" id={id}>
          {movies.map((movieItem) => (
            <img
              className="row__poster"
              key={movieItem.id}
              src={`https://image.tmdb.org/t/p/original${movieItem.backdrop_path}`}
              alt={movieItem.title}
              onClick={() => {
                handleClick(movieItem);
              }}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {isModalOpen && (
        <MovieModal setIsModalOpen={setIsModalOpen} {...movieSelected} />
      )}
    </div>
  );
};

export default Row;
