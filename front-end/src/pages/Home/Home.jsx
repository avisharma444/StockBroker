import React from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import Conntainer from '../../components/Container/Conntainer'
const Home = ({setShowLogin}) => {
  return (
    <div>
      <Header setShowLogin = {setShowLogin}/>
      <Conntainer/>
    </div>
  )
}

export default Home
