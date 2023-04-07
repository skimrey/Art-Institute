const apiKey = 'YOUR_API_KEY_HERE';
const artistName = 'Claude Monet';
const url = `https://api.artic.edu/api/v1/artworks/search?q=${artistName}&limit=100&fields=id,title,date_display,artist_title,description,main_reference_number`;

fetch(url, {
    headers: {
        'apikey': apiKey
    }
})
.then(response => response.json())
.then(data => {
    const allPaintings = data.data;
    const monetPaintings = allPaintings.filter(painting => painting.artist_title === artistName);
    monetPaintings.sort((a, b) => {
        const aDate = parseInt(a.date_display.replace("c. ", "").trim().substr(0, 4));
        const bDate = parseInt(b.date_display.replace("c. ", "").trim().substr(0, 4));
        return aDate - bDate;
    });
    let paintingsHtml = '';
    for (let i = 0; i < monetPaintings.length; i++) {
        const painting = monetPaintings[i];
        const imagePath = `images/${painting.main_reference_number}.jpg`;
        paintingsHtml += `
                <h2>${painting.title}</h2>
                <img src="${imagePath}" id = "myImg">
                <div id="myModal" class="modal">
                <span class="close">&times;</span>
                <img class="modal-content" id="img01">
                </div>
            
                <p>${painting.date_display.replace("c. ", "").trim()}</p>
                ${painting.description ? `<p>${painting.description}</p>` : ''}
                
            <hr>
        `;
    }
    document.querySelector('#paintings').innerHTML = paintingsHtml;
    
    
    // Get the modal

const images = document.querySelectorAll("img");
let imgIndex;
let imgSrc;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
// get images src onclick
images.forEach((img, i) => {
    img.addEventListener("click", (e) => {
        modal.style.display = "block";
        modalImg.src = e.target.src;
        imgSrc = e.target.src;
        imgModal(imgSrc);
        imgIndex = i;
        
        console.log(imgSrc)
    });
});

// Get the image and insert it inside the modal - use its "alt" text as a caption

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
} 

})
.catch(error => console.error(error));

