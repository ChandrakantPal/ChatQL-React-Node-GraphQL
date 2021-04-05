import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useMessageDispatch, useMessageState } from '../context/Message'
import { Message } from '../types'

const Messages = () => {
  const { selectedUser, messages } = useMessageState()
  const dispatch = useMessageDispatch()
  const [getMessages, { loading, data: messagesData }] = useLazyQuery(
    GET_MESSAGES
  )

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } })
    }
  }, [getMessages, selectedUser])

  useEffect(() => {
    if (messagesData) {
      dispatch('SET_USER_MESSAGES', messagesData.getMessages)
    }
  }, [dispatch, messagesData])

  if (messagesData) {
    console.log({ messagesData })
  }

  let selectedChat
  if (!messages && !loading) {
    selectedChat = <p>Select a friend</p>
  } else if (loading) {
    selectedChat = <p>Loading...</p>
  } else if (messages.length > 0) {
    selectedChat = messages.map((message: Message) => (
      <p key={message.uuid}>{message.content}</p>
    ))
  } else if (messages.length === 0) {
    selectedChat = <p>You are now connected! send your first message!</p>
  }

  return <div className="col-span-2">{selectedChat}</div>
}

export default Messages

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
