import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useMessageState } from '../context/Message'
import { Message } from '../types'

const Messages = () => {
  const { selectedUser } = useMessageState()
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
  return (
    <div className="col-span-2">
      {messagesData && messagesData.getMessages.length > 0 ? (
        messagesData.getMessages.map((message: Message) => (
          <p key={message.uuid}>{message.content}</p>
        ))
      ) : (
        <p>You are now connected!</p>
      )}
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
