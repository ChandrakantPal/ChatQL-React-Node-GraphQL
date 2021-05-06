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
  let messageUpdate
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
    case 'ADD_MESSAGE':
      messageUpdate = [...state.messages]
      messageUpdate.unshift({ ...payload, reactions: [] })
      return {
        ...state,
        messages: messageUpdate,
      }
    case 'ADD_REACTION':
      messageUpdate = [...state.messages]
      const messageIndex = messageUpdate?.findIndex(
        (message) => message.uuid === payload.message.uuid
      )

      if (messageIndex > -1) {
        let reactionsUpdate = [...messageUpdate[messageIndex]?.reactions]
        const reactionIndex = reactionsUpdate?.findIndex(
          (reaction) => reaction.uuid === payload.uuid
        )
        if (reactionIndex > -1) {
          // Reaction exists update it
          reactionsUpdate[reactionIndex] = payload
        } else {
          //New Reaction, add it
          reactionsUpdate = [...reactionsUpdate, payload]
        }
        messageUpdate[messageIndex] = {
          ...messageUpdate[messageIndex],
          reactions: reactionsUpdate,
        }
      }
      return {
        ...state,
        messages: messageUpdate,
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
