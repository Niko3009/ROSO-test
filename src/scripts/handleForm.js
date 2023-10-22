import sendRequest from './sendRequest'

export default async function () {
  const inputs = {}
  const form = document.querySelector('form')
  let errorStatus = false

  for (let input of form.querySelectorAll('input')) {
    const name = input.getAttribute('name')
    inputs[name] = input
  }

  for (let name of ['name', 'familyName']) {
    const label = form.querySelector(`label[name=${name}]`)
    if (inputs[name].value.length < 3) markError(label)
    else unmarkError(label)
  }

  const phoneLabel = form.querySelector(`label[name=phone]`)
  const phoneRegEx = /^(([0-9]){11})$/
  if (!phoneRegEx.test(inputs['phone'].value)) markError(phoneLabel)
  else unmarkError(phoneLabel)

  const emailLabel = form.querySelector(`label[name=e-mail]`)
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
  if (!emailRegEx.test(inputs['e-mail'].value)) markError(emailLabel)
  else unmarkError(emailLabel)

  if (!errorStatus) {
    const data = {}
    for (let input of form.querySelectorAll('input')) {
      const name = input.getAttribute('name')
      data[name] = input.value
    }
    sendRequest(data)
  }

  function markError(label) {
    errorStatus = true
    label.classList.add('isError')
  }
  function unmarkError(label) {
    label.classList.remove('isError')
  }
}

