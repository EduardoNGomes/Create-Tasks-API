export function formattedDate(date = new Date()) {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)

  return formattedDate
}
