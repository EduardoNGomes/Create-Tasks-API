import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}
  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }
  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  update(table, id, data) {
    let message = 'Success updated task'
    let code = 200
    const indexToUpdate = this.#database[table].findIndex(
      task => task.id === id
    )
    const taskUpdated = { ...this.#database[table][indexToUpdate], ...data }

    if (indexToUpdate > -1) {
      this.#database[table].splice(indexToUpdate, 1, taskUpdated)
    } else {
      message = 'ID incorrect'
      code = 404
    }

    this.#persist()

    return [message, code]
  }

  delete(table, id) {
    let message = ''
    let code = 204
    const taskToDelete = this.#database[table].findIndex(task => task.id === id)

    if (taskToDelete > -1) {
      this.#database[table].splice(taskToDelete, 1)
      message = 'Task deleted'
    } else {
      message = 'ID incorrect'
      code = 404
    }

    this.#persist()

    return [message, code]
  }

  updateStatusTask(table, id, completed_at) {
    let message = 'task conclude'
    let code = 200
    const indexToCompleteTask = this.#database[table].findIndex(
      task => task.id === id
    )
    if (indexToCompleteTask > -1) {
      if (this.#database[table][indexToCompleteTask].completed_at) {
        message = 'This task is completed'
        code = 400
      } else {
        const taskConclude = {
          ...this.#database[table][indexToCompleteTask],
          completed_at
        }

        this.#database[table].splice(indexToCompleteTask, 1, taskConclude)
      }
    } else {
      message = 'ID incorrect'
      code = 404
    }

    this.#persist

    return [message, code]
  }
}
