import { gql, useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'
import InputGroup from './InputGroup'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<any>({})
  const history = useHistory()

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => {
      history.push('/login')
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
  })

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    registerUser({ variables: { username, email, password, confirmPassword } })
  }

  return (
    <div className="w-full h-full">
      <h1 className="mt-5 text-3xl text-center">Register</h1>
      <div className="flex justify-center my-5 ">
        <form onSubmit={submitHandler}>
          <InputGroup
            placeholder="Email"
            type="email"
            value={email}
            setValue={setEmail}
            error={errors.email}
          />
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
          <InputGroup
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 my-3 text-sm font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded-full"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`
