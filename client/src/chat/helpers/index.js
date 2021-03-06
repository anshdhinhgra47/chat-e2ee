import { storage } from '../../utils';
import { makeRequest } from '../../service';

export { fetchMessages, getUsersInChannel, pubnubInit } from './pubnub';

export const getUserSessionID = (uuid) => {
  const userID_storage = storage.get('session-user-uuid') || {};
  const userId = userID_storage.uuid === uuid ? userID_storage.userId : null;
  return userId;
};

export const createUserSessionID = (uuid) => {
  return `${uuid}-${new Date().getTime()}`;
};

export const storeUserSessionID = (uuid, userId) => {
  storage.set('session-user-uuid', {
    uuid,
    userId
  });
};

export const sendMessage = async ({ uuid, userId, text }) => {
  await makeRequest('chat/send', {
    method: 'POST',
    body: {
      channel: uuid,
      sender: userId,
      message: text
    }
  });
};
