
const fauxMenuNav = document.createElement('div')
fauxMenuNav.id = 'faux-menu-nav'
fauxMenuNav.innerHTML = document.getElementById('main-nav').innerHTML

document.getElementById('main-header').appendChild(fauxMenuNav)


document.getElementById('search-form__input').addEventListener('focus', event => {
    event.target.parentNode.style.flex = '1'
})
document.getElementById('search-form__input').addEventListener('focusout', event => {
    event.target.parentNode.style.flex = '0'
})

document.getElementById('faux-menu-nav-toggle').addEventListener('click', event => {
    document.getElementById('faux-menu-nav').classList.toggle('faux-menu-nav_active')
})


fetch("/.netlify/functions/getrepos")
    .then(response => {
        console.log("Response in String", response)
        return response.json()
    })
    .then(repos => console.log("Repo", repos))
    .catch(e => console.log('Error'));