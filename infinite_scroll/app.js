const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash api 

const count = 30;
const apiKey = 'TKyg2grutn9hzfcV9HQbpwerBhSEQLDD7w6X4n2VUPo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;

    }
}

// Helper function to setattributes on DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links, photos and Add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;


    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank')

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // Create <img> to display image 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Check image is loaded or not

        img.addEventListener('load', imageLoaded);



        // put <img> inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}




async function getPhotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {

    }

}


// check to see if scrolling near bottom of the page and load more images 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on Load
getPhotos();















