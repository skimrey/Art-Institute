const apiKey = 'YOUR_API_KEY_HERE';
const artistName = 'Claude Monet';
const url = `https://api.artic.edu/api/v1/artworks/search?q=${artistName}&limit=100&fields=id,title,date_display,artist_title,description`;

fetch(url, {
    headers: {
        'apikey': apiKey
    }
})
.then(response => response.json())
.then(data => {
    const allPaintings = data.data;
    const monetPaintings = allPaintings.filter(painting => painting.artist_title === artistName);
    let paintingsHtml = '';
    for (let i = 0; i < monetPaintings.length; i++) {
        const painting = monetPaintings[i];
        const title = painting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const imagePath = `images/${title}.jpg`;
        paintingsHtml += `
            <div>
                <h2>${painting.title}</h2>
                <img src="${imagePath}">
                <p>${painting.date_display}</p>
                ${painting.description ? `<p>${painting.description}</p>` : ''}
                <p>Artist: ${painting.artist_title}</p>
            </div>
            <hr>
        `;
    }
    document.querySelector('#paintings').innerHTML = paintingsHtml;
})
.catch(error => console.error(error));
