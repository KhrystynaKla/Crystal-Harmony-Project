const Items = document.querySelector('#store-items');
const totalPrice = document.createElement('h3')
const itemImage = document.querySelector('#item-image')
const likeButton = document.getElementById('like')
const likeImg = document.getElementById('like-button')
const reviewForm = document.getElementById('review-form')
const reviewList = document.getElementById('review-list')
const reviewName = document.getElementById('name')
const review = document.getElementById('review')
const numberInCart = document.getElementById('number-in-cart')
const numberToAdd = document.getElementById('cart-amount')
const cartForm = document.getElementById('cart-form')
let currentElement
let currentData
let likeButtonValue


fetch('http://localhost:3000/crystals')
.then(response => response.json())
.then(data =>{

    currentData = data;

    addElementDetails(currentData[0]);
    currentData.forEach(element => { 
        addElementToList(element)
    })


})

fetch('http://localhost:3000/Reviews')
.then(response => response.json())
.then(reviews =>{
    reviews.forEach(review => { 
        addReview(review)
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
    numberInCart.textContent = element.number_in_cart
    likeImg.src = element.love ? 'picture/like.png' : 'picture/unlike.png';

    
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
    console.log(likeImg.src)

    if(currentElement.love===false) { 
        currentElement.love = true;
        likeButtonValue = true;
        likeImg.src = 'picture/like.png'
        
    } else if (currentElement.love === true) {
        currentElement.love = false;
        likeButtonValue = false;
        likeImg.src = 'picture/unlike.png'
    }

    fetch(`http://localhost:3000/crystals/${currentElement.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            love : likeButtonValue 
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
})


reviewForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    let newReview = {
        body: review.value,
        name: reviewName.value 
    }

    addReview(newReview)


    fetch('http://localhost:3000/Reviews',{
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(newReview)
    })
    .then(response => response.json())
    .then(data => console.log(data))
})


function addReview (object){
    const diwReview = document.createElement('div');
    const pName = document.createElement('p')
    const pReview = document.createElement('p')
    pName.textContent = 'Name: '+object.name
    pReview.textContent ='Review: '+object.body

    diwReview.appendChild(pName)
    diwReview.appendChild(pReview)

    reviewList.appendChild(diwReview)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X'
    diwReview.appendChild(deleteButton)
    deleteButton.addEventListener('click', ()=>{
        diwReview.remove()

        fetch(`http://localhost:3000/Reviews/${object.id}`,{
            method: 'DELETE'
        })
        .then(response=> response.json())
        .then(data => console.log(data))
    })
}

cartForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    let sum = Number(numberInCart.textContent) + Number(numberToAdd.value);
    numberInCart.textContent=sum
    currentElement.number_in_cart = sum;
    cartForm.reset()

    fetch(`http://localhost:3000/crystals/${currentElement.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number_in_cart: sum})
    })
    .then(response=>response.json())
    .then(data => console.log(data))
})


