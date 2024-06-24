import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import Conntainer from '../../components/Container/Conntainer'
import { useNavigate } from 'react-router-dom'
const Home = ({setShowLogin}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/explore');
    }
  }, [navigate]);
  return (
    <div>
      <Header setShowLogin = {setShowLogin}/>
      <Conntainer/>
    </div>
  )
}

export default Home
