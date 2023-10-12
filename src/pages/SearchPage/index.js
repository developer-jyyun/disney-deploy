import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { BASE_URL } from "../../constant";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  //   console.log(searchTerm); //spiderman
  const debouncedValue = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedValue) {
      fetchSearchMovie(debouncedValue);
    }
  }, [debouncedValue]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(response);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movieItem) => {
          if (
            movieItem.backdrop_path !== null &&
            movieItem.media_type !== "person"
          ) {
            console.log(searchResults);

            const movieImageUrl = `${BASE_URL}/w500${movieItem.backdrop_path}`;
            // const movieImageUrl =
            //   "https://image.tmdb.org/t/p/w500" + movieItem.backdrop_path;
            return (
              <div key={movieItem.id} className="movie">
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movieItem.id}`)}
                >
                  <img
                    className="movie__name"
                    src={movieImageUrl}
                    alt="movie"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
