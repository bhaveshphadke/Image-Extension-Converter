const commentSection = document.getElementById('comment')
const formSection = document.getElementById('form')
const button = document.getElementById('btn')
button.addEventListener('click', () => {
    if (commentSection.style.display == 'block') {
        commentSection.style.display = 'none'
        formSection.style.display = "block"
        button.innerHTML = "Go to Comment"
    } else {
        commentSection.style.display = 'block'
        formSection.style.display = "none"
        button.innerHTML = "Go to Contact Me"

    }
})