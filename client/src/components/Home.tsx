import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'
import Navbar from './Navbar'
import Users from './Users'
import Messages from './Messages'
import { gql, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
import { useMessageDispatch, useMessageState } from '../context/MessageContext'

const Home = () => {
  const { authenticated } = useAuthState()
  const dispatch = useMessageDispatch()
  const { selectedUser } = useMessageState()

  const { data, error: messageError } = useSubscription(NEW_MESSAGE)

  const { data: reactionData, error: reactionError } = useSubscription(
    NEW_REACTION
  )

  console.log({ data })

  useEffect(() => {
    if (messageError) console.log(messageError)
    if (
      data &&
      (selectedUser === data.newMessage.from ||
        selectedUser === data.newMessage.to)
    ) {
      console.log({ data })
      dispatch('ADD_MESSAGE', data.newMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, messageError, selectedUser])

  useEffect(() => {
    if (reactionError) console.log(reactionError)
    if (
      reactionData &&
      (selectedUser === reactionData.newReaction.message.from ||
        selectedUser === reactionData.newReaction.message.to)
    ) {
      console.log({ data })
      dispatch('ADD_REACTION', reactionData.newReaction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactionData, reactionError, selectedUser])

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-1">
          <Users />
          <Messages />
        </div>
      </div>
    </div>
  )
}

export default Home

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      content
      from
      to
      createdAt
      reactions {
        uuid
        content
        createdAt
      }
    }
  }
`

const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      uuid
      content
      createdAt
      message {
        uuid
        from
        to
      }
    }
  }
`
