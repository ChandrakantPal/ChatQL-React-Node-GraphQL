import { gql, useQuery } from '@apollo/client'
import { User } from '../types'

interface UsersProps {
  setSelectedUser: (user: string) => void
}

const Users: React.FC<UsersProps> = ({ setSelectedUser }) => {
  const { loading, data, error } = useQuery(GET_USERS)
  let usersMarkup
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user: User) => (
      <div
        className="flex p-3"
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
