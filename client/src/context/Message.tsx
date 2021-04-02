import { createContext, useContext, useReducer } from 'react'
import { User } from '../types'

interface State {
  users: User[] | undefined
}

interface Action {
  type: string
  payload: any
}

const MessageStateContext = createContext<State>({
  users: null,
})

const MessageDispatchContext = createContext(null)

const messageReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SET_USERS':
      return {
        ...state,
        users: payload,
      }
    default:
      throw new Error(`Unknow action type: ${type}`)
  }
}

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, defaultDispatch] = useReducer(messageReducer, { users: null })

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload })

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)
