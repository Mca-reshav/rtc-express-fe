
export const eventObj = Object.freeze({
  JOIN: 'join_session',
  LEAVE: 'disconnect',
  SEND: 'send_message',
  UPDATE: 'editor_update'
} as const)

export const passiveEventObj = Object.freeze({
  JOINED: 'user_joined',
  RECEIVE: 'receive_message',
  UPDATE: 'editor_update'
} as const)
