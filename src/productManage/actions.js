export function incremented() {
  return {
    type: 'counter/incremented',
  }
}

export function decremented() {
  return {
    type: 'counter/decremented',
  }
}

export function getUserList(payload) {
  return {
    type: 'product/list',
    payload,
  }
}
