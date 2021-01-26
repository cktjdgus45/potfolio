const nav = document.querySelector('#navbar');
const contact = document.querySelector('#contact');
const contactBtn = document.querySelector('.home__contact');
const navMenu = document.querySelector('.navbar__menu');

const navHeight = nav.getBoundingClientRect().bottom;

window.addEventListener('scroll', (event) => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > navHeight) {
        nav.classList.add('light-color');
    } else {
        nav.classList.remove('light-color');
    }
})

//scroll to section when clicked.

navMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link) {
        const scrollTo = document.querySelector(link);
        scrollTo.scrollIntoView({ behavior: "smooth" });
    }
})

contactBtn.addEventListener('click', () => {
    contact.scrollIntoView({ behavior: "smooth" });
})