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
  select(table) {
    let data = this.#database[table] ?? []

    return data
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
}
