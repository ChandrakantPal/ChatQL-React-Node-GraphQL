import { useAuthState } from '../context/Auth'
import classNames from 'classnames'
import { Message } from '../types'
import { useRef } from 'react'
import dayjs from 'dayjs'

interface MessageProp {
  message: Message
}

const MessageBox: React.FC<MessageProp> = ({ message }) => {
  const toolTiplRef = useRef<any>()
  const { user } = useAuthState()
  const sent = message.from === user.username
  const received = !sent
  // console.log(toolTiplRef.current)

  const addTooltip = () => {
    toolTiplRef.current.classList.remove('hidden')
  }

  const removeTooltip = () => {
    toolTiplRef.current.classList.add('hidden')
  }

  return (
    <div
      className={classNames('flex my-3.5', {
        'ml-auto flex-row-reverse': sent,
        'mr-auto': received,
      })}
    >
      <div
        className={classNames('px-3 py-2 rounded-full', {
          'bg-blue-500': sent,
          'bg-gray-200': received,
        })}
        onMouseEnter={addTooltip}
        onMouseLeave={removeTooltip}
      >
        <p className={classNames({ 'text-white': sent })}>{message.content}</p>
      </div>
      <p
        ref={toolTiplRef}
        className="hidden px-3 py-2 mx-1 text-sm text-gray-900 bg-gray-100 bg-opacity-50 rounded-lg shadow"
      >
        {dayjs(message.createdAt).format('DD MMMM YYYY  H:m')}
      </p>
    </div>
  )
}

export default MessageBox
