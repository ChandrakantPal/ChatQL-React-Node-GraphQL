import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'
import { User, Message } from '../types'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState('')
  const { authenticated } = useAuthState()

  const { loading, data, error } = useQuery(GET_USERS)

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES)

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } })
    }
  }, [getMessages, selectedUser])

  if (messagesData) {
    console.log({ messagesData })
  }

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
      <div
        className="flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
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
          <div className="bg-gray-100">{usersMarkup}</div>
          <div className="col-span-2">
            {messagesData && messagesData.getMessages.length > 0 ? (
              messagesData.getMessages.map((message: Message) => (
                <p key={message.uuid}>{message.content}</p>
              ))
            ) : (
              <p>You are now connected!</p>
            )}
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
const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      content
      from
      to
      createdAt
    }
  }
`
