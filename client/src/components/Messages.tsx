import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { useMessageDispatch, useMessageState } from '../context/MessageContext'
import { Message } from '../types'
import MessageBox from './Message'

const Messages = () => {
  const [content, setContent] = useState('')
  const { selectedUser, messages } = useMessageState()
  const dispatch = useMessageDispatch()
  const [getMessages, { loading, data: messagesData }] = useLazyQuery(
    GET_MESSAGES
  )

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      dispatch('ADD_MESSAGE', data.sendMessage)
      setContent('')
    },
    onError: (err) => console.log(err),
  })

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser])

  useEffect(() => {
    if (messagesData) {
      dispatch('SET_USER_MESSAGES', messagesData.getMessages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData])

  // if (messagesData) {
  //   console.log({ messagesData })
  // }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()

    if (content.trim() === '' || !selectedUser) return

    // Mutation for sending message
    sendMessage({ variables: { to: selectedUser, content } })
  }

  let selectedChat
  if (!messages && !loading) {
    selectedChat = (
      <p className="mb-1 text-center text-gray-600">Select a friend</p>
    )
  } else if (loading) {
    selectedChat = <p className="mb-1 text-center text-gray-600">Loading...</p>
  } else if (messages.length > 0) {
    selectedChat = messages.map((message: Message, index) => (
      <Fragment key={message.uuid}>
        <MessageBox message={message} />
        {index === messages.length - 1 && (
          <div className="invisible">
            <hr className="m-0" />
          </div>
        )}
      </Fragment>
    ))
  } else if (messages.length === 0) {
    selectedChat = (
      <p className="mb-1 text-center text-gray-600">
        You are now connected! send your first message!
      </p>
    )
  }

  return (
    <div className="col-span-2">
      <div className="flex flex-col-reverse overflow-y-scroll no-scrollbar h-160">
        {selectedChat}
      </div>
      <form className="flex items-center" onSubmit={submitHandler}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 placeholder-gray-600 bg-gray-100 rounded-full focus:outline-none"
          placeholder="Type a message.."
        />
        <button
          type="submit"
          className="ml-2 text-blue-500 outline-none focus:outline-none"
          onClick={submitHandler}
        >
          <i className="fas fa-paper-plane fa-2x"></i>
        </button>
      </form>
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
const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`
