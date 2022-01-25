/* eslint-disable no-unused-vars */

function photographerFactory(data) {
    
    const pictureFileFormat = () => {
        const PATH = 'assets/photographers/';
        if (data.portrait.substring(data.portrait.length - 3) !== 'png') {
            return PATH + data.portrait.substring(0, data.portrait.length - 3) + 'png';
        } else {   
            return PATH + data.portrait;
        }
    };

    function displayProfile() {
        const LINK = 'photographer.html?id=' + data.id;
        const ARTICLE = document.createElement('article');
        const A = document.createElement('a');
        const IMG = document.createElement('img');
        const H2 = document.createElement('h2');
        const P_LOCATION = document.createElement('p');
        const P_TAGLINE = document.createElement('p');
        const P_PRICE = document.createElement('p');
        
        A.setAttribute('href', LINK);
        A.setAttribute('title', data.name + ' gallery');
        IMG.setAttribute('src', pictureFileFormat());
        IMG.setAttribute('alt', '');
        H2.textContent = data.name;
        P_LOCATION.setAttribute('class', 'location');
        P_LOCATION.textContent = data.city + ', ' + data.country;
        P_TAGLINE.setAttribute('class', 'tagline');
        P_TAGLINE.textContent = data.tagline;
        P_PRICE.setAttribute('class', 'price');
        P_PRICE.textContent = data.price + '€/jour';
        A.appendChild(IMG);
        A.appendChild(H2);
        ARTICLE.appendChild(A);
        ARTICLE.appendChild(P_LOCATION);
        ARTICLE.appendChild(P_TAGLINE);
        ARTICLE.appendChild(P_PRICE);

        return ARTICLE;
    }

    function displayPresentation() {
        const NAME = document.getElementById('presentation-name');
        const LOCATION = document.getElementById('presentation-location');
        const TAGLINE = document.getElementById('presentation-tagline');
        const PICTURE = document.getElementById('presentation-img');
        NAME.textContent = data.name;
        LOCATION.textContent = data.city + ', ' + data.country;
        TAGLINE.textContent = data.tagline;
        PICTURE.setAttribute('src', pictureFileFormat());
        PICTURE.setAttribute('alt', data.name);
        PICTURE.setAttribute('title', data.name + ' portrait');
    }
    
    return {
        id: data.id,
        name: data.name,
        city: data.city,
        country: data.country,
        tagline: data.tagline,
        price: data.price,
        portrait: pictureFileFormat,
        displayProfile,
        displayPresentation
    };
}