// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {

    const {name, city, country, tagline} = data;
    
    const pictureFileFormat = () => {
        const PATH = 'assets/photographers/';
        if (data.portrait.substring(data.portrait.length - 3) !== 'png') {

            return PATH + data.portrait.substring(0, data.portrait.length - 3) + 'png';

        } else {
            
            return PATH + data.portrait;
        }
    };

    // eslint-disable-next-line no-unused-vars
    function displayPresentation() {
        const NAME = document.getElementById('presentation-name');
        const LOCATION = document.getElementById('presentation-location');
        const TAGLINE = document.getElementById('presentation-tagline');
        const PICTURE = document.getElementById('presentation-img');
        NAME.textContent = `${name}`;
        LOCATION.textContent = `${city}, ${country}`;
        TAGLINE.textContent = `${tagline}`;
        PICTURE.setAttribute('src', pictureFileFormat());
        PICTURE.setAttribute('alt', `${name}`);
        PICTURE.setAttribute('title', `${name} portrait`);
    }
    
    return {
        id: data.id,
        name: data.name,
        city: data.city,
        country: data.country,
        tagline: data.tagline,
        price: data.price,
        portrait: pictureFileFormat(),
        displayPresentation
    };
}