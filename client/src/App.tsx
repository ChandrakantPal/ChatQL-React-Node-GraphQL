import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApolloProvider from './ApolloProvider'
import Home from './components/Home'

import Login from './components/Login'
import Register from './components/Register'
import { AuthProvider } from './context/Auth'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="container mx-auto">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
