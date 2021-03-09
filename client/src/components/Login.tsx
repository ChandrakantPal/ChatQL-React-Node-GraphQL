import { gql, useLazyQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'
import InputGroup from './InputGroup'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})
  const history = useHistory()

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token)
      history.push('/')
    },
  })

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    loginUser({ variables: { username, password } })
  }

  return (
    <div className="w-full h-full">
      <h1 className="mt-5 text-3xl text-center">Login</h1>
      <div className="flex justify-center my-5 ">
        <form onSubmit={submitHandler}>
          <InputGroup
            placeholder="Username"
            type="text"
            value={username}
            setValue={setUsername}
            error={errors.username}
          />
          <InputGroup
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 my-3 text-sm font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`
