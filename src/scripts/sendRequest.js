export default async function (data) {
  const sendMessage = fetch(` http://localhost/request`, {
    method: 'post',
    body: JSON.stringify(data),
  })

  console.log('')
  console.log('Отправлено:', data)

  try {
    const promise = await sendMessage
    console.log(promise.status)
    console.log(await promise.json())
  } catch (error) {
    console.log(error)
  }
}
