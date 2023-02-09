import React, { useRef } from 'react'
import HomeBody from '../components/HomeComponent2/HomeBody'
import HomeHeader from '../components/HomeComponent2/HomeHeader'

const Home2 = () => {

  const ref = useRef(null);

  const handleClickToScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <HomeHeader handleClickToScroll={handleClickToScroll} />
      <HomeBody ref={ref}/>
    </div>
  )
}

export default Home2
