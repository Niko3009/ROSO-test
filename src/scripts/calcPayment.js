export default function () {
  const inputs = {}
  const form = document.querySelector('form')
  const reqFormButton = document.querySelector('div.form_buttons>button')
  const calcResultString = document.querySelector('div.form_calcResult>h2')
  let errorStatus = false

  for (let input of form.querySelectorAll('input')) {
    const name = input.getAttribute('name')
    inputs[name] = input
  }
  for (let name of ['creditSize', 'initialPayment', 'creditPeriod']) {
    if (inputs[name].value > 0)
      inputs[name].value = Math.floor(inputs[name].value)
  }

  for (let name in inputs) {
    const label = form.querySelector(`label[name=${name}]`)
    if (!inputs[name].value || inputs[name].value <= 0) {
      errorStatus = true
      label.classList.add('isError')
    } else {
      label.classList.remove('isError')
    }
  }

  if (!errorStatus) {
    const payment = calcPayment()
    calcResultString.innerHTML = payment + ' ₽'
    localStorage.setItem('monthlyPayment', payment)
    console.log(payment !== '-', payment)
    reqFormButton.disabled = payment === '-'
  } else {
    calcResultString.innerHTML = '- ₽'
    localStorage.setItem('monthlyPayment', '-')
    reqFormButton.disabled = true
  }
}

function calcPayment() {
  const values = {}
  const form = document.querySelector('form')
  for (let input of form.querySelectorAll('input')) {
    const name = input.getAttribute('name')
    values[name] = input.value
  }

  const creditSize = values['creditSize']
  const initialPayment = values['initialPayment']
  const creditRate = values['creditRate']
  const creditPeriod = values['creditPeriod']

  const monthlyRate = creditRate / 12
  const creditPeriodInMonth = creditPeriod * 12

  const monthlyPayment =
    (creditSize - initialPayment) *
    (((1 + monthlyRate) ** creditPeriodInMonth * monthlyRate) /
      ((1 + monthlyRate) ** creditPeriodInMonth - 1))

  const result = isNaN(monthlyPayment)
    ? '-'
    : Math.floor(monthlyPayment * 100) / 100

  return result
}
