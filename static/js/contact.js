
// document.onload,()=>{
function OnLoad() {

    let LoggedIn = localStorage.getItem('login')
    console.log(LoggedIn);
    if (LoggedIn) {

    } else {
        window.location = '/auth/login'
    }
}


async function ContactAPI(e) {
    e.preventDefault()
    let name = await document.getElementById('name').value
    let email = await document.getElementById('email').value
    let description = await document.getElementById('description').value
    let alertDiv = document.getElementById('alertDiv')
    let loading = document.getElementById('loading')

    
    
    loading.innerHTML = 'Loading....'
    
    const response = await fetch('contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, description: description })
    })
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
     
    loading.innerHTML = '     <button class="btn" onclick="ContactAPI(event)">Contact</button>'

}
