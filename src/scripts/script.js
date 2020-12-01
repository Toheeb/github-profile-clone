
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
    .then(response => response.json())
    .then(user => {
        update(user.repositories.nodes)
    })
    .catch(e => console.log(e));


function update(data) {
    const domArr = data.reverse().map(repo => {
        const lang = repo.primaryLanguage ? repo.primaryLanguage.name : ''
        const desc = repo.description ? repo.description : ''

        return `
        <li class="repo__item">
            <div>
                <h3 class="h3 repo__h3">
                    <a class="link_1" href="${repo.url}">${repo.name}</a>
                </h3>
                <div class="repo__item-desc mb-10">${desc}</div>
                <div>
                    <span class="tag repo__tag"><span class="tag__lang tag__lang_${lang.toLowerCase()}"></span>${lang}</span>
                    <span class="tag repo__tag">Updated on ${new Date(repo.pushedAt).toDateString().substring(4)}</span>
                </div>
            </div>
            <button class="btn btn_2">
                <svg class="btn__icon octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                Star
            </button>
        </li>
    `})

    document.getElementById('repositoryCount').innerHTML = `
        <span class="user-nav__repo-count">${domArr.length}</span>
    `

    document.getElementById('repositories').innerHTML = domArr.join('')
}