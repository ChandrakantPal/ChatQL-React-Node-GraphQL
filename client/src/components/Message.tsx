import { useAuthState } from '../context/Auth'
import classNames from 'classnames'
import { Message } from '../types'

interface MessageProp {
  message: Message
}

const MessageBox: React.FC<MessageProp> = ({ message }) => {
  const { user } = useAuthState()
  const sent = message.from === user.username
  const received = !sent
  return (
    <div
      className={classNames('flex my-3.5', {
        'ml-auto': sent,
        'mr-auto': received,
      })}
    >
      <div
        className={classNames('px-3 py-2 rounded-full', {
          'bg-blue-500': sent,
          'bg-gray-200': received,
        })}
      >
        <p className={classNames({ 'text-white': sent })}>{message.content}</p>
      </div>
    </div>
  )
}

export default MessageBox
