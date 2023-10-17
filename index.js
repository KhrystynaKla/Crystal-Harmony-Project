const Items = document.querySelector('#store-items');
const totalPrice = document.createElement('h3')
const itemImage = document.querySelector('#item-image')
const likeButton = document.getElementById('like')
const likeImg = document.getElementById('like-button')
let currentElement
let currentData

//challenge #1
fetch('http://localhost:3000/crystals')
.then(response => response.json())
.then(data =>{

    currentData = data;

    addElementDetails(currentData[0]);
    currentData.forEach(element => { 
        addElementToList(element)
    })


})

function addElementToList(element){
    const span = document.createElement('span')
    span.textContent=element.name;
    Items.appendChild(span)
    span.addEventListener('click', () => addElementDetails(element))
    span.addEventListener('mouseover', () => {
        span.style.textShadow = '0 0 10px #e4b7b7';
    });
    
    span.addEventListener('mouseout', () => {
        span.style.textShadow = 'none';
    });
}


function addElementDetails(element){
    currentElement = element; // bonus chall
 
    document.querySelector('#item-image').src=element.image;
    document.querySelector('#item-name').textContent=element.name;
    document.querySelector('#item-description').textContent=element.description;
    document.querySelector('#item-price').textContent='$ '+element.price;
    const numberInCart = document.getElementById('number-in-cart')
    numberInCart.textContent = element.number_in_bag
    
}

itemImage.addEventListener('mouseover', () => {
    // itemImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1)';
    itemImage.style.width = '70%'
});

itemImage.addEventListener('mouseout', () => {
    // itemImage.style.boxShadow = 'none';
    itemImage.style.width = '60%'
});

likeButton.addEventListener('click', () => {

    if(currentElement.love === false) { 
        currentElement.love = true;
        likeImg.src = 'picture/like.png'
    } else {
        currentElement.love = false;
        likeImg.src = 'picture/unlike.png'
    }

    fetch(`http://localhost:3000/crystals/${currentElement.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            love : currentElement.love 
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
})git 