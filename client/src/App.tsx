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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
