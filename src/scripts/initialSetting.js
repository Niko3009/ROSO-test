import calcPayment from './calcPayment'

export default function () {
  const location = window.location.pathname
  const form = document.querySelector('form')
  const inputs = form.querySelectorAll('input')

  // Авто-сохранения и авто-заполнение полей ввода
  for (let input of inputs) {
    const name = input.getAttribute('name')
    input.value = localStorage.getItem(name)
    input.addEventListener('input', function (event) {
      localStorage.setItem(name, event.target.value)
    })
  }

  // Настройка авто-расчета калькулятора
  if (location === '/index.html') {
    calcPayment()
    for (let input of inputs) {
      input.addEventListener('input', calcPayment)
    }
  }

  // Настройки для динамического placeholder
  for (let input of inputs) {
    const name = input.getAttribute('name')
    const label = form.querySelector(`label[name=${name}]`)

    if (!!input.value) label.classList.add('isActive')
    else label.classList.remove('isActive')

    input.addEventListener('input', function (event) {
      if (!!input.value) label.classList.add('isActive')
      else label.classList.remove('isActive')
    })
  }
}
