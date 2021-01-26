const nav = document.querySelector('#navbar');
const homeContent = document.querySelector('.home__container');
const contactBtn = homeContent.querySelector('.home__contact');
const navMenu = document.querySelector('.navbar__menu');


document.addEventListener('scroll', () => {
    const currentScrollPos = window.scrollY;
    changeNav(currentScrollPos);
    changeHome(currentScrollPos);
})

//change nav bgColor when scroll nav

function changeNav(currentScrollPos) {
    const navHeight = nav.getBoundingClientRect().bottom;
    if (currentScrollPos > navHeight) {
        nav.classList.add('light-color');
    } else {
        nav.classList.remove('light-color');
    }
}
//fade away slowly when scroll home

function changeHome(currentScrollPos) {
    const homeHeight = homeContent.getBoundingClientRect().bottom;
    homeContent.style.opacity = 1 - (currentScrollPos / homeHeight);
}

//scroll to section when clicked.

navMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link) {
        scrollIntoView(link);
    }
})

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}