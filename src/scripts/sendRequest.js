export default async function () {
  const data = {}
  Object.keys(localStorage).forEach((key) => {
    data[key] = localStorage.getItem(key)
  })

  const sendMessage = fetch(` http://localhost/request`, {
    method: 'post',
    body: JSON.stringify(data),
  })

  try {
    alert('Форма отправлена (подробности в консоли)')
    console.log('Отправлено:', data)

    const promise = await sendMessage
    console.log(await promise.json())
  } catch (error) {
    console.log(error)
  }
}
