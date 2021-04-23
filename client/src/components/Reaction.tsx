import { gql, useMutation } from '@apollo/client'
import { FC, useState } from 'react'

interface ReactionProp {
  uuid: string
}

const Reaction: FC<ReactionProp> = ({ uuid }) => {
  const [showPopup, setShowPopup] = useState(false)

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      console.log(data)
      setShowPopup(false)
    },
  })

  const react = (content: string) => {
    reactToMessage({ variables: { uuid, content } })
  }

  const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
  return (
    <>
      <button
        className="px-2 outline-none focus:outline-none"
        onClick={() => setShowPopup((prevState) => !prevState)}
      >
        <i className="far fa-smile"></i>
      </button>
      {showPopup && (
        <div className="px-3 py-2 mx-1 text-sm text-gray-900 bg-gray-100 bg-opacity-50 rounded-lg shadow ">
          {reactions.map((reaction) => (
            <button
              className="mr-1 transition duration-500 ease-in-out transform outline-none focus:outline-none hover:-translate-y-1 hover:scale-150"
              key={reaction}
              onClick={() => react(reaction)}
            >
              {reaction}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export default Reaction

const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String!, $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`
