let showbtn = document.getElementById('show')
let hidebtn = document.getElementById('hide')
hidebtn.style.display = 'none'
// Function to post comment
const postcomment = async (e) => {
    e.preventDefault()
    let comment = document.getElementById('post-comment')
console.log(comment);
console.log(comment.value);
    const response = await fetch('/comment', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ comment: comment.value })
    })
    console.log('b');
    comment.value = ""

}
const fetchallcomments = () => {


    fetch('/allcomments', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    }).then(response =>
        response.json()
    ).then((json) => {
        let div = document.getElementById('comment-div')

        comments = json.comments
        let html = ""
        comments.forEach(element => {
            html += `<div class="comment-item">
        <div class="profile">
            ${element.profile}
        </div>
        <div class="data">
            <p class="name">${element.name}</p>
            <p class="cmt">${element.comment}</p>
        </div>
    </div>`
            div.innerHTML = html
        });


    })
    showbtn.style.display = 'none'
    hidebtn.style.display = 'block'
   
}


const hideallcomments = () => {
    let div = document.getElementById('comment-div')
    div.innerHTML = ""

   showbtn.style.display = 'block'
   hidebtn.style.display = 'none'

}

