function getPhotographerPageId() {
    const URL = location.href;
    let photographerPage = URL.split('?id=')[1];
    if (photographerPage.includes('&')) {
        photographerPage = photographerPage.split('&')[0];
    }

    return photographerPage;
}

function getPageUrl() {
    const URL = location.href;
    if (URL.includes('?')) {
        return URL.split('?')[0];
    }

    return URL;
}

function getSortChoice() {
    const URL = location.href;
    let params = '';
    let sort;
    if (URL.includes('&sorted-by=')) {
        params = URL.split('&sorted-by=')[1];
        if (params.includes('&')) {
            params = params.split('&')[0];
        }
    }
    switch (params) {
    case 'popurality':
        sort = 'Popularité';
        break;
    case 'date':
        sort = 'Date';
        break;
    case 'title':
        sort = 'Titre';
        break;
    default:
        sort = 'Popularité';
        break;
    }

    return sort;
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

async function getAllMedias() {
    
    const MEDIAS = fetch('/data/photographers.json')
        .then(response => response.json())
        .then(data => data.media)
        .catch(err => console.log('Error : ', err))
    ;

    return MEDIAS;
}

async function getPhotographerMedias(photographerId) {
    const ALL_MEDIAS = await getAllMedias();
    let photographerMedias = [];

    ALL_MEDIAS.forEach(media => {
        // eslint-disable-next-line no-undef
        const MEDIA = mediaFactory(media);

        if (MEDIA.photographerId === parseInt(photographerId)) {
            photographerMedias.push(MEDIA);            
        }
    });

    return photographerMedias;
}

function getLikes(id, likes) {
    if (sessionStorage.getItem(id)) {
        return sessionStorage.getItem(id);
    } else {
        return likes;
    }
}

function sortMediasByPopularity(mediasData) {
    let temp;
    for (let i = mediasData.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (mediasData[j].likes > mediasData[j + 1].likes) {
                temp = mediasData[j];
                mediasData[j] = mediasData[j + 1];
                mediasData[j + 1] = temp;
            }
        }
    }

    return mediasData;
}

function sortMediasByDate(mediasData) {
    let temp;
    for (let i = mediasData.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (mediasData[j].date > mediasData[j + 1].date) {
                temp = mediasData[j];
                mediasData[j] = mediasData[j + 1];
                mediasData[j + 1] = temp;
            }
        }
    }

    return mediasData;
}

function sortMediasByTitle(mediasData) {
    let temp;
    for (let i = mediasData.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (mediasData[j].title > mediasData[j + 1].title) {
                temp = mediasData[j];
                mediasData[j] = mediasData[j + 1];
                mediasData[j + 1] = temp;
            }
        }
    }

    return mediasData;
}

function sortMedias(sortkey, mediasData) {
    switch (sortkey) {
    case 'Popularité':
        return sortMediasByPopularity(mediasData);
    case 'Date':
        return sortMediasByDate(mediasData);     
    case 'Titre':
        return sortMediasByTitle(mediasData);     
    default:
        return sortMediasByPopularity(mediasData);
    }
}

function displayPhotographerGalery(mediasData) {
    const GALLERY = document.getElementById('gallery');
    const MEDIAS_COUNT = mediasData.length;
    
    mediasData.forEach(media => {
        const ARTICLE = document.createElement('article');
        const IMG = document.createElement('img');
        const LEGEND = document.createElement('div');
        const TITLE = document.createElement('p');
        const LIKE = document.createElement('p');
        const LIKE_COUNT = document.createElement('span');
        const LIKE_FORM = document.createElement('form');
        const LIKE_HIDDEN = document.createElement('input');
        const LIKE_BUTTON = document.createElement('button');
        const LIKE_ICON = document.createElement('i');

        IMG.setAttribute('src', media.image);
        IMG.setAttribute('alt', '');
        LEGEND.setAttribute('class', 'legend');
        TITLE.setAttribute('class', 'title');
        TITLE.textContent = media.title;
        LIKE.setAttribute('class', 'like');
        LIKE_COUNT.setAttribute('class', 'like-count');
        LIKE_COUNT.textContent = getLikes(media.id, media.likes);
        LIKE_FORM.setAttribute('action', getPageUrl());
        LIKE_FORM.setAttribute('method', 'GET');
        LIKE_FORM.setAttribute('class', 'like-form');
        LIKE_HIDDEN.setAttribute('type', 'hidden');
        LIKE_HIDDEN.setAttribute('name', 'id');
        LIKE_HIDDEN.setAttribute('value', media.photographerId);
        LIKE_BUTTON.setAttribute('class', 'like-button');
        LIKE_BUTTON.setAttribute('name', 'like');
        LIKE_BUTTON.setAttribute('value', media.id);
        LIKE_BUTTON.setAttribute('onclick', 'addLike(' + media.id + ', ' + media.likes + ')');
        LIKE_ICON.setAttribute('class', 'fas fa-heart');

        LIKE_BUTTON.appendChild(LIKE_ICON);
        LIKE_FORM.appendChild(LIKE_HIDDEN);
        LIKE_FORM.appendChild(LIKE_COUNT);
        LIKE_FORM.appendChild(LIKE_BUTTON);
        LEGEND.appendChild(TITLE);
        LEGEND.appendChild(LIKE_FORM);
        ARTICLE.appendChild(IMG);
        ARTICLE.appendChild(LEGEND);
        GALLERY.appendChild(ARTICLE);
    });
    if (MEDIAS_COUNT % 3 === 2) {
        const BLANK = document.createElement('article');
        BLANK.setAttribute('class', 'blank');
        GALLERY.appendChild(BLANK);
    }
    
}

// eslint-disable-next-line no-unused-vars
function addLike(id, likes) {
    if (sessionStorage.getItem(id)) {
        sessionStorage.setItem(id, parseInt(sessionStorage.getItem(id)) + 1);
    } else {
        sessionStorage.setItem(id, parseInt(likes) + 1);
    }
}

// eslint-disable-next-line no-unused-vars
function openSortMenu() {
    const SORT_MENU = document.getElementById('sort-options');
    SORT_MENU.setAttribute('class', '');
    SORT_MENU.addEventListener('mouseup', (evt) => {
        evt.stopPropagation();
    });
    document.addEventListener('mouseup', closeSortMenu);
}

function closeSortMenu() {
    const SORT_MENU = document.getElementById('sort-options');
    SORT_MENU.setAttribute('class', 'hidden');
    document.removeEventListener('mouseup', closeSortMenu);
}

// eslint-disable-next-line no-unused-vars
function generateSortLink(sort) {
    const LINK = getPageUrl() 
        + '?id=' 
        + getPhotographerPageId() 
        + '&sorted-by='
        + sort
    ;
    document.location.href = LINK;
}

function setLabelSortButton (sortkey) {
    const BUTTON = document.getElementById('sort-menu-button');
    const ICON = document.createElement('i');
    ICON.setAttribute('class', 'fas fa-chevron-down');
    BUTTON.textContent = sortkey;
    BUTTON.appendChild(ICON);
}

async function main() {
    const PAGE_ID = getPhotographerPageId();
    const SORT = getSortChoice();
    setLabelSortButton(SORT);
    const MEDIAS = await getPhotographerMedias(PAGE_ID);
    const PHOTOGRAPHER_DATA = getPhotographerData(PAGE_ID);
    displayPhotographerPresentation(PHOTOGRAPHER_DATA);
    const SORTED_MEDIAS = sortMedias(SORT, MEDIAS);
    displayPhotographerGalery(SORTED_MEDIAS);
    
}

main();



