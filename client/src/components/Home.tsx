import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'

const Home = () => {
  const { authenticated } = useAuthState()

  const { loading, data, error } = useQuery(GET_USERS)

  if (error) {
    console.log(error)
  }

  if (data) {
    console.log(data)
  }

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
    </div>
  )
}

export default Home

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`
