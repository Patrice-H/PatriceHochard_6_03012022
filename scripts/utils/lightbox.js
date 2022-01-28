/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @description Return the media title
 * @param {number} id - The current media id
 * @returns {string} title - The media title
 */
function getMediaTitle(id) {
    let title;
    medias.forEach(media => {
        if (media.id === id) {
            title = media.title;
        }
    });

    return title;
}

/**
 * @description Return entire URL of the image
 * @param {number} id - The current media id
 * @returns {string} path - The image URL
 */
function getImagePath(id) {
    let path;
    medias.forEach(media => {
        if (media.id === id) {
            path = media.image;
        }
    });

    return path;
}

/**
 * @description Return entire URL of the video
 * @param {number} id The current media id
 * @returns {string} path - The video URL
 */
function getVideoPath(id) {
    let path;
    medias.forEach(media => {
        if (media.id === id) {
            path = media.video;
        }
    });

    return path;
}

/**
 * @description Return the previous media id or the last id if current id is the first of the media array
 * @param {number} id - The current media id
 * @returns {number} previousId - The previous media id
 */
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

/**
 * @description Return the next media id or the first id if current id is the last of the media array
 * @param {number} id - The current media id
 * @returns {number} nextId - The next media id
 */
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

/**
 * @description Control if the media is a video or not
 * @param {number} id - The current media id
 * @returns {boolean} response
 */
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

/**
 * @description Ligthbox layout with control buttons from media id
 * @param {number} id - The current media id
 */
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

/**
 * @description Close the lightbox and remove the listeners
 */
function closeLightBox() {
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

/**
 * @description Add mouse event listeners on close button
 */
function manageCloseButtonEvents() {
    CLOSE_BTN.addEventListener('mouseover', () => {
        CLOSE_BTN.style.display = 'none';
    });
    CLOSE_BTN.addEventListener('mouseout', () => {
        CLOSE_BTN.style.display = 'inline';
    });
}

/**
 * @description Manage the keyboard events. Switch action when a key is pressed
 * @param {KeyboardEvent} event 
 * @param {number} id - The current media id
 */
function manageKeyboardEvents(event) {
    switch (event.key) {
    case 'ArrowLeft':
        displayContent(getPreviousId(mediaId));
        break;
    case 'ArrowRight':
        displayContent(getNextId(mediaId));
        break;
    case 'Escape':
        closeLightBox();
        break;
    default:
        break;
    }
}

/**
 * @description Open the lightbox and lauch displaying functions and event listeners
 * @see {@link displayContent}
 * @see {@link manageCloseButtonEvents}
 * @see {@link manageKeyboardEvents}
 * @param {number} id - The current media id
 */
function openLightBox(id) {
    mediaId = id;
    const HEADER = document.getElementById('header');
    const MAIN = document.getElementById('main');
    HEADER.setAttribute('aria-hidden', true);
    MAIN.setAttribute('aria-hidden', true);
    LIGHTBOX.style.display = 'flex';
    LIGHTBOX.setAttribute('aria-hidden', false);
    document.getElementById('lightbox-close-btn').focus();
    displayContent(id);
    manageCloseButtonEvents();
}

const LIGHTBOX = document.getElementById('lightbox');
const CLOSE_BTN = document.getElementById('close-box');
let mediaId;
document.addEventListener('keydown', (event) => {
    manageKeyboardEvents(event);
});