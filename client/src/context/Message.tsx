import { createContext, useContext, useReducer } from 'react'
import { Message, User } from '../types'

interface State {
  users: User[] | undefined
  messages: Message[] | undefined
  selectedUser: string | undefined
}

interface Action {
  type: string
  payload: any
}

const MessageStateContext = createContext<State>({
  users: null,
  messages: null,
  selectedUser: null,
})

const MessageDispatchContext = createContext(null)

const messageReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SET_USERS':
      return {
        ...state,
        users: payload,
      }
    case 'SET_USER_MESSAGES':
      return {
        ...state,
        messages: payload,
      }
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: payload,
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
  const [state, defaultDispatch] = useReducer(messageReducer, {
    users: null,
    messages: null,
    selectedUser: null,
  })

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
