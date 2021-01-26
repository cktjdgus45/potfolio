const nav = document.querySelector('#navbar');
const homeContent = document.querySelector('.home__container');
const contactBtn = homeContent.querySelector('.home__contact');
const navMenu = document.querySelector('.navbar__menu');
const returnBtn = document.querySelector('.return-button');

const homeHeight = homeContent.getBoundingClientRect().bottom;

document.addEventListener('scroll', () => {
    handleNavScroll();
    handleHomeScroll();
    showReturnBtn();
})

//click on "return" button after scroll home
returnBtn.addEventListener('click', (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

//change nav bgColor when scroll nav

function handleNavScroll() {
    const navHeight = nav.getBoundingClientRect().bottom;
    if (window.scrollY > navHeight) {
        nav.classList.add('light-color');
    } else {
        nav.classList.remove('light-color');
    }
}
//fade away slowly when scroll home

function handleHomeScroll() {
    homeContent.style.opacity = 1 - (window.scrollY / homeHeight);
}

function showReturnBtn() {
    if (window.scrollY > homeHeight / 2) {
        returnBtn.classList.add('showing');
    } else {
        returnBtn.classList.remove('showing');
    }
}

//scroll to section when clicked.

navMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);
})

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}
