function getPhotographerPageId() {
    const URL = location.href;
    const PHOTOGRAPHER_PAGE = URL.split('?id=')[1];

    return PHOTOGRAPHER_PAGE;
}

function getPhotographerData(id) {
    const PHOTOGRAPHERS = sessionStorage.getItem(id);

    return (JSON.parse(PHOTOGRAPHERS));
}

function displayPhotographerPresentation(data) {
    // eslint-disable-next-line no-undef
    const PHOTOGRAPHER = photographerFactory(data);
    const NAME = document.getElementById('presentation-name');
    const LOCATION = document.getElementById('presentation-location');
    const TAGLINE = document.getElementById('presentation-tagline');
    const PICTURE = document.getElementById('presentation-img');
    NAME.textContent = PHOTOGRAPHER.name;
    LOCATION.textContent = PHOTOGRAPHER.city + ', ' + PHOTOGRAPHER.country;
    TAGLINE.textContent = PHOTOGRAPHER.tagline;
    PICTURE.setAttribute('src', PHOTOGRAPHER.portrait);
}

const PAGE_ID = getPhotographerPageId();
const PHOTOGRAPHER_DATA = getPhotographerData(PAGE_ID);
displayPhotographerPresentation(PHOTOGRAPHER_DATA);
