window.addEventListener('load', init)

function getCurrentYear() {
  const currentYear = new Date().getFullYear()
  document.getElementById('current-year').textContent = currentYear
}

const listeningDollMessages = {
  doll1: [
    'Please tell me your worries! I\'m listening!',
    'I\'m here and ready to hear about your worries!',
    'Hello! What is bothering you this evening?',
  ],
  doll2: [
    'Let me know what you are worried about.',
    'Ready for bedtime? First, tell me about your worries.',
    'I want to help! What are you worried about?'
  ],
  doll3: [
    'What is causing you worry right now?',
    'Tell me your worries, please!',
    'Why don\'t you tell me something that you are worried about?'
  ]
}

let showWorries = false
const worriesList = document.getElementById('worries-list')
const reviewButton = document.getElementById('review-worries')
const reviewingDollsEl = document.getElementById('reviewing-dolls')
const reviewButtonMessageEl = document.getElementById('review-button-message')

function init() {
  getCurrentYear()
  const worriesFromSession = JSON.parse(window.sessionStorage.getItem('worries'))
  let worryArray = worriesFromSession ?? []
  const worryForm = document.getElementById('worry-form')
  const worryInput = document.getElementById('worry')

  const listeningDoll = document.getElementById('listening-doll')
  const listeningDollMessage = document.getElementById('listening-doll-message')
  const submitWorryButton = document.getElementById('submit-worry')
  const successMessageEl = document.getElementById('success-message')
  const reviewWorriesSection = document.getElementById('review-worries-section')


  if (worryArray.length > 0) {
    reviewWorriesSection.classList.remove('hidden')
  }
  const worryDollButtons = []

  for(let i = 1; i < 4; i++) {
      window['worryDollButton'+i] = document.getElementById(`doll${i}`)
      worryDollButtons.push(window['worryDollButton'+i])
  }

  worryDollButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault()
      worryForm.classList.remove('invisible')
      worryForm.classList.add('visible')
      listeningDoll.src = `./static/images/${button.id}.png`
      const currentDollMessagesLength = listeningDollMessages[button.id].length
      listeningDollMessage.textContent = listeningDollMessages[button.id][Math.floor(Math.random() * currentDollMessagesLength)]
    })
  })

  worryForm.addEventListener('submit', (e) => {
    e.preventDefault()
    worryArray.push(worryInput.value.trim())
    window.sessionStorage.setItem('worries', JSON.stringify(worryArray))
    worryInput.value = ''
    submitWorryButton.classList.add('hidden')
    successMessageEl.classList.remove('hidden')
    successMessageEl.classList.add('block')
    reviewWorriesSection.classList.remove('hidden')
    setTimeout(() => {
      submitWorryButton.classList.remove('hidden')
      submitWorryButton.classList.add('block')
      successMessageEl.classList.remove('block')
      successMessageEl.classList.add('hidden')
      worryForm.classList.add('invisible')
      worryForm.classList.remove('visible')
    }, 1000)
  })


  reviewingDollsEl.addEventListener('click', toggleShowWorries)

}

function toggleShowWorries() {
  showWorries = !showWorries
  clearWorriesUl()
  if (showWorries) {
    const worries = JSON.parse(window.sessionStorage.getItem('worries'))

    if (worries) {
      Array.from(worries).forEach(worry => {
        const listEl = document.createElement('li')
        listEl.textContent = `"${worry}"`
        worriesList.append(listEl)
      })
    }
    reviewButtonMessageEl.textContent = "Send your worries back"
  } else {
    reviewButtonMessageEl.textContent = "Review what you've told the worry dolls"
  }
}

function clearWorriesUl() {
  const worriesList = document.getElementById('worries-list')
  while(worriesList.firstChild) {
    worriesList.removeChild(worriesList.lastChild)
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
      const links = document.querySelectorAll("a.smooth-scroll")
      for (const link of links) {
        link.addEventListener("click", linkClickHandler)
      }
      function linkClickHandler(e) {
        e.preventDefault()
        const href = this.getAttribute("href")
        const section = document.querySelector(href)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const buffer = 120 // fixed nav height
        scroll({
          top: (section.getBoundingClientRect().top + scrollTop) - buffer,
          behavior: "smooth"
        })
      }
    });
