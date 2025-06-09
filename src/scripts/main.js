import 'normalize.css'

const url = new Request('./personagensPrincipais.json')
const list = document.getElementById('herois')
const loadMoreButton = document.getElementById('loadMore')

let allHerois = []
let currentPage = 0
const itemsPerPage = 6  

function renderNextHeroes() {
  const start = currentPage * itemsPerPage
  const end = start + itemsPerPage
  const nextHerois = allHerois.slice(start, end)

  nextHerois.forEach((heroi) => {
    list.innerHTML += convertHeroiHtml(heroi)
  })
  currentPage++
  // Esconde o botão se já exibiu todos
  if (currentPage * itemsPerPage >= allHerois.length) {
    loadMoreButton.style.display = 'none'
  }
}
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    allHerois = data
    renderNextHeroes()
  })
  .catch((err) => {
    console.log('Erro na requisição: ', err.message)
  })

loadMoreButton.addEventListener('click', renderNextHeroes)
function convertHeroiHtml(heroi) {
  return `
    <li class="heroi" style="background: ${heroi.bg};">
      <span class="number">#${heroi.id}</span>
      <span class="name">${heroi.name}</span>
      
      <div class="detail">
        <ol class="habilities">
          <span class="func">${heroi.description}</span>
          <li class="type" style="background: ${heroi.bg};">${heroi.especiality.result1}</li>
          <li class="type" style="background: ${heroi.bg};">${heroi.especiality.result2}</li>
        </ol>
        <img src="${heroi.img}" alt="${heroi.name}">
      </div>
      <button class="knowMore"style="background: ${heroi.bg};opacity: .7;">Saiba Mais</button>
    </li>
  `
}
