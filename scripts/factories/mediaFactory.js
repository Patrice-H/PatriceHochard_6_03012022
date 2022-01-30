/* eslint-disable no-unused-vars */

/**
 * @description Make a javascript object from media json data
 * @param {JSON} data - Mocked data
 * @returns {object}
 */
function mediaFactory(data) {

    const {id, photographerId, title, image, video, description, likes} = data;

    const setImagePath = () => {
        const IMAGE_FOLDER_PATH = 'assets/images/';
        if (data.image) {
            return IMAGE_FOLDER_PATH + data.image;
        } else {
            const IMAGE_FILE = data.video.substring(0, data.video.length - 3) + 'jpg';

            return IMAGE_FOLDER_PATH + IMAGE_FILE;
        }
    };

    const setVideoPath = () => {
        const VIDEO_FOLDER_PATH = 'assets/videos/';

        if (data.video) {     
            return VIDEO_FOLDER_PATH + data.video;
        } else {
            return '';
        }
    };

    /**
     * Create and return gallery article
     * @returns {HTMLElement} article
     */
    function getGalleryArticle() {
        const ARTICLE = document.createElement('article');
        const LINK = document.createElement('a');
        const IMG = document.createElement('img');
        const LEGEND = document.createElement('div');
        const TITLE = document.createElement('p');
        const LIKE = document.createElement('p');
        const LIKE_COUNT = document.createElement('span');
        const ID_HIDDEN = document.createElement('input');
        const LIKE_BUTTON = document.createElement('button');
        const LIKE_ICON = document.createElement('span');

        LINK.setAttribute('href', '#');
        LINK.setAttribute('onclick', 'openLightBox(' + data.id + ')');
        LINK.setAttribute('class', 'lightbox-link');
        LINK.setAttribute('role', 'link');
        LINK.setAttribute('title', data.title + ', closeup view');
        LINK.setAttribute('tabindex', '0');       
        IMG.setAttribute('src', data.image);
        IMG.setAttribute('alt', data.description);
        LEGEND.setAttribute('class', 'legend');
        TITLE.setAttribute('class', 'title');
        TITLE.textContent = data.title;
        LIKE.setAttribute('class', 'like');
        LIKE_COUNT.setAttribute('class', 'like-count');
        LIKE_COUNT.textContent = data.likes;
        LIKE_BUTTON.textContent = 'Like';
        LIKE_ICON.setAttribute('title', 'Add a like to the media');
        ID_HIDDEN.setAttribute('type', 'hidden');
        ID_HIDDEN.setAttribute('name', 'id');
        ID_HIDDEN.setAttribute('value', data.photographerId);
        LIKE_BUTTON.setAttribute('class', 'like-button');
        LIKE_BUTTON.setAttribute('name', 'like');
        LIKE_BUTTON.setAttribute('value', data.id);
        LIKE_BUTTON.setAttribute('onclick', 'addLike('+ data.id + ')');
        LIKE_BUTTON.setAttribute('title', 'Add like');
        LIKE_ICON.setAttribute('class', 'fas fa-heart');

        LINK.appendChild(IMG);
        LIKE_BUTTON.appendChild(LIKE_ICON);
        LIKE.appendChild(LIKE_COUNT);
        LIKE.appendChild(LIKE_BUTTON);
        LEGEND.appendChild(TITLE);
        LEGEND.appendChild(LIKE);
        ARTICLE.appendChild(LINK);
        ARTICLE.appendChild(LEGEND);

        return ARTICLE;
    }

    return {
        id: data.id,
        photographerId: data.photographerId,
        title: data.title,
        likes: data.likes,
        date: data.date,
        price: data.price,
        image: setImagePath(),
        video: setVideoPath(),
        description: data.description,
        getGalleryArticle
    };
}