/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

function createNavBar() {
    let nav = document.querySelector('#navbar__list');
    let fragment = document.createDocumentFragment();
    let sections = document.querySelectorAll('section');
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.textContent = `Section ${i + 1}`;
        li.appendChild(link);
        link.setAttribute('href', `#section${i + 1}`);
        fragment.appendChild(li);
        // Style Of Each Element in the Navigation Bar
        li.style.display = 'inline-block';
        li.style.marginRight = '22px';
        // Scroll Smoothly To The Section When The Link Is Clicked
        link.addEventListener('click', function (e) {
            e.preventDefault();
            sections[i].scrollIntoView({ behavior: 'smooth' });
        })
    }
    nav.appendChild(fragment);

    let header = document.querySelector('header');
    // Style of header
    header.style.cssText = 'width: 100%; min-height: 8vh; display: flex;justify-content: flex-end; align-items: center;';

}




// build the nav
createNavBar();


// Add class 'active' to section when near top of viewport
let sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    const activeLink = document.querySelector(`a[href="#${entries[0].target.id}"]`);
    if (entries[0].isIntersecting) {

        activeLink.classList.add('active');
        entries[0].target.classList.add('in-view');
    }
    else {
        entries[0].target.classList.remove('in-view');
        activeLink.classList.remove('active');
    }
},
    {
        root: null,
        rootMargin: '0px',
        threshold: .8
    }
);
window.addEventListener('scroll', function () {
    sections.forEach(section => {
        observer.observe(section);
    }
    );
})

// Button Scrolls To Top
const scrollTop = document.querySelector('span');
window.onscroll = function () {
    this.scrollY >= 500 ? scrollTop.classList.add('show') : scrollTop.classList.remove('show');
}
scrollTop.onclick = function () {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    })
}



