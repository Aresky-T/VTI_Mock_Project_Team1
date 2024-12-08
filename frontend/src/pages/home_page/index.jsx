import React, { useRef } from "react";
import HomeHeader from "../../components/HomeComponent2/HomeHeader";
import HomeBody from "../../components/HomeComponent2/HomeBody";

const HomePage = () => {
  const ref = useRef(null);

  const handleClickToScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container main home-page">
      <HomeHeader handleClickToScroll={handleClickToScroll} />
      <HomeBody ref={ref} />
    </div>
  );
};

export default HomePage;
