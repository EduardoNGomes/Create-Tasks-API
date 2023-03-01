export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM GET')
    }
  },
  {
    method: 'PUT',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM PUT')
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM POST')
    }
  },
  {
    method: 'DELETE',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM DELETE')
    }
  },
  {
    method: 'PATCH',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM PATCH')
    }
  }
]
