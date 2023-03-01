import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { formattedDate } from './utils/formattedDate.js'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const allTasks = database.select('tasks')

      return res.end(JSON.stringify(allTasks))
    }
  },
  // POST
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(
            'Tarefa não computada, por favor, verifique as informações e tente novamente'
          )
      }

      const data = {
        id: randomUUID(),
        title,
        description,
        created_at: formattedDate(),
        updated_at: formattedDate(),
        completed_at: formattedDate()
      }

      const task = database.insert('tasks', data)

      if (task) {
        return res.writeHead(201).end('SUCCESS')
      }

      return res.writeHead(500).end('SERVER ERROR')
    }
  },
  // PUT
  {
    method: 'PUT',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM PUT')
    }
  },
  // DELETE
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM DELETE')
    }
  },
  // PATCH
  {
    method: 'PATCH',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('ACESSOU USERS COM PATCH')
    }
  }
]
