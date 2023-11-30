const sideBarOpenIcon = document.querySelector('.sideBarOpenIcon')
const navLinksWrapper = document.querySelector('.navLinksWrapper')
const sideBarCloseIcon = document.querySelector('.sideBarCloseIcon')
const searchToggle = document.querySelector('.searchToggle')
const shoppingBagCloseIcon = document.querySelector('.shoppingBagCloseIcon')
const shoppingBagOpenIcon = document.querySelector('.shoppingBagOpenIcon')
const shoppingBagField = document.querySelector('.shoppingBagField')
const listProductHTML = document.querySelector('.listProduct')
const listCardHTML = document.querySelector('.listCard')
const iconQuantity = document.querySelector('.quantityBag')

let listProducts = []
let cards = []


//SideBar Toogle 
sideBarOpenIcon.addEventListener('click', function() {
    navLinksWrapper.classList.add('sideBarOpenAnimation')
})

sideBarCloseIcon.addEventListener('click', ()=> {
    navLinksWrapper.classList.remove('sideBarOpenAnimation')
})

//Icons Toggle

searchToggle.addEventListener('click', () => {
    searchToggle.classList.toggle('active')
})

shoppingBagOpenIcon.addEventListener('click', () => {
    shoppingBagField.classList.remove('hidden')
    shoppingBagField.classList.add('shoppingBagOpenAnimation')
})

shoppingBagCloseIcon.addEventListener('click', () => {
    shoppingBagField.classList.remove('shoppingBagOpenAnimation')
    shoppingBagField.classList.add('remove')
})

//products

const addDataToHTML = () => {
    listProductHTML.innerHTML = ''
    if(listProducts.length > 0) {
        listProducts.forEach((product,key) => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('item')
            newProduct.dataset.id = product.id
            newProduct.innerHTML = `
                <img src="../src/img/computer/${product.image}" alt="">
                <h2> ${product.name} </h2>
                <div class="price"> ${product.price}₺ </div>
                <button class="addCard">Add To Card</button>
            `

            listProductHTML.appendChild(newProduct)
        })
    }

}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target
    if(positionClick.classList.contains('addCard')) {
        let product_id = positionClick.parentElement.dataset.id
        addToCard(product_id)
    }
})

const addToCard = (product_id) => {
    let positionThisProductInCart = cards.findIndex((value) => value.product_id == product_id)
    if(cards.length <= 0) {
        cards = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0) {
        cards.push({
            product_id: product_id,
            quantity: 1
        })
    }else {
        cards[positionThisProductInCart].quantity = cards[positionThisProductInCart].quantity + 1
    }
    addCardToHTML()
}

const addCardToHTML = () => {
    listCardHTML.innerHTML = ''
    let totalQuantity = 0
    if(cards.length > 0) {
        cards.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity
            let newCart = document.createElement('div')
            newCart.classList.add('item')
            newCart.dataset.id = cart.product_id
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML = `
                <div class="image">
                    <img src="../src/img/computer/${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price * cart.quantity}₺
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span> ${cart.quantity} </span>
                    <span class="plus">+</span>
                </div>
            `

            listCardHTML.appendChild(newCart)
        })
    }
}

listCardHTML.addEventListener('click', (event) => {
    let positionClick = event.target
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.dataset.id
        let type = 'minus'
        if(positionClick.classList.contains('plus')) {
            type = 'plus'
        }
        changeQuantity(product_id, type)
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = cards.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart >= 0) {
        switch(type) {
            case 'plus':
                cards[positionItemInCart].quantity = cards[positionItemInCart].quantity + 1
                break;
            
            default:
                let valueChange = cards[positionItemInCart].quantity - 1
                if(valueChange > 0) {
                    cards[positionItemInCart].quantity = valueChange
                }else {
                    cards.splice(positionItemInCart, 1)
                }
                break;
        }
    }

    addCardToHTML()
}


const initApp = () => {
    fetch('computer.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data
        console.log(listProducts);
        addDataToHTML()
    })
}

initApp()