// Sample users for development and testing
// In production, use a proper authentication service
const SAMPLE_USERS = [
  {
    id: "1",
    email: "sysad@demo.com",
    password: "sysad123",
    name: "System Admin",
    role: "sysad",
  },
  {
    id: "2",
    email: "peso@demo.com",
    password: "peso123",
    name: "PESO Officer",
    role: "peso",
  },
]

function validateUser(email, password) {
  const user = SAMPLE_USERS.find((u) => u.email === email && u.password === password)
  return user || null
}

export { SAMPLE_USERS, validateUser }
