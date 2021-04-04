import { useState } from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'
import Users from './Users'
import Messages from './Messages'

const Home = () => {
  const { authenticated } = useAuthState()

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <Users />
          <Messages />
        </div>
      </div>
    </div>
  )
}

export default Home
