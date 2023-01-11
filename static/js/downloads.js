document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token')

    const response = await fetch('/images', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })

    })

    let res = await response.json()
    let root = document.getElementById('root')
    if (!res.success) {
        return root.innerHTML = "<h1>Not Authorised</h1>"
    }
    let html = ""
    if (res.images.length === 0) {
        html = '<h2 style="text-align:center;">You have not used this app yet please click on tools and explore more....</h2>'
    }
    res.images.forEach(element => {

        html += ` <div style="margin:20px auto;display:block;">
        <img style="width:250px;height:200px" src=${element.img} alt="alt"> 

        <p>${element.img}</p>
        <a style="text-align:center;"download=${element.img} href="${element.img}">download</a>

    </div>`
    });
    res.videos.forEach(element => {

        html += ` <div style="margin:20px auto;display:block;">
        <video style="width:250px;height:200px" src=${element.video}></video>

        <p>${element.video}</p>
        <a style="text-align:center;"download=${element.video} href="${element.video}">download</a>

    </div>`
    });
    root.innerHTML = html
    // section.innerHTML = ''
})