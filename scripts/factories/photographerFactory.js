// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    
    const picture = () => {
        const path = 'assets/photographers/';
        if (data.portrait.substring(data.portrait.length - 3) !== 'png') {

            return path + data.portrait.substring(0, data.portrait.length - 3) + 'png';

        } else {
            
            return path + data.portrait;
        }
    };

    return {
        id: data.id,
        name: data.name,
        city: data.city,
        country: data.country,
        tagline: data.tagline,
        price: data.price,
        portrait: picture()
    };
}