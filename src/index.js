import './styles/normalize.css'
import './styles/index.css'

import setInitialSettings from './scripts/initialSetting'
import sendRequest from './scripts/sendRequest'

const monthlyPayment = localStorage.getItem('monthlyPayment')
const location = window.location.pathname

window.goToRequest = () => (window.location.href = './request.html')
window.goToCalculator = () => (window.location.href = './index.html')
window.sendRequest = sendRequest

document.addEventListener('DOMContentLoaded', () => {
  setInitialSettings()

  if (location === '/request.html' && !(monthlyPayment > 0)) {
    window.location.href = 'index.html'
  }
})
