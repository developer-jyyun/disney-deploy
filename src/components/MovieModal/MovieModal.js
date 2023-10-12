import React, { useRef } from "react";
import "./MovieModal.css";
import { BASE_URL } from "../../constant";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const MovieModal = ({
  setIsModalOpen,
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
}) => {
  const ref = useRef(null);
  console.log("ref::", ref);
  useOnClickOutside(ref, () => {
    setIsModalOpen(false);
  });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span
            className="modal-close"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            X
          </span>
          <img
            className="modal__poster-img"
            src={`${BASE_URL}/original/${backdrop_path}`}
            alt="modal-img"
          />
          <div className="modal__content">
            <p className="movie__details">
              <span>100% for you </span>
              {""}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal_overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
