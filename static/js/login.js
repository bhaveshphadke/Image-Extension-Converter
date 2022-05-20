
checkLogin=async(e)=>{
    e.preventDefault();
    let email = await document.getElementById('email').value;
    let password = await document.getElementById('password').value;
    console.log('1');
    const response = await fetch('/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email,password:password})
    })
    console.log('2');

    const json = await response.json()
    console.log(json.isLoggedIn);
    console.log('3');

   if(json.isLoggedIn){
    console.log('4');

    localStorage.setItem('login',true)
    window.location = '/'
   }
}