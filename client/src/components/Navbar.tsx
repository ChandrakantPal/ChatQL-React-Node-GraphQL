import { Link, useHistory } from 'react-router-dom'
import { useAuthDispatch } from '../context/Auth'

const Navbar = () => {
  const dispatch = useAuthDispatch()
  const history = useHistory()
  const logout = () => {
    dispatch('LOGOUT')
    history.push('/login')
  }
  return (
    <nav className="bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Register
                </Link>
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
