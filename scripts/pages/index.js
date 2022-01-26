/* eslint-disable no-undef */

/**
 * @description Get all photographers data in Json file
 * @returns {Promise<JSON>} Photographers data
 */
function getPhotographers() {
    return fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => data.photographers)
        .catch(err => console.log('Error : ', err))
    ;
}

/**
 * @description Display Photographers section with all profiles
 * @param {JSON} photographers 
 */
function displayPhotographersSection(photographers) {
    const PHOTOGRAPHERS_SECTION = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        const PROFILE = photographerFactory(photographer);
        const ARTICLE = PROFILE.displayProfile();
        PHOTOGRAPHERS_SECTION.appendChild(ARTICLE);
    });
}

/**
 * @description Save photographers data in session storage
 * @param {JSON} photographers 
 */
function saveData(photographers) {
    photographers.forEach((photographer) => {
        sessionStorage.setItem(photographer.id, JSON.stringify(photographer));
    });  
}

/**
 * @description Entry function launch all functions to display the page
 * @async
 * @see {@link getPhotographers}
 * @see {@link displayPhotographersSection}
 * @see {@link saveData}
 */
async function init() {
    await getPhotographers().then(data => {
        displayPhotographersSection(data);
        saveData(data);
    });
}

init();
    