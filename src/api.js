// const baseURL = 'http://194.58.103.246';
const baseURL = 'http://80.78.251.86:3000';

export async function registerGuest(name, questions) {
  console.log(name);
  return fetch(`${baseURL}/guest/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, questions
    })
  })
    .then((res) => res.json());
}

export async function login(body) {
  return fetch(`${baseURL}/login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json());
}

export async function userPurchase(token, body) {
  return fetch(`${baseURL}/purchase/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json());
}

export async function updateProfile(token, body) {
  return fetch(`${baseURL}/update/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json());
}

export async function restorePassword(email) {
  return fetch(`${baseURL}/restore/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  })
    .then((res) => res.json());
}

export async function courseEnd(token, id) {
  return fetch(`${baseURL}/courseEnd/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id })
  })
    .then((res) => res.json());
}

export async function getCourses(token) {
  return fetch(`${baseURL}/courses/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
}

export async function getMyCourses(token) {
  return fetch(`${baseURL}/my_courses/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
}

export async function getCourse(id, token) {
  return fetch(`${baseURL}/courses?id=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
}

export async function getExercises(token) {
  return fetch(`${baseURL}/exercises/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
}

export async function getExerciseCategories(token) {
  return fetch(`${baseURL}/exerciseCategories/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
}
