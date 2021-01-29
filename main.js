const navMenu = document.querySelector('.navbar__menu');
const nav = document.querySelector('#navbar');
const homeContent = document.querySelector('.home__container');

const homeHeight = homeContent.getBoundingClientRect().bottom;

document.addEventListener('scroll', () => {
    handleNavScroll();
    handleHomeScroll();
    showReturnBtn();
})

//active navItem when position at section
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navList = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
}

let selectedNavItem = navList[1];
let selectedIndex = 0;

function activeOnOff(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedIndex = index + 1;
            } else {
                selectedIndex = index - 1;
            }
        }
    })
};

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedIndex = navList.length - 1;
    }
    activeOnOff(navList[selectedIndex]);
})

const observer = new IntersectionObserver(callback, options);
sections.forEach(section => observer.observe(section));

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
    scrollIntoView('#home');
})

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
    navMenu.classList.remove('open');
    scrollIntoView(link);
    activeOnOff(event.target);
})

const contactBtn = homeContent.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    activeOnOff(navList[sectionIds.indexOf(selector)]);
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