const URL = 'http://hp-api.herokuapp.com/api/characters'

window.addEventListener('DOMContentLoaded', () =>{

    const div_content = document.getElementById('content_harryPotter')
    const tag_h1 = document.getElementById('title_harryPotter')

    let charactersInHTML = ""
    let data = getDataLocalStorage()
    
    if(data == null){
        console.log('No hay datos guardados en el local storage')
        fetch(URL)
        .then( res => res.json())
        .then( data => {
            // Create HTML Of characters
            data.forEach( character => {
                charactersInHTML += createHTML_character(character)
            })
            // Add to HTML
            div_content.innerHTML = charactersInHTML
            // Save to local storage
            saveDate(data)
            // Set title
            tag_h1.textContent = 'Harry Potter'
        })
        .catch( err => {
            // Set title
            tag_h1.textContent = 'Error :('
            console.log(err)
        })
    }else{
        
        // Create HTML Of characters
        data.forEach( character => {
            charactersInHTML += createHTML_character(character)
        })
        // Add to HTML
        div_content.innerHTML = charactersInHTML
        // Set title
        tag_h1.textContent = 'Harry Potter'
    }


})


function getDataLocalStorage(){
    const dataLocalStorage = localStorage.getItem('charactersHarryPotter')
    if(dataLocalStorage == null) return null

    const dataInJSON = JSON.parse(dataLocalStorage)
    return dataInJSON.characters
}

function saveDate(characters){
    const data = {
        length: characters.length,
        characters
    }
    localStorage.setItem('charactersHarryPotter', JSON.stringify(data))
}

function createHTML_character(character){
    return `
    <div class="col">
        <div class="card text-center text-md-start">
            <img src="${(character.image == '' ? '../../resources/harryPotter/hogwarts_icon.png' : character.image)}" class="card-img-top" alt="image ${character.name}">
            <div class="card-body">
                <h2 class="card-title m-0">${character.name}</h2>
                <p class="card-text mb-2"><small class="text-muted fst-italic">${character.dateOfBirth}</small></p>
                <hr class="mt-0 mb-3" />
                <p class="card-text m-0">
                ${character.species} (${character.gender}) - ${(character.alive ? "alive" : "dead")}
                </p>

                <!-- Section Wizard -->
                ${(createHTML_characterWizard(character))}

            </div>
            <div class="card-footer">
                <small class="text-muted text-card-footer">Actor: ${(character.actor != '' ? character.actor : '...')}</small>
            </div>
        </div>
    </div>
    `
}

function createHTML_characterWizard(character){
    if(!character.wizard) return ""
    const htmlWand = character.wand.wood == '' ? '...' : `${character.wand.wood}, ${character.wand.core}` 
    const textPatronus = character.patronus == '' ? '...' : character.patronus
    return `
        <p class="m-0 p-0">Wizard (${(character.hogwartsStudent ? "student" : "not student")})</p>
        <p class="m-0 p-0">Patronus: ${textPatronus}</p>
        <p class="m-0 p-0">Wand: ${htmlWand}</p>
    `
}
