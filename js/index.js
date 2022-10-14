window.addEventListener('load', init)

function init() {
  const worriesFromSession = JSON.parse(window.sessionStorage.getItem('worries'))
  let worryArray = worriesFromSession ?? []
  const worryForm = document.getElementById('worry-form')
  const worryInput = document.getElementById('worry')
  const reviewButton = document.getElementById('review-worries')
  const worriesList = document.getElementById('worries-list')

  worryForm.addEventListener('submit', (e) => {
    e.preventDefault()
    worryArray.push(worryInput.value.trim())
    window.sessionStorage.setItem('worries', JSON.stringify(worryArray))
    worryInput.value = ''
  })

  reviewButton.addEventListener('click', () => {
    const worries = JSON.parse(window.sessionStorage.getItem('worries'))
    Array.from(worries).forEach(worry => {
      const listEl = document.createElement('li')
      listEl.textContent = worry
      worriesList.append(listEl)
    })
  })
}
