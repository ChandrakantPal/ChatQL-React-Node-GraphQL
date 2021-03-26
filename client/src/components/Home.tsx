import React from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'

const Home = () => {
  const { authenticated } = useAuthState()
  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
    </div>
  )
}

export default Home
