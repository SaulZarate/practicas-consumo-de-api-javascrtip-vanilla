const URL_episodios = 'https://rickandmortyapi.com/api/episode'
const URL_personajes = 'https://rickandmortyapi.com/api/character'
const URL_ubicaciones = 'https://rickandmortyapi.com/api/location'

window.addEventListener('DOMContentLoaded', () => {

    const tbody_episodios = document.getElementById('tbody_rickAndMorty')
    const content_personajes = document.getElementById('content_personajes')
    const content_ubicaciones = document.getElementById('content_ubicaciones')

    // Nav
    funcionalidadNav()

    // Busqueda de datos
    getEpisodios(tbody_episodios)
    getPersonajes(content_personajes)
    getUbicaciones(content_ubicaciones.firstElementChild.lastElementChild)
})

/* 
    Navigator
*/
function funcionalidadNav() {
    // Nav
    const navEpisodio = document.getElementById('rickAndMorty_navItem_episodios')
    const navPersonajes = document.getElementById('rickAndMorty_navItem_personajes')
    const navUbicaciones = document.getElementById('rickAndMorty_navItem_ubicaciones')

    // Content nav item
    const contentEpisodios = document.getElementById('content_episodios')
    const contentPersonajes = document.getElementById('content_personajes')
    const contentUbicaciones = document.getElementById('content_ubicaciones')

    navEpisodio.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            navPersonajes.classList.remove('active')
            navUbicaciones.classList.remove('active')
        }

        contentEpisodios.style.display = 'block'
        contentPersonajes.style.display = 'none'
        contentUbicaciones.style.display = 'none'
    })
    navPersonajes.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            navEpisodio.classList.remove('active')
            navUbicaciones.classList.remove('active')
        }

        contentEpisodios.style.display = 'none'
        contentPersonajes.style.display = 'block'
        contentUbicaciones.style.display = 'none'
    })
    navUbicaciones.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            navEpisodio.classList.remove('active')
            navPersonajes.classList.remove('active')
        }
        contentEpisodios.style.display = 'none'
        contentPersonajes.style.display = 'none'
        contentUbicaciones.style.display = 'block'
    })
}

/* 
    Episodios
*/
function getEpisodios(content_tbody) {
    const urls_temporadas = [
        URL_episodios + '/[1,2,3,4,5,6,7,8,9,10,11]',
        URL_episodios + '/[12,13,14,15,16,17,18,19,20,21]',
        URL_episodios + '/[22,23,24,25,26,27,28,29,30,31]',
        URL_episodios + '/[32,33,34,35,36,37,38,39,40,41]',
        URL_episodios + '/[42,43,44,45,46,47,48,49,50,51]',
    ]

    urls_temporadas.forEach(url_temporada => {
        fetch(url_temporada)
            .then(res => res.json())
            .then(info => {
                addEpisodiosAlDOM(info, content_tbody)
            })
    })
}

function addEpisodiosAlDOM(temporada, content_tbody) {
    temporada.forEach(episodio => {
        if (parseInt(episodio.episode.substring(1, 3)) != 1 && episodio.episode.substring(4) == "01") {
            content_tbody.innerHTML += `
                <tr class="bg-info">
                    <td colspan=3 ></td>
                </tr>
            `
        }
        content_tbody.innerHTML += `
        <tr class="rickAndMorty_temporadas" >
            <th>${episodio.episode}</th>
            <td>${episodio.name}</td>
            <td>${episodio.air_date}</td>
        </tr>
        `
    })
}

/* 
    Personajes
*/
function getPersonajes(div_content) {
    const numero_paginas = 10
    fetchPersonajes(URL_personajes, numero_paginas, div_content)
}

function fetchPersonajes(url, numero_paginas, div_content) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Elimino el title (h3)
            div_content.firstElementChild.classList.contains('error-request') && div_content.firstElementChild.remove()

            // Agrego los personajes al DOM
            data.results.forEach(personaje => {
                div_content.lastElementChild.innerHTML += addHTML_personaje(personaje)
            })

            const urlCurrent = url
            const numberPageCurrent = parseInt(urlCurrent.substring(urlCurrent.indexOf("=") + 1)) || 1
            if (numberPageCurrent <= numero_paginas) {
                fetchPersonajes(data.info.next, numero_paginas, div_content)
            }
        })
        .catch(err => {
            console.log(err)
            div_content.firstElementChild.textContent = 'Ocurrio un error'
        })
}

function addHTML_personaje(personaje) {
    return `
    <div class="col">
        <div class="card text-center text-md-start">
            <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
            <div class="card-body">
                <h5 class="card-title">${personaje.name} (${personaje.status})</h5>
                <p class="card-text">
                    Specie: ${personaje.species} (${personaje.gender})
                    <br />
                    Origin: ${personaje.origin.name} 
                    <br />
                    Location: ${personaje.location.name}
                    <br /> 
                    Number of episodes: ${(personaje.episode.length)}
                </p>
            </div>
        </div>
    </div>
    `
}


/* 
    Ubicaiones
*/
function getUbicaciones(div_content, urlRequest = URL_ubicaciones) {
    fetch(urlRequest)
        .then(res => res.json())
        .then(data => {
            if(div_content.firstElementChild && div_content.firstElementChild.classList.contains('content_default')){
                div_content.firstElementChild.remove()
            }

            let content_tbody = ''
            // Agregar ubicaciones al DOM
            data.results.forEach(ubicacion => {
                content_tbody += addHTML_ubicacion(ubicacion)
            })
            div_content.innerHTML += content_tbody
            
            // Repito el proceso para todas las paginas
            if (data.info.next != null) {
                getUbicaciones(div_content, data.info.next)
            }
        })
        .catch(err => console.log(err))
}

function addHTML_ubicacion(ubicacion) {
    return `
        <tr>
            <th>${ubicacion.id}</th>
            <th>${ubicacion.name}</th>
            <td>${ubicacion.type}</td>
            <td>${ubicacion.dimension}</td>
        </tr>
        `
}