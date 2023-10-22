import './styles/normalize.css'
import './styles/index.css'

import setInitialSettings from './scripts/initialSetting'
import handleForm from './scripts/handleForm'

const monthlyPayment = localStorage.getItem('monthlyPayment')
const location = window.location.pathname
if (!monthlyPayment && location !== '/index.html')
  window.location.href = 'index.html'

window.goToRequest = function () {
  window.location.href = './request.html'
}
window.goToCalculator = function () {
  window.location.href = './index.html'
}
window.handleForm = handleForm

document.addEventListener('DOMContentLoaded', () => {
  setInitialSettings()
})
