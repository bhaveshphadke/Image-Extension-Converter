const ham = document.getElementById('ham')
ham.addEventListener('click', () => {

    let mainurl = document.getElementById('main-urls')
    let searchdiv = document.getElementById('search-div')
    style = window.getComputedStyle(mainurl)
    display = style.getPropertyValue('display');
    if (display === 'none') {
        mainurl.style.display = 'flex'
        searchdiv.style.display = 'flex'
    }
    else {
        mainurl.style.display = 'none'
        searchdiv.style.display = 'none'
    }
})
