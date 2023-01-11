const ham = document.getElementById('ham')
ham.addEventListener('click', () => {

    let mainurl = document.getElementById('main-urls')
    let searchdiv = document.getElementById('auth-div')
    style = window.getComputedStyle(mainurl)
    display = style.getPropertyValue('display');
    if (display === 'none') {
        mainurl.style.display = 'flex'
        searchdiv.style.display = 'flex'
        // searchdiv.style.transition='top 1s ease-in-out'
    }
    else {
        // setInterval(() => {
        mainurl.style.display = 'none'
        searchdiv.style.display = 'none'
        // }, 100);
        // searchdiv.style.transition='top 1s ease-in-out'

    }
})


//FOR KEYBOARD
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        window.history.back()
    } else if (e.key === 'ArrowRight') {
        window.history.forward()
    }

})


let loginbtn = document.getElementById('isLoggedIn1')
let signupbtn = document.getElementById('isLoggedIn2')
let logoutbtn = document.getElementById('LoggedIn')
let images = document.getElementById('LoggedIn1')


if (localStorage.getItem('token')) {
    logoutbtn.classList.remove('hide')
    images.classList.remove('hide')
    loginbtn.classList.add('hide')
    signupbtn.classList.add('hide')
} else {


    logoutbtn.classList.add('hide')
    images.classList.add('hide')
    loginbtn.classList.remove('hide')
    signupbtn.classList.remove('hide')
}

logoutbtn.addEventListener('click', () => {

    localStorage.removeItem('token')
    location.reload()

})

images.addEventListener('click', async (e) => {
    window.location = '/downloads'
  
})

