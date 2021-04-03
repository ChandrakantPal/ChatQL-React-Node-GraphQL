import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'
import { User, Message } from '../types'
import Users from './Users'
import Messages from './Messages'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState('')
  const { authenticated } = useAuthState()

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

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <Users
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
          <div className="col-span-2">
            <Messages />
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
