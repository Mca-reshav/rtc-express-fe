
export const eventObj = Object.freeze({
  JOIN: 'join_session',
  DISCONNECT: 'disconnect',
  SEND: 'send_message',
  UPDATE: 'editor_update',
  LEAVE: 'leave_session'
} as const)

export const passiveEventObj = Object.freeze({
  JOINED: 'user_joined',
  RECEIVE: 'receive_message',
  UPDATE: 'editor_update',
  PRESENCE: 'presence_update'
} as const)
