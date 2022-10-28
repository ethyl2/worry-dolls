window.addEventListener('load', init)

const listeningDollMessages = {
  doll1: 'Please tell me your worries! I\'m listening!',
  doll2: 'Let me know what you are worried about.',
  doll3: 'What is causing you worry right now?',
}

function init() {
  const worriesFromSession = JSON.parse(window.sessionStorage.getItem('worries'))
  let worryArray = worriesFromSession ?? []
  const worryForm = document.getElementById('worry-form')
  const worryInput = document.getElementById('worry')
  const reviewButton = document.getElementById('review-worries')
  const worriesList = document.getElementById('worries-list')
  const listeningDoll = document.getElementById('listening-doll')
  const listeningDollMessage = document.getElementById('listening-doll-message')
  const submitWorryButton = document.getElementById('submit-worry')
  const successMessageEl = document.getElementById('success-message')

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
      listeningDollMessage.textContent = listeningDollMessages[button.id]
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
    setTimeout(() => {
      submitWorryButton.classList.remove('hidden')
      submitWorryButton.classList.add('block')
      successMessageEl.classList.remove('block')
      successMessageEl.classList.add('hidden')
    }, 1000)
  })

  reviewButton.addEventListener('click', () => {
    const worries = JSON.parse(window.sessionStorage.getItem('worries'))
    clearWorriesUl()
    Array.from(worries).forEach(worry => {
      const listEl = document.createElement('li')
      listEl.textContent = worry
      worriesList.append(listEl)
    })
  })
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
