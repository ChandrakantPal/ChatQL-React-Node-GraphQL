export interface User {
  username: string
  email?: string
  token?: string
  createdAt?: string
  imageUrl?: string
  latestMessage?: Message
}

export interface Message {
  uuid: string
  from: string
  to: string
  content: string
}
