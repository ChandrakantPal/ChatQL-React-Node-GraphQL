import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useMessageDispatch, useMessageState } from '../context/MessageContext'
import { Message } from '../types'
import MessageBox from './Message'

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
    selectedChat = messages.map((message: Message, index) => (
      <>
        <MessageBox message={message} key={message.uuid} />
        {index === messages.length - 1 && (
          <div className="invisible">
            <hr className="m-0" />
          </div>
        )}
      </>
    ))
  } else if (messages.length === 0) {
    selectedChat = <p>You are now connected! send your first message!</p>
  }

  return (
    <div className="flex flex-col-reverse col-span-2 overflow-y-scroll h-96 no-scrollbar">
      {selectedChat}
    </div>
  )
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
