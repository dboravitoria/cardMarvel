import 'normalize.css'


const url = new Request('./personagensPrincipais.json')
const list = document.getElementById('herois')
const loadMoreButton = document.getElementById('loadMore')
fetch(url)
.then((res) => res.json())
.then((data) =>{
    for (let i = 0; i < data.length; i++) {
        const heroi = data[i];
        list.innerHTML += convertHeroiHtml(heroi)

    }
}).catch((err)=>{
    console.log('Erro na resquisição: ', err.message)
})

function convertHeroiHtml(heroi){
    return`
    <li class="heroi" style="background: ${heroi.bg};">
          <span class="number">#00${(heroi.id)}</span>
          <span class="name">${heroi.name}</span>
          
          <div class="detail">
            <ol class="habilities">
            <span class="func">${heroi.description}</span>
              <li class="type"style="background: ${heroi.bg};">${heroi.especiality.result1}</li>
              <li class="type"style="background: ${heroi.bg};">${heroi.especiality.result2}</li>
            </ol>
            
            <img src="${heroi.img}" alt="${heroi.name}">
          </div>
        </li>
    `
}

