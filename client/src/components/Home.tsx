import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'
import { User } from '../types'

const Home = () => {
  const { authenticated } = useAuthState()

  const { loading, data, error } = useQuery(GET_USERS)

  if (error) {
    console.log(error)
  }

  let usersMarkup
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user: User) => (
      <div className="flex p-3" key={user.username}>
        <img
          src={user.imageUrl}
          alt="user"
          className="object-cover w-16 h-16 mr-2 rounded-full"
        />
        <div>
          <p className="text-green-400">{user.username}</p>
          <p className="font-light">
            {user.latestMessage
              ? user.latestMessage.content
              : 'You are now connected!'}
          </p>
        </div>
      </div>
    ))
  }

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <div>{usersMarkup}</div>
          <div className="col-span-2">
            <p>Messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        content
        from
        to
      }
    }
  }
`
