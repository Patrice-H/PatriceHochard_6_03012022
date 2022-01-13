async function getPhotographers() {
    const PHOTOGRAPHERS = fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => data.photographers)
        .catch(err => console.log('Error : ', err))
    ;

    return PHOTOGRAPHERS;
}

function displayArticle(photographers) {
    const PHOTOGRAPHERS_SECTION = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const PROFILE = photographerFactory(photographer);
        const LINK = 'photographer.html?id=' + PROFILE.id;
        const ARTICLE = document.createElement('article');
        const A = document.createElement('a');
        const IMG = document.createElement('img');
        const H2 = document.createElement('h2');
        const P_LOCATION = document.createElement('p');
        const P_TAGLINE = document.createElement('p');
        const P_PRICE = document.createElement('p');
        
        A.setAttribute('href', LINK);
        IMG.setAttribute('src', PROFILE.portrait);
        IMG.setAttribute('alt', '');
        H2.textContent = PROFILE.name;
        P_LOCATION.setAttribute('class', 'location');
        P_LOCATION.textContent = PROFILE.city + ', ' + PROFILE.country;
        P_TAGLINE.setAttribute('class', 'tagline');
        P_TAGLINE.textContent = PROFILE.tagline;
        P_PRICE.setAttribute('class', 'price');
        P_PRICE.textContent = PROFILE.price + '€/jour';
        A.appendChild(IMG);
        A.appendChild(H2);
        ARTICLE.appendChild(A);
        ARTICLE.appendChild(P_LOCATION);
        ARTICLE.appendChild(P_TAGLINE);
        ARTICLE.appendChild(P_PRICE);
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
    