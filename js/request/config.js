const BASE_URL = 'http://melo.show:3000';

function get(_url) {
  const url = BASE_URL + _url;

  return fetch(url, {
    method: 'GET',
  })
    .then(response => {
      return handleResponse(url, response);
    })
    .catch(error => {
      console.error(`Request failed. Url = ${url}. Message = ${error}`);
      return Promise.reject({error: {message: 'Request failed.'}});
    });
}

function post(_url, data) {
  const url = BASE_URL + _url;
  return fetch(url, {
    method: 'POST',
    body: data,
  })
    .then(response => {
      return handleResponse(url, response);
    })
    .catch(error => {
      console.error(`Request failed. Url = ${url}. Message = ${error}`);
      return Promise.reject({error: {message: 'Request failed.'}});
    });
}

function handleResponse(url, response) {
  if (response.status === 200) {
    const res = response.json();
    console.log(url);
    console.log(res);
    return res;
  } else {
    console.error(`Request failed. Url = ${url}`);
    return Promise.reject({
      error: {message: 'Request failed due to server error'},
    });
  }
}

export {get, post};
