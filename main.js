
const nav = document.querySelector('#navbar');
const homeContent = document.querySelector('.home__container');

const homeHeight = homeContent.getBoundingClientRect().bottom;

document.addEventListener('scroll', () => {
    handleNavScroll();
    handleHomeScroll();
    showReturnBtn();
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

//click on "return" button after scroll home

const returnBtn = document.querySelector('.return-button');

returnBtn.addEventListener('click', (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

function showReturnBtn() {
    if (window.scrollY > homeHeight / 2) {
        returnBtn.classList.add('showing');
    } else {
        returnBtn.classList.remove('showing');
    }
}

//scroll to section when clicked.
const navMenu = document.querySelector('.navbar__menu');
const navItems = navMenu.querySelectorAll('.navbar__menu__item');

navMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link == null) {
        return;
    }
    navMenu.classList.remove('open');
    scrollIntoView(link);
})

const contactBtn = homeContent.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}

//Filter work
const workBtns = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project');
const projectContainer = document.querySelector('.work__projects');
const filterBtns = document.querySelectorAll('.category__btn');


workBtns.addEventListener('click', (event) => {
    const clicked = event.target.dataset.link || event.target.parentNode.dataset.link;
    if (clicked == null) {
        return;
    }
    filterBtns.forEach((btn) => {
        const count = btn.lastChild;
        if (clicked === btn.dataset.link) {
            btn.classList.add('clicked', 'btn');
            count.classList.add('clicked');
        } else {
            btn.classList.remove('clicked', 'btn');
            count.classList.remove('clicked');
        }
    })
    projectContainer.classList.add('animation');

    setTimeout(() => {
        projects.forEach((work) => {
            if (work.dataset.link === clicked || clicked === 'all') {
                work.classList.remove('unshowing');
            } else {
                work.classList.add('unshowing');
            }
        })
        projectContainer.classList.remove('animation');
    }, 300);
})

//toggle button

const toggle = document.querySelector('.navbar__toggle-btn');
let clicked = true;

toggle.addEventListener('click', (event) => {
    navMenu.classList.toggle('open');
})