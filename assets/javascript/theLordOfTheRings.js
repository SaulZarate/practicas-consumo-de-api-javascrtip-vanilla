const URL_MOVIE = 'https://the-one-api.dev/v2/movie?budgetInMillions<260'

window.addEventListener('DOMContentLoaded', () => {
    const div_peliculas = document.getElementById('content_peliculas')
    const div_spinner = document.getElementById('content_spinner')

    fetch(URL_MOVIE, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer G6U8_XB6rXkuhvvdl42h'
        },
        cache: 'default'
    })
        .then(res => {
            if(res.status == 200){
                return res.json()
            }
            throw new Error("No se pudieron extraer los datos")
        })
        .then(info => {
            div_spinner.style.display = 'none'
            div_peliculas.style.display = 'block'
            updateDOM(info.docs)
        })
        .catch(err => console.log(err))

    function updateDOM(peliculas) {
        
        div_peliculas.innerHTML = `
            <h2 class="display-6 m-0">Peliculas de J.R.R. Tolkien</h2>
            <hr class="my-3" />

            <div class="accordion" id="accordionPeliculas">`

        peliculas.forEach( (pelicula, index) => {
            div_peliculas.innerHTML += `
            <div class="accordion-item ${(index === 0 ? "border-top" : "")}">
                <h3 class="accordion-header" id="heading${index}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">${pelicula.name}</button>
                </h3>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionPeliculas">
                    <div class="accordion-body">
                        <ul>
                            <li class="text-muted"><strong>Nominaciones: </strong>${pelicula.academyAwardNominations}</li>
                            <li class="text-muted"><strong>Premios ganados: </strong>${pelicula.academyAwardWins}</li>
                            <li class="text-muted"><strong>Presupuesto: </strong>${pelicula.budgetInMillions} millones</li>
                            <li class="text-muted"><strong>Recaudación: </strong>${pelicula.boxOfficeRevenueInMillions} millones</li>
                        </ul>
                    </div>
                </div>
            </div>`
        })

        div_peliculas.innerHTML += '</div>'
    }

})