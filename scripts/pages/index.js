/* eslint-disable no-undef */

function getPhotographers() {
    return fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => data.photographers)
        .catch(err => console.log('Error : ', err))
    ;
}

function displayArticle(photographers) {
    const PHOTOGRAPHERS_SECTION = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        const PROFILE = photographerFactory(photographer);
        const ARTICLE = PROFILE.displayProfile();
        PHOTOGRAPHERS_SECTION.appendChild(ARTICLE);
    });
}

function saveData(photographers) {
    photographers.forEach((photographer) => {
        sessionStorage.setItem(photographer.id, JSON.stringify(photographer));
    });  
}

async function init() {
    const PHOTOGRAPHERS = await getPhotographers();
    displayArticle(PHOTOGRAPHERS);
    saveData(PHOTOGRAPHERS);
}

init();
    