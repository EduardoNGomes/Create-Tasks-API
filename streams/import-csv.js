import { parse } from 'csv-parse'
import fs from 'node:fs'

// Caminho do arquivo csv
const csvPath = new URL('../Book.csv', import.meta.url)

// Realizando a leitura da stream do arquivo csv
const stream = fs.createReadStream(csvPath)

// Constante que irá configurar como será lido a stream do arquivo csv
const csvParse = parse({
  delimiter: ',', // Separando por virgula
  skip_empty_lines: true, // Pulando linhas vazias
  from_line: 2 // Começando na segunda linha, pois a primeira é o cabeçalho
})

async function run() {
  // Lendo o arquivo csv
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    // Desestruturando title(primeiro index do array) e description(segundo index do array)
    const [title, description] = line

    // fazendo a requisicão para o servidor para cadastrar os dados no db
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    })
  }
}

run()
