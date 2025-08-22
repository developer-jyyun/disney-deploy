import React from "react";
import styled from "styled-components";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Row from "../../components/Row";
import requests from "../../api/requests";
import TrendingRow from "../../components/TrendingRow";

const MainPage = () => {
  return (
    <Container>
      <Banner />
      <Category />

      {/* 카테고리별 Row */}
      <TrendingRow title="🔥 Trending Now" fetchUrl={requests.fetchTrending} />
      <Row
        title="⭐ Top Rated"
        fetchUrl={requests.fetchTopRated}
        showRating={true}
      />
      <Row
        title="🎬 Action Movies"
        fetchUrl={requests.fetchActionMovies}
        size="small"
      />
      <Row
        title="😆 Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        size="small"
      />
      <Row
        title="😱 Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        size="small"
      />

      {/* ✅ 카테고리 */}
      <Row
        id="disney"
        title="🏰 Disney"
        fetchUrl={requests.fetchDisney}
        size="small"
      />
      <Row
        id="marvel"
        title="🦸 Marvel"
        fetchUrl={requests.fetchMarvel}
        size="small"
      />
      <Row
        id="pixar"
        title="🤖 Pixar"
        fetchUrl={requests.fetchPixar}
        size="small"
      />
      <Row
        id="starwars"
        title="🚀 Star Wars"
        fetchUrl={requests.fetchStarWars}
        size="small"
      />
      <Row
        id="natgeo"
        title="🌍 National Geographic"
        fetchUrl={requests.fetchNationalGeographic}
        size="small"
      />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  padding: 0 calc(3.5vw + 5px);
  padding-top: 40px;

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
