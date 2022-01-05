// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    //const link = portrait.substring(0, portrait.length - 4) + '.html';
    const link = 'photographer.html?id=' + id;
    
    function getUserCardDOM() {
        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute('href', link);
        a.setAttribute('id', id);
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', '');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const plocation = document.createElement('p');
        plocation.setAttribute('class', 'location');
        plocation.textContent = city + ', ' + country;
        const ptagline = document.createElement('p');
        ptagline.setAttribute('class', 'tagline');
        ptagline.textContent = tagline;
        const pprice = document.createElement('p');
        pprice.setAttribute('class', 'price');
        pprice.textContent = price + '€/jour';
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(plocation);
        article.appendChild(ptagline);
        article.appendChild(pprice);

        return (article);
    }
    return { name, picture, getUserCardDOM };
}