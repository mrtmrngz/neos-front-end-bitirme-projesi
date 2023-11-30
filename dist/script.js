const sideBarOpenIcon = document.querySelector('.sideBarOpenIcon')
const navLinksWrapper = document.querySelector('.navLinksWrapper')
const sideBarCloseIcon = document.querySelector('.sideBarCloseIcon')
const searchToggle = document.querySelector('.searchToggle')
const shoppingBagCloseIcon = document.querySelector('.shoppingBagCloseIcon')
const shoppingBagOpenIcon = document.querySelector('.shoppingBagOpenIcon')
const shoppingBagField = document.querySelector('.shoppingBagField')
const firstSliderButtons = document.querySelectorAll('[data-carousel-button]')
const commentCarousel = document.querySelector('.commentCarousel')
const arrowBtns = document.querySelectorAll('.commentCarouselWrapper i')
const firstCardWidth = commentCarousel.querySelector('.card').offsetWidth
const carouselChildrens = [...commentCarousel.children] 


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

//FIRST IMAGE SLIDER

firstSliderButtons.forEach(firstSliderButton => {
    firstSliderButton.addEventListener('click', () =>{
        const offset = firstSliderButton.dataset.carouselButton === "next" ? 1 : -1
        const slides = firstSliderButton.closest('[data-carousel]').querySelector('[data-slides]')
        const activeSlide = slides.querySelector('[data-active]')
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if(newIndex < 0) newIndex = slides.children.length - 1
        if(newIndex >= slides.children.length) newIndex = 1

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

//comment slider

let isDragging = false,startX, startScrollLeft

const dragStart = (e) => {
    isDragging = true
    commentCarousel.classList.add("dragging")
    startX = e.pageX
    startScrollLeft = commentCarousel.scrollLeft
}

const dragging = (e) => {
    if(!isDragging) return
    commentCarousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
    isDragging = false
    commentCarousel.classList.remove("dragging")
}

arrowBtns.forEach(arrowBtn => {
    arrowBtn.addEventListener('click' , () => {
        commentCarousel.scrollLeft += arrowBtn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})

let cardPerView = Math.round(commentCarousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(commentCard => {
    commentCarousel.insertAdjacentHTML('afterbegin', commentCard.outerHTML)
})

carouselChildrens.slice(0, cardPerView).forEach(commentCard => {
    commentCarousel.insertAdjacentHTML('beforeend', commentCard.outerHTML)
})

const infiniteScroll = () => {
    if(commentCarousel.scrollLeft === 0) {
        commentCarousel.classList.add('no-transition')
        commentCarousel.scrollLeft = commentCarousel.scrollWidth - (2 * commentCarousel.offsetWidth)
        commentCarousel.classList.remove('no-transition')
    }else if(Math.ceil(commentCarousel.scrollLeft) === commentCarousel.scrollWidth - commentCarousel.offsetWidth) {
        commentCarousel.classList.add('no-transition')
        commentCarousel.scrollLeft = commentCarousel.offsetWidth
        commentCarousel.classList.remove('no-transition')
    }
}


commentCarousel.addEventListener('mousedown', dragStart)
commentCarousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
commentCarousel.addEventListener('scroll', infiniteScroll)