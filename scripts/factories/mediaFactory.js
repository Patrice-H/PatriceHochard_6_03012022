// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {

    const assignImageFile = () => {
        const PATH = 'assets/images/';
        
        if (data.image) {

            return PATH + data.image;

        } else {
            const IMAGE_FILE = data.video.substring(0, data.video.length - 3) + 'jpg';

            return PATH + IMAGE_FILE;
        }
    };

    return {
        id: data.id,
        photographerId: data.photographerId,
        title: data.title,
        likes: data.likes,
        date: data.date,
        price: data.price,
        image: assignImageFile()
    };
}