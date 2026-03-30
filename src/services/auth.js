const USERS_KEY = 'mtss_users'
const SESSION_KEY = 'mtss_session'

function getUsers() {
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(name, email, password) {
  const users = getUsers()

  const exists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  )

  if (exists) {
    throw new Error('Já existe uma conta com este e-mail.')
  }

  if (password.length < 6) {
    throw new Error('A senha precisa ter pelo menos 6 caracteres.')
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

export function loginUser(email, password) {
  const users = getUsers()

  const foundUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  )

  if (!foundUser) {
    throw new Error('E-mail ou senha inválidos.')
  }

  const sessionUser = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
  return sessionUser
}

export function getCurrentUser() {
  const data = localStorage.getItem(SESSION_KEY)
  return data ? JSON.parse(data) : null
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}