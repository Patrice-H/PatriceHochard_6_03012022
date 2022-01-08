async function getPhotographers() {
    const photographers = fetch('/data/photographers.json')
        .then(response => response.json())
        .then(data => data.photographers)
        .catch(err => console.log('Error : ', err))
    ;

    return photographers;
}

async function displayArticle(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const model = photographerFactory(photographer);
        const link = 'photographer.html?id=' + model.id;
        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute('href', link);
        const img = document.createElement('img');
        img.setAttribute('src', model.portrait);
        img.setAttribute('alt', '');
        const h2 = document.createElement('h2');
        h2.textContent = model.name;
        const plocation = document.createElement('p');
        plocation.setAttribute('class', 'location');
        plocation.textContent = model.city + ', ' + model.country;
        const ptagline = document.createElement('p');
        ptagline.setAttribute('class', 'tagline');
        ptagline.textContent = model.tagline;
        const pprice = document.createElement('p');
        pprice.setAttribute('class', 'price');
        pprice.textContent = model.price + '€/jour';
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(plocation);
        article.appendChild(ptagline);
        article.appendChild(pprice);
        photographersSection.appendChild(article);
    });
}

function saveData(photographers) {
    photographers.forEach((photographer) => {
        sessionStorage.setItem(photographer.id, JSON.stringify(photographer));
    });  
}

async function init() {
    const photographers = await getPhotographers();
    displayArticle(photographers);
    saveData(photographers);
}

init();
    