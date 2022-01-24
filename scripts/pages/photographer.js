/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @description Get the URL of page and return id parameter
 * @returns {number} The id parameter in URL
 */
function getPhotographerPageId() {
    const URL = location.href;
    let photographerPage = URL.split('?id=')[1];
    if (photographerPage.includes('&')) {
        photographerPage = photographerPage.split('&')[0];
    }

    return photographerPage;
}

/**
 * @description Get the photographer data in session storage
 * @param {number} id - The photographer id
 * @returns {JSON} The photographer data
 */
function getPhotographerData(id) {
    const PHOTOGRAPHERS = sessionStorage.getItem(id);

    return (JSON.parse(PHOTOGRAPHERS));
}

/**
 * @description Get data about all media in Json file and return them
 * @returns {[JSON])} The array of all media in Json file
 */
function getAllMedias() {
    return fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => data.media)
        .catch(err => console.log('Error : ', err))
    ;
}

/**
 * @description Return the number of media likes
 * @param {number} id - the media id
 * @returns {number} the total number of media likes
 */
function getLikes(id) {
    medias.forEach(media => {
        if (media.id === id) {
            return media.likes;
        }
    });
}

/**
 * @description Sort array of media according to sort choice. (bubble sort)
 * @param {string} sortkey - Sort choice
 */
function sortMedias(sortkey) {
    let temp;
    let data;
    let datanext;
    for (let i = medias.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            switch (sortkey) {
            case 'popularity':
                data = medias[j].likes;
                datanext = medias[j + 1].likes;
                break;
            case 'date':
                data = medias[j].date;
                datanext = medias[j + 1].date;
                break;     
            case 'title':
                data = medias[j].title;
                datanext = medias[j + 1].title;
                break;     
            default:
                data = medias[j].likes;
                datanext = medias[j + 1].likes;
                break;
            }
            if (sortkey === 'title') {
                if (data > datanext) {
                    temp = medias[j];
                    medias[j] = medias[j + 1];
                    medias[j + 1] = temp;
                }  
            } else {
                if (data < datanext) {
                    temp = medias[j];
                    medias[j] = medias[j + 1];
                    medias[j + 1] = temp;
                }
            } 
        }
    }
}

/**
 * @description Build photographer gallery and display it
 */
function displayPhotographerGalery() {
    const GALLERY = document.getElementById('gallery');
    const LOOP = 3 - (medias.length % 3);
    while(GALLERY.hasChildNodes()) {
        GALLERY.removeChild(GALLERY.firstChild);
    }
    medias.forEach(media => {
        const MEDIA = mediaFactory(media);
        const ARTICLE = MEDIA.getGalleryArticle();
        GALLERY.appendChild(ARTICLE);
    });
    for (let i = 0; i < LOOP; i++) {
        let blank = document.createElement('article');
        blank.setAttribute('class', 'blank');
        GALLERY.appendChild(blank);
    }   
}

/**
 * @description Return total photographer likes
 * @returns {number} sum 
 */
function getTotalLikes() {
    let sum = 0;
    medias.forEach(media => {
        sum = sum + media.likes;
    });

    return sum;
}

/**
 * @description Display aside on bottom window with total likes and price per day
 * @param {[object]} photographer - Photographer data
 */
function displayAside(photographer) {
    const PHOTOGRAPHER_PRICE = document.getElementById('photographer-price');
    TOTAL_LIKES.textContent = getTotalLikes(medias);
    PHOTOGRAPHER_PRICE.textContent = photographer.price + ' € / jour';
}

/**
 * @description Update media id
 * @param {*} id - The media id
 */
function addLike(id) {
    const LIKE_COUNTERS = Array.from(document.getElementsByClassName('like-count'));
    for (let i = 0; i < medias.length; i++) {
        if (medias[i].id === id) {
            medias[i].likes = medias[i].likes + 1;
            LIKE_COUNTERS[i].textContent = medias[i].likes;
        }
    }
    TOTAL_LIKES.textContent = getTotalLikes(medias);
}

/**
 * @description Open the sort drop down and manage listeners
 */
function openSortMenu() {
    SORT_MENU.setAttribute('class', '');
    SORT_MENU.addEventListener('mouseup', (evt) => {
        evt.stopPropagation();
    });
    document.addEventListener('mouseup', closeSortMenu);
    SORT_MENU.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closeSortMenu();
        }
    });
}

/**
 * @description Close the sort drop down and remove listener
 */
function closeSortMenu() {
    SORT_MENU.setAttribute('class', 'hidden');
    document.removeEventListener('mouseup', closeSortMenu);
}

/**
 * @description Set sort button text according user choice
 * @param {string} sortkey - Sort choice
 */
function setLabelSortButton (sortkey) {
    let buttonLabel;
    switch (sortkey) {
    case 'popurality':
        buttonLabel = 'Popularité';
        break;
    case 'date':
        buttonLabel = 'Date';
        break;
    case 'title':
        buttonLabel = 'Titre';
        break;
    default:
        buttonLabel = 'Popularité';
        break;
    }
    const BUTTON = document.getElementById('sort-menu-button');
    const ICON = document.createElement('span');
    ICON.setAttribute('class', 'fas fa-chevron-down');
    BUTTON.textContent = buttonLabel;
    BUTTON.appendChild(ICON);
}

/**
 * @description Sort the media, manage the state of drop down and display a new gallery sorted
 * @see {@link sortMedias}
 * @see {@link closeSortMenu}
 * @see {@link setLabelSortButton}
 * @see {@link displayPhotographerGalery}
 * @param {string} sortkey - Sort choice
 */
function sortGalleryBy(sortkey) {
    sortMedias(sortkey);
    closeSortMenu();
    setLabelSortButton(sortkey);
    displayPhotographerGalery();
}

/**
 * @description Manage return key accessibility
 */
function accessibilityReturnKey() {
    document.onkeydown = function(evt) {
        if(evt.key === 'Enter') {
            document.activeElement.onclick(evt);
        }
    };
}

/**
 * @description Entry function manage the display of the page
 */
async function main() {
    const PAGE_ID = getPhotographerPageId();
    const PHOTOGRAPHER_DATA = getPhotographerData(PAGE_ID);
    const PHOTOGRAPHER = photographerFactory(PHOTOGRAPHER_DATA);
    PHOTOGRAPHER.displayPresentation();
    setLabelSortButton('popularity');
    await getAllMedias().then(datas => {
        datas.forEach(data => {
            if (data.photographerId === parseInt(PAGE_ID)) {
                medias.push(mediaFactory(data));
            }
        });
    });
    displayAside(PHOTOGRAPHER_DATA);
    sortMedias('popularity');
    displayPhotographerGalery();
    accessibilityReturnKey();
}

let medias = [];
const TOTAL_LIKES = document.getElementById('total-likes');
const SORT_MENU = document.getElementById('sort-options');
main();