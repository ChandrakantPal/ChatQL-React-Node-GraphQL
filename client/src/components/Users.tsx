import { gql, useQuery } from '@apollo/client'
import { useMessageDispatch, useMessageState } from '../context/Message'
import { User } from '../types'

interface UsersProps {
  setSelectedUser: (user: string) => void
}

const Users: React.FC<UsersProps> = ({ setSelectedUser }) => {
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
    usersMarkup = users.map((user: User) => (
      <div
        className="flex p-3 cursor-pointer"
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
    ))
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
