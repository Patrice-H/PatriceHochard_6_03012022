function getPhotographerPageId() {
    const url = location.href;
    const photographerPage = url.split('?id=')[1];
    return photographerPage;
}

function getPhotographerData(id) {
    const photographers = sessionStorage.getItem(id);

    return (JSON.parse(photographers));
}

function displayHeader(data) {
    // eslint-disable-next-line no-undef
    const photographer = photographerFactory(data);
    const h1 = document.getElementById('label-title');
    const plocation = document.getElementById('label-location');
    const ptagline = document.getElementById('label-tagline');
    const img = document.getElementById('header-picture');
    h1.textContent = photographer.name;
    plocation.textContent = photographer.city + ', ' + photographer.country;
    ptagline.textContent = photographer.tagline;
    img.setAttribute('src', photographer.portrait);
}

const pageId = getPhotographerPageId();
const pdata = getPhotographerData(pageId);
displayHeader(pdata);
