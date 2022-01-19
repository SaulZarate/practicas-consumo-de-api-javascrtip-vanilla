const URL = 'https://digimon-api.vercel.app/api/digimon'

window.addEventListener('DOMContentLoaded', () => {
    
    const title_h2 = document.getElementById('title_digimon')
    const content_data = document.getElementById('content_digimon')
    let htmlDigimons = ''

    fetch(URL)
        .then( res => {
            if(res.status == 200){
                return res.json()
            }
            alert('Hubo un problema con el servidor, vuelva a intentarlo mas tarde')
        })
        .then( info => {

            // Cambio el titulo
            title_h2.innerText = 'Digimon'

            // Creo el html de los digimons
            info.forEach( digimon => {
                htmlDigimons += createHTML(digimon)
            })

            // Agrego los digimons al DOM
            content_data.innerHTML = htmlDigimons
        })
        .catch( err => console.log(err))
})


function createHTML(digimon){
    return `
    <div class="col">
        <div class="card">
            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
            <div class="card-body">
                <h3 class="card-title display-6">${digimon.name}</h3>
                <p class="card-text">${digimon.level}</p>
            </div>
        </div>
    </div>
    `
}