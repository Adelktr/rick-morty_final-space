let urlFinalSpace = "https://finalspaceapi.com/api/v0/character"
let urlRickMorty = "https://rickandmortyapi.com/api/character"

let buttonChangeList = document.querySelector(".changeList")
let buttonHome = document.querySelector(".returnHome")
let buttonRm = document.querySelector(".showListRm")
let buttonFs = document.querySelector(".showListFs")

let rmSection = document.querySelector(".rmSection")
let fsSection = document.querySelector(".fsSection")
let randomSection = document.querySelector(".randomSection")
let singleSection = document.querySelector(".singleSection")
let singleEpisodeSection = document.querySelector(".singleEpisodeSection")
let allSection = document.querySelectorAll(".section")

let rmContent = document.querySelector(".rmSection-content")
let fsContent = document.querySelector(".fsSection-content")
let randomContent = document.querySelector(".randomSection-content")
let singleContent = document.querySelector(".singleSection-content")
let singleEpisodeContent = document.querySelector(".singleEpisodeSection-content")

let dataArray = []
let randomArray = []

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

fetch(urlRickMorty)
    .then(response => response.json())
    .then(function (data) {
        data.results.forEach(el => {
            card = `
            <p class="card-name"> ${el.name}</p>
            <img class ="img" src="${el.image}" alt="">
        `
            dataArray.push(el)
            let newCard = document.createElement("div")
            newCard.innerHTML = card
            newCard.classList.add("card")
            newCard.dataset.id = el.id
            newCard.dataset.anime = "rickMorty"
            rmContent.appendChild(newCard)
        })

        fetch(urlFinalSpace + "?limit=20")
            .then(response => response.json())
            .then(function (data) {
                data.forEach(element => {
                    card = `
                        <p class="card-name"> ${element.name}</p>
                        <img class ="img" src="${element.img_url}" alt="">
                    `
                    dataArray.push(element)

                    let newCard = document.createElement("div")
                    newCard.innerHTML = card
                    newCard.classList.add("card")
                    newCard.dataset.id = element.id
                    newCard.dataset.anime = "finalSpace"
                    fsContent.appendChild(newCard)
                })
                randomArray = dataArray
                shuffle(randomArray)

                randomArray.forEach(char =>  {
                    if (char.image){
                        card = `
                        <p class="card-name"> ${char.name}</p>
                        <img class ="img" src="${char.image}" alt="">
                    `
                        let newCard = document.createElement("div")
                        newCard.innerHTML = card
                        newCard.classList.add("card")
                        newCard.dataset.id = char.id
                        newCard.dataset.anime = "rickMorty"
                        randomContent.appendChild(newCard)
                    }
                    else{
                        card = `
                        <p class="card-name"> ${char.name}</p>
                        <img class ="img" src="${char.img_url}" alt="">
                    `
                        let newCard = document.createElement("div")
                        newCard.innerHTML = card
                        newCard.classList.add("card")
                        newCard.dataset.id = char.id
                        newCard.dataset.anime = "finalSpace"
                        randomContent.appendChild(newCard)
                    }

                })
                truncateNames()
                onClick()
            })


    })

// Function for show a single character
let onClick = () => {
    let card = document.querySelectorAll(".card")
    card.forEach(el => {
        el.addEventListener("click", () => {
            buttonHome.style.display = "block"
            buttonRm.style.display = "none"
            buttonFs.style.display = "none"
            buttonChangeList.style.display = "none"

            allSection.forEach(section => {
                section.style.display = "none"
                singleSection.style.display = "flex"
            })
            if (el.dataset.anime == "rickMorty"){
                fetch(`${urlRickMorty}/${el.dataset.id}`)
                    .then(response => response.json())
                    .then(function (data){
                        single = `
                            <div class="singleHeader">
                                <div>
                                        <img class ="img" src="${data.image}" alt="">
                                </div>                                
                                <div>
                                    <p class="singleName">${data.name}</p>
                                    <div class="singleSpecs">
                                        <p>Gender : ${data.gender}</p>
                                        <p>Type : ${data.type}</p>
                                        <p>Species : ${data.species}</p>
                                        <p>Status : ${data.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="singleContent">
                                <div class="contentLeft">
                                    <p class="singleContent-title">Location:</p>
                                    <p>${data.location.name}</p>
                                    <p class="singleContent-title">Origin:</p>
                                    <p>${data.origin.name}</p>
                                </div>
                                <div class="contentRight">
                                  <p class="singleContent-title">Épisodes: (click)</p>
                                  <div class="episodeCard">${data.episode.map((episode) => episode).join('</div><div class="episodeCard">')}</div>
                                </div>
                            </div>
                        `

                        let newContent = document.createElement("div")
                        newContent.innerHTML = single
                        //newContent.classList.add("card")
                        singleContent.appendChild(newContent)

                        fetchEpisodesRm()

                    })
            }
            else {
                fetch(`${urlFinalSpace}/${el.dataset.id}`)
                    .then(response => response.json())
                    .then(function (data){
                        single = `
                            <div class="singleHeader">
                                <div>
                                    <img class ="img" src="${data.img_url}" alt="">
                                </div>                                
                                <div>
                                    <p class="singleName">${data.name}</p>
                                    <div class="singleSpecs">
                                        <p>Hair : ${data.hair}</p>
                                        <p>Origin : ${data.origin}</p>
                                        <p>Species : ${data.species}</p>
                                        <p>Status : ${data.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="singleContent">
                                <div class="contentLeft">
                                    <p class="singleContent-title">Abilities:</p>
                                    <p>${data.abilities.map((ability) => ability).join('</p><p>')}</p>
                                </div>
                                <div class="contentRight">
                                  <p class="singleContent-title">Alias:</p>
                                  <p>${data.alias.map((alias) => alias).join('</p><p>')}</p>
                                </div>
                            </div>
                        `
                        let newContent = document.createElement("div")
                        newContent.innerHTML = single
                        //newContent.classList.add("card")
                        singleContent.appendChild(newContent)
                    })
            }
        })
    })
}

let fetchEpisodesRm = () => {
    let episodes = document.querySelectorAll(".episodeCard")

    episodes.forEach(el=>{
        el.addEventListener("click", () => {
            singleSection.style.display = "none"
            singleContent.innerHTML = ""
            singleEpisodeSection.style.display = 'flex'
            fetch(el.innerHTML)
                .then(response=>response.json())
                .then(function (data){
                    singleEpisode = `
                        <div class="singleHeader">
                            <p>${data.episode}</p>
                            <p class="singleName">${data.name}</p>
                        </div>
                        <div class="allChars">
                            <div class="episodeCharacter">${data.characters.map((character) => character).join('</div><div class="episodeCharacter">')}</div>
                        </div>
                    `

                    let newContent = document.createElement("div")
                    newContent.innerHTML = singleEpisode
                    //newContent.classList.add("card")
                    singleEpisodeContent.appendChild(newContent)

                    let episodeChar = document.querySelectorAll(".episodeCharacter")

                    episodeChar.forEach(el => {
                        el.addEventListener("click", () => {
                            fetchCharRmInEpisode(el.innerHTML)
                        })
                    })
                })
        })
    })
}

let fetchCharRmInEpisode = (url) => {
    singleEpisodeContent.innerHTML = ""
    singleSection.style.display = "flex"
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            single = `
                            <div class="singleHeader">
                                <div>
                                        <img class ="img" src="${data.image}" alt="">
                                </div>                                
                                <div>
                                    <p class="singleName">${data.name}</p>
                                    <div class="singleSpecs">
                                        <p>Gender : ${data.gender}</p>
                                        <p>Type : ${data.type}</p>
                                        <p>Species : ${data.species}</p>
                                        <p>Status : ${data.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="singleContent">
                                <div class="contentLeft">
                                    <p class="singleContent-title">Location:</p>
                                    <p>${data.location.name}</p>
                                    <p class="singleContent-title">Origin:</p>
                                    <p>${data.origin.name}</p>
                                </div>
                                <div class="contentRight">
                                  <p class="singleContent-title">Épisodes: (click)</p>
                                  <div class="episodeCard">${data.episode.map((episode) => episode).join('</div><div class="episodeCard">')}</div>
                                </div>
                            </div>
                        `

            let newContent = document.createElement("div")
            newContent.innerHTML = single
            //newContent.classList.add("card")
            singleContent.appendChild(newContent)

            fetchEpisodesRm()
        })
}


// Refresh page
let returnHome = () => {
    location.reload();
}

// Function for switch between sorted and randomized list
let changeList = () => {
    buttonRm.style.display = "flex"
    buttonFs.style.display = "flex"
    if (buttonChangeList.innerHTML == "Show All sorted"){
        randomSection.style.display = "none"
        rmSection.style.display = "flex"
        fsSection.style.display = "flex"
        buttonChangeList.innerHTML = "Show All randomized"
    }
    else {
        randomSection.style.display = "flex"
        rmSection.style.display = "none"
        fsSection.style.display = "none"
        buttonChangeList.innerHTML = "Show All sorted"
    }
}

// Function for show single anime characters
let showSingleList = (type) => {
    if (type == "rm"){
        randomSection.style.display = "none"
        fsSection.style.display = "none"
        rmSection.style.display = "flex"
        buttonRm.style.display = "none"
        buttonFs.style.display = "flex"
    }
    else {
        randomSection.style.display = "none"
        rmSection.style.display = "none"
        fsSection.style.display = "flex"
        buttonFs.style.display = "none"
        buttonRm.style.display = "flex"
    }
}

// To cut long names
let truncateNames = () => {
    let nameChar = document.querySelectorAll(".card-name")
    nameChar.forEach(el => {
        if (el.innerHTML.length > 20){
            el.innerHTML = el.innerHTML.slice(0, 20)
            el.innerHTML += "..."
        }
    })
}



