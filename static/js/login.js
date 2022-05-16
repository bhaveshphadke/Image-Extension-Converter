
checkLogin=async(e)=>{
    // e.preventDefault();
    let email = await document.getElementById('email').value;
    let password = await document.getElementById('password').value;
    const response = await fetch('/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email,password:password})
    })
    const json = await response.json()
    console.log(json.isLoggedIn);

   if(json.isLoggedIn){
    localStorage.setItem('login',true)
   }
}