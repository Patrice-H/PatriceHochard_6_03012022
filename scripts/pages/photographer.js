function getPhotographerPageId() {
    const url = location.href;
    const photographerPage = url.split('?id=')[1];
    return photographerPage;
}

function getPhotographerData(id) {
    const photographers = sessionStorage.getItem(id);

    return (JSON.parse(photographers));
}

function getPhotographHeader(photographer) {
    const headerMain = document.getElementById('header-main');
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const headerLabel = photographerModel.getHeaderLabel();
    const headerPicture = photographerModel.getHeaderPicture();
    headerMain.appendChild(headerLabel);
    headerMain.appendChild(headerPicture);

}

const pageId = getPhotographerPageId();
const pdata = getPhotographerData(pageId);
console.log(pdata);
getPhotographHeader(pdata);
