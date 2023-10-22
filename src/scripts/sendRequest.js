export default async function () {
  const data = {}
  const form = document.querySelector('form')
  const inputs = form.querySelectorAll('input')
  for (let input of inputs) {
    const name = input.getAttribute('name')
    data[name] = input.value
  }

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
