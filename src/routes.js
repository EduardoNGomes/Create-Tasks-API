import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { formattedDate } from './utils/formattedDate.js'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const allTasks = database.select('tasks')

      return res.end(JSON.stringify(allTasks))
    }
  },
  // POST
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
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
        completed_at: null
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
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const { title, description } = req.body

      let data = {}
      if (!title) {
        data = {
          description,
          updated_at: formattedDate()
        }
      } else if (!description) {
        data = {
          title,
          updated_at: formattedDate()
        }
      } else {
        data = {
          title,
          description,
          updated_at: formattedDate()
        }
      }

      const [message, code] = database.update('tasks', id, data)

      return res.writeHead(code).end(JSON.stringify(message))
    }
  },
  // DELETE
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      if (!id) {
        return res.writeHead(404).end('id not found')
      }
      const [message, code] = database.delete('tasks', id)
      return res.writeHead(code).end(JSON.stringify(message))
    }
  },
  // PATCH
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const [message, code] = database.updateStatusTask(
        'tasks',
        id,
        formattedDate()
      )
      return res.writeHead(code).end(JSON.stringify(message))
    }
  }
]
