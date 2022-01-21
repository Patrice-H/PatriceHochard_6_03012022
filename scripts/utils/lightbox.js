/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function getMediaTitle(id) {
    let title;
    medias.forEach(media => {
        if (media.id === id) {
            title = media.title;
        }
    });

    return title;
}

function getImagePath(id) {
    let path;
    medias.forEach(media => {
        if (media.id === id) {
            path = media.image;
        }
    });

    return path;
}

function getVideoPath(id) {
    let path;
    medias.forEach(media => {
        if (media.id === id) {
            path = media.video;
        }
    });

    return path;
}

function getPreviousId(id) {
    let previousId;
    for (let i = 0; i < medias.length; i++) {
        if (medias[i].id === id) {
            if (i === 0) {
                previousId = medias[medias.length -1].id;
            } else {
                previousId = medias[i - 1].id;
            }
        }  
    }

    return previousId;
}


function getNextId(id) {
    let nextId;
    for (let i = 0; i < medias.length; i++) {
        if (medias[i].id === id) {
            if (i === medias.length -1) {
                nextId = medias[0].id;
            } else {
                nextId = medias[i + 1].id;
            }
        } 
    }

    return nextId;
}

function isMediaVideo(id) {
    let response = false;
    medias.forEach(media => {
        if (media.id === id) {
            if (media.video !== '') {
                response = true;
            }
        }
    });

    return response;
}

function displayContent(id) {
    mediaId = id;
    const MEDIA_CONTENT = document.getElementById('lightbox-media');
    const PREVIOUS = document.getElementById('previous');
    const NEXT = document.getElementById('next');
    const TITLE = document.getElementById('lightbox-title');
    let mediaKind;
    PREVIOUS.removeAttribute('onclick');
    NEXT.removeAttribute('onclick');
    PREVIOUS.setAttribute('onclick', 'displayContent(' + getPreviousId(id) + ')');
    NEXT.setAttribute('onclick', 'displayContent(' + getNextId(id) + ')');
    TITLE.textContent = getMediaTitle(id);
    while (MEDIA_CONTENT.hasChildNodes()) {
        MEDIA_CONTENT.removeChild(MEDIA_CONTENT.firstChild);
    }
    if (isMediaVideo(id)) {
        let source = document.createElement('source');
        mediaKind = document.createElement('video');
        mediaKind.setAttribute('controls', '');
        source.setAttribute('src', getVideoPath(id));
        source.setAttribute('type', 'video/mp4');
        mediaKind.appendChild(source);
    } else {
        mediaKind = document.createElement('img');
        mediaKind.setAttribute('src', getImagePath(id));
        mediaKind.setAttribute('alt', '');
    }
    MEDIA_CONTENT.appendChild(mediaKind);
    MEDIA_CONTENT.appendChild(TITLE);
}

function closeLightBox() {
    const LIGHTBOX = document.getElementById('lightbox');
    const HEADER = document.getElementById('header');
    const MAIN = document.getElementById('main');
    HEADER.setAttribute('aria-hidden', false);
    MAIN.setAttribute('aria-hidden', false);
    LIGHTBOX.style.display = 'none';
    LIGHTBOX.setAttribute('aria-hidden', true);
    CLOSE_BTN.removeEventListener('mouseover', () => {
        CLOSE_BTN.style.display = 'none';
    });
    CLOSE_BTN.removeEventListener('mouseout', () => {
        CLOSE_BTN.style.display = 'inline';
    });
}

function manageCloseButtonEvents() {
    CLOSE_BTN.addEventListener('mouseover', () => {
        CLOSE_BTN.style.display = 'none';
    });
    CLOSE_BTN.addEventListener('mouseout', () => {
        CLOSE_BTN.style.display = 'inline';
    });
}

function manageKeyboardEvents(event, id) {

    switch (event.key) {
    case 'ArrowLeft':
        displayContent(getPreviousId(id));
        break;
    case 'ArrowRight':
        displayContent(getNextId(id));
        break;
    case 'Escape':
        closeLightBox();
        break;
    default:
        break;
    }
}

function openLightBox(id) {
    mediaId = id;
    const LIGHTBOX = document.getElementById('lightbox');
    const HEADER = document.getElementById('header');
    const MAIN = document.getElementById('main');
    HEADER.setAttribute('aria-hidden', true);
    MAIN.setAttribute('aria-hidden', true);
    LIGHTBOX.style.display = 'flex';
    LIGHTBOX.setAttribute('aria-hidden', false);
    displayContent(id);
    CLOSE_BTN.focus();
    manageCloseButtonEvents();
    document.addEventListener('keydown', (event) => {
        manageKeyboardEvents(event, mediaId);
    });
}

const CLOSE_BTN = document.getElementById('close-box');
let mediaId;