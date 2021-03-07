import { FormEvent, useState } from 'react'
import InputGroup from './InputGroup'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="container mx-auto">
      <div className="w-full h-full">
        <h1 className="mt-5 text-3xl text-center">Register</h1>
        <div className="flex justify-center my-5 ">
          <form onSubmit={submitHandler}>
            <InputGroup
              placeholder="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <InputGroup
              placeholder="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
            <InputGroup
              placeholder="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <InputGroup
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 my-3 text-sm font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
