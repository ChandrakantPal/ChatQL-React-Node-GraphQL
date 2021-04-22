import { useState } from 'react'

const Reaction = () => {
  const [showPopup, setShowPopup] = useState(false)

  const react = (reaction: string) => {
    setShowPopup(false)
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
        <div className="px-3 py-2 mx-1 text-sm text-gray-900 bg-gray-100 bg-opacity-50 rounded-lg shadow">
          {reactions.map((reaction) => (
            <button
              className="mr-1 outline-none focus:outline-none"
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
