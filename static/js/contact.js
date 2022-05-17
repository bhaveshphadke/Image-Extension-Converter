const success_alert = document.getElementById('alert-container')

const crossbtn = document.getElementById('cross-btn')
const success = document.getElementById('success')
const unsuccess = document.getElementById('unsuccess')
crossbtn.addEventListener('click',()=>{
    success_alert.style.display = 'none'
})



// document.onload,()=>{
function OnLoad(){

    let LoggedIn = localStorage.getItem('login')
    console.log(LoggedIn);
    if(LoggedIn){
        
    }else{
        window.location = '/auth/login'
    }
}
    
// })