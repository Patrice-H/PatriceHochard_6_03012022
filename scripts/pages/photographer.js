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
    const { name, portrait, city, country, tagline, } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', '');
    const div = document.createElement('div');
    div.setAttribute('id', 'label');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const plocation = document.createElement('p');
    plocation.setAttribute('class', 'location');
    plocation.textContent = city + ', ' + country;
    const ptagline = document.createElement('p');
    ptagline.setAttribute('class', 'tagline');
    ptagline.textContent = tagline;
    const br1 = document.createElement('br');
    const br2 = document.createElement('br');
    div.appendChild(h2);
    div.appendChild(br1);
    div.appendChild(plocation);
    div.appendChild(br2);
    div.appendChild(ptagline);
    headerMain.appendChild(div);
    headerMain.appendChild(img);

}

const pageId = getPhotographerPageId();
const pdata = getPhotographerData(pageId);
console.log(pdata);
getPhotographHeader(pdata);
