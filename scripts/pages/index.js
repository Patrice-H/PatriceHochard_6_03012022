async function getPhotographers() {
    const photographers = fetch('/data/photographers.json')
        .then(response => response.json())
        .then(data => data.photographers)
        .catch(err => console.log('Error : ', err))
    ;

    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

function saveData(photographers) {
    photographers.forEach((photographer) => {
        sessionStorage.setItem(photographer.id, JSON.stringify(photographer));
    });  
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
    saveData(photographers);
}

init();
    