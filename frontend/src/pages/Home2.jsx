import React from 'react'
import HomeBody from '../components/HomeComponent2/HomeBody'
import HomeHeader from '../components/HomeComponent2/HomeHeader'
import {useSelector} from 'react-redux';

const Home2 = () => {

  const recipes = useSelector(state => state.recipes.list);
  
  console.log(recipes);

  return (
    <div>
        <HomeHeader/>
        <HomeBody/>
    </div>
  )
}

export default Home2
