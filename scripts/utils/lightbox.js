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
    const MEDIA_CONTENT = document.getElementById('lightbox-media');
    const PREVIOUS = document.getElementById('previous');
    const NEXT = document.getElementById('next');
    const PREVIOUS_ID = getPreviousId(id);
    const NEXT_ID = getNextId(id);
    let mediaKind;
    PREVIOUS.removeAttribute('onclick');
    NEXT.removeAttribute('onclick');
    PREVIOUS.setAttribute('onclick', 'displayContent(' + PREVIOUS_ID + ')');
    NEXT.setAttribute('onclick', 'displayContent(' + NEXT_ID + ')');
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
}

function closeLightBox() {
    const LIGHTBOX = document.getElementById('lightbox');
    LIGHTBOX.style.display = 'none';
}

function openLightBox(id) {
    const LIGHTBOX = document.getElementById('lightbox');
    LIGHTBOX.style.display = 'flex';
    displayContent(id);
}