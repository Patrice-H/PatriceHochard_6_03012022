// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {

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

    return {
        id: data.id,
        photographerId: data.photographerId,
        title: data.title,
        likes: data.likes,
        date: data.date,
        price: data.price,
        image: setImagePath(),
        video: setVideoPath(),
        description: data.description
    };
}