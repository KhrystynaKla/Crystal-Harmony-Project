const Items = document.querySelector('#store-items');
const totalPrice = document.createElement('h3')


//challenge #1
fetch('http://localhost:3000/crystals')
.then(response => response.json())
.then(data =>{
    // addElementToTheDishSection(data[0]); // challenge #2
    data.forEach(element => { // bonus challange
        addElementToTheMenu(element)

        console.log(element.name)
    })
})

function addElementToTheMenu(element){
    const span = document.createElement('span')
    span.textContent=element.name;
    Items.appendChild(span)
    // challenge 3
    span.addEventListener('click', () => addElementToTheDishSection(element))
}


// challenge #2
function addElementToTheDishSection(element){
    currentlyDisplayedMenuItem=element; // bonus chall

    document.querySelector('#item-image').src=element.image;
    document.querySelector('#item-name').textContent=element.name;
    document.querySelector('#item-description').textContent=element.description;
    document.querySelector('#item-price').textContent=element.price;
    const numberInCart = document.getElementById('number-in-cart')
    numberInCart.textContent = element.number_in_bag
}