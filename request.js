import 'whatwg-fetch'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        // console.log('request succeeded with JSON response', data)
        resolve(data);
      }).catch(function(error) {
        console.log('request failed', error)
        reject(error)
      })
  })
}

export default fetch('/user/list')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })