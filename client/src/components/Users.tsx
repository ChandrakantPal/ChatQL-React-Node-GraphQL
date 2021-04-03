import { gql, useQuery } from '@apollo/client'
import { classNames } from '@ungap/global-this'
import { useMessageDispatch, useMessageState } from '../context/Message'
import { User } from '../types'

interface UsersProps {
  setSelectedUser: (user: string) => void
  selectedUser: string
}

const Users: React.FC<UsersProps> = ({ setSelectedUser, selectedUser }) => {
  const dispatch = useMessageDispatch()
  const { users } = useMessageState()
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => dispatch('SET_USERS', data.getUsers),
    onError: (err) => console.log(err),
  })
  let usersMarkup
  if (!users || loading) {
    usersMarkup = <p>Loading...</p>
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (users.length > 0) {
    usersMarkup = users.map((user: User) => {
      const selected = selectedUser === user.username
      return (
        <div
          className={classNames('flex p-3 cursor-pointer hover:bg-gray-200', {
            'bg-white': selected,
          })}
          key={user.username}
          onClick={() => setSelectedUser(user.username)}
        >
          <img
            src={user.imageUrl}
            alt="user"
            className="object-cover w-16 h-16 mr-2 rounded-full"
          />
          <div>
            <p className="text-green-400">{user.username}</p>
            <p className="font-light">
              {user.latestMessage
                ? user.latestMessage.content
                : 'You are now connected!'}
            </p>
          </div>
        </div>
      )
    })
  }

  return <div className="bg-gray-100">{usersMarkup}</div>
}

export default Users

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
