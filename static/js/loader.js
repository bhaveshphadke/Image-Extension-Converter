let form = document.querySelector('form')

form.addEventListener('submit',()=>{
    let loader = document.getElementById('loader')
    let loaderText = document.getElementById('loader-text')

    loader.style.display="block"
    loaderText.style.display="block"
    form.style.display="none"
})