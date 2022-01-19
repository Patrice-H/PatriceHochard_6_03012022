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

function translate(sort) {
    switch (sort) {
    case 'popurality':
        return 'Popularité';
    case 'date':
        return 'Date';
    case 'title':
        return 'Titre';
    default:
        return 'Popularité';
    }
}

function getSortChoice() {
    const URL = location.href;
    let sortParams = 'popularity';
    if (URL.includes('&sorted-by=')) {
        sortParams = URL.split('&sorted-by=')[1];
        if (sortParams.includes('&')) {
            sortParams = sortParams.split('&')[0];
        }
    }

    return sortParams;
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
    const MEDIAS = fetch('./data/photographers.json')
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

function sortMedias(sortkey, mediasdata) {
    let temp;
    let data;
    let datanext;
    for (let i = mediasdata.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            switch (sortkey) {
            case 'popularity':
                data = mediasdata[j].likes;
                datanext = mediasdata[j + 1].likes;
                break;
            case 'date':
                data = mediasdata[j].date;
                datanext = mediasdata[j + 1].date;
                break;     
            case 'title':
                data = mediasdata[j].title;
                datanext = mediasdata[j + 1].title;
                break;     
            default:
                data = mediasdata[j].likes;
                datanext = mediasdata[j + 1].likes;
                break;
            }
            if (sortkey === 'title') {
                if (data > datanext) {
                    temp = mediasdata[j];
                    mediasdata[j] = mediasdata[j + 1];
                    mediasdata[j + 1] = temp;
                }  
            } else {
                if (data < datanext) {
                    temp = mediasdata[j];
                    mediasdata[j] = mediasdata[j + 1];
                    mediasdata[j + 1] = temp;
                }
            } 
        }
    }

    return mediasdata;
}

function displayPhotographerGalery(mediasData) {
    const GALLERY = document.getElementById('gallery');
    const LOOP = 3 - (mediasData.length % 3);
    
    mediasData.forEach(media => {
        const ARTICLE = document.createElement('article');
        const LINK = document.createElement('a');
        const IMG = document.createElement('img');
        const LEGEND = document.createElement('div');
        const TITLE = document.createElement('p');
        const LIKE = document.createElement('p');
        const LIKE_COUNT = document.createElement('span');
        const LIKE_FORM = document.createElement('form');
        const ID_HIDDEN = document.createElement('input');
        const SORT_HIDDEN = document.createElement('input');
        const LIKE_BUTTON = document.createElement('button');
        const LIKE_ICON = document.createElement('i');

        LINK.setAttribute('onclick', 'openLightBox(' + media.id + ')');
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
        ID_HIDDEN.setAttribute('type', 'hidden');
        ID_HIDDEN.setAttribute('name', 'id');
        ID_HIDDEN.setAttribute('value', media.photographerId);
        SORT_HIDDEN.setAttribute('type', 'hidden');
        SORT_HIDDEN.setAttribute('name', 'sorted-by');
        SORT_HIDDEN.setAttribute('value', getSortChoice());
        LIKE_BUTTON.setAttribute('class', 'like-button');
        LIKE_BUTTON.setAttribute('name', 'like');
        LIKE_BUTTON.setAttribute('value', media.id);
        LIKE_BUTTON.setAttribute('onclick', 'addLike(' + media.id + ', ' + media.likes + ')');
        LIKE_ICON.setAttribute('class', 'fas fa-heart');

        LINK.appendChild(IMG);
        LIKE_BUTTON.appendChild(LIKE_ICON);
        LIKE_FORM.appendChild(ID_HIDDEN);
        LIKE_FORM.appendChild(SORT_HIDDEN);
        LIKE_FORM.appendChild(LIKE_COUNT);
        LIKE_FORM.appendChild(LIKE_BUTTON);
        LEGEND.appendChild(TITLE);
        LEGEND.appendChild(LIKE_FORM);
        ARTICLE.appendChild(LINK);
        ARTICLE.appendChild(LEGEND);
        GALLERY.appendChild(ARTICLE);
    });
    for (let i = 0; i < LOOP; i++) {
        let blank = document.createElement('article');
        blank.setAttribute('class', 'blank');
        GALLERY.appendChild(blank);
    } 
}

function getTotalLikes(medias) {
    let sum = 0;
    medias.forEach(media => {
        sum = sum + parseInt(getLikes(media.id, media.likes));
    });

    return sum;
}

function displayFooter(photographer, medias) {
    const TOTAL_LIKES = document.getElementById('total-likes');
    const PHOTOGRAPHER_PRICE = document.getElementById('photographer-price');
    TOTAL_LIKES.textContent = getTotalLikes(medias);
    PHOTOGRAPHER_PRICE.textContent = photographer.price + ' € / jour';
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
    setLabelSortButton(translate(SORT));
    //const MEDIAS = await getPhotographerMedias(PAGE_ID);
    medias = await getPhotographerMedias(PAGE_ID);
    const PHOTOGRAPHER_DATA = getPhotographerData(PAGE_ID);
    displayPhotographerPresentation(PHOTOGRAPHER_DATA);
    //displayFooter(PHOTOGRAPHER_DATA, MEDIAS);
    displayFooter(PHOTOGRAPHER_DATA, medias);
    const SORTED_MEDIAS = sortMedias(SORT, medias);
    console.log(medias);
    displayPhotographerGalery(SORTED_MEDIAS);
}

let medias;

main();
