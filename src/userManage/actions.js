import { USER_LIST } from './constants';

export function getUserList(payload) {
  return {
    type: `${USER_LIST}`,
    payload,
  }
}
