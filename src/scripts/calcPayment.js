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

  const payment = !errorStatus ? calcPayment() : 0
  calcResultString.innerHTML = payment + ' ₽'
  localStorage.setItem('monthlyPayment', payment)
  reqFormButton.disabled = !(payment > 0)
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
  const monthlyRate = creditRate / 100 / 12
  const creditPeriod = values['creditPeriod']
  const creditPeriodInMonth = creditPeriod * 12

  let monthlyPayment =
    ((creditSize - initialPayment) *
      (1 + monthlyRate) ** creditPeriodInMonth *
      monthlyRate) /
    ((1 + monthlyRate) ** creditPeriodInMonth - 1)

  monthlyPayment = Math.floor(monthlyPayment * 100) / 100

  return !!monthlyPayment ? monthlyPayment : 0
}
