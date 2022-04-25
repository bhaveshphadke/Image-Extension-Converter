const ham = document.getElementById('ham')
ham.addEventListener('click', () => {

    let mainurl = document.getElementById('main-urls')
    let searchdiv = document.getElementById('search-div')
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
document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowLeft'){
        window.history.back()
    }else if(e.key==='ArrowRight'){
        window.history.forward()
    }
   
})




// FOR SCREEN TOUCH (SWIPING)
let touchstartX = 0
let touchendX = 0

function handleGesture() {
    if (touchendX < touchstartX){window.history.back()}
    if (touchendX > touchstartX) {window.history.forward()}
  }
  
  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
      console.log(e.changedTouches[0]);
      // console.log(screenX);
  })
  
  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    console.log(e.changedTouches[0]);
  
    handleGesture()
  })
