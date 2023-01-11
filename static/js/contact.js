
// // document.onload,()=>{
// function OnLoad() {

//     let LoggedIn = localStorage.getItem('token')
    
//     console.log();
//     if (LoggedIn) {
// // if(LoggedIn)
//     } else {
//         window.location = '/auth/login'
//     }
// }


async function ContactAPI(e) {
    e.preventDefault()
    let name = await document.getElementById('name').value
    let email = await document.getElementById('email').value
    let description = await document.getElementById('description').value
    let alertDiv = document.getElementById('alertDiv')
    let loading = document.getElementById('loading')
    let loadingBar = document.getElementById('loading-bar')

    
    // loadingBar.style.width = "10%"
    if(name !=='' || email!== '' || description!==''){
    }
    // loadingBar.style.width = "30%"

    
    // loadingBar.style.width = "75%"
    const response = await fetch('contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, description: description })
    })

    // loadingBar.style.width = "95%"
    const json = await response.json()

    if (json.success) {
        alertDiv.innerHTML = `       <div class="alert-container success" id="alertDiv">
        <p>Hi, ${json.name}.. Your Request has been sent.</p>
        <p id="cross-btn">X</p>
        </div>
        `
    }
    else {
        alertDiv.innerHTML = `       <div class="alert-container unsuccess" id="alertDiv">
        <p>Hi, ${json.name}.. Your Request has not been sent.</p>
        <p id="cross-btn">X</p>
        </div>
        `
    }
     setTimeout(() => {
        alertDiv.outerHTML=""
     }, 5000);
    loadingBar.style.width = "0"


}
