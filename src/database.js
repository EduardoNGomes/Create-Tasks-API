export class Database {
  #database = {}
  #message = ''
  // constructor(){

  // }

  insert(table, data) {
    if (Array.isArray(table)) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    return data
  }
  select(table) {
    let data = this.#database[table] ?? []

    return data
  }
}
