const requestUrl = 'https://jsonplaceholder.typicode.com/posts';
const postsWrapper = document.getElementById('posts-wrapper');
let posts = [];
let btnDelete;
const btnCreate = document.getElementById('btnCreate');
const btnUpdate = document.getElementById('btnUpdate');


const createTemplate = data => {
    return template = `
        <div class="wrapper-post" data-id="${data.id}">
            <div class="id">ID: ${data.id}</div>
            <div class="title">TITLE: ${data.title}</div>
            <div class="body">BODY: ${data.body}</div>
            <button class="btnDelete">Delete Post</button>
        </div>
    `
}

const getPosts = url =>  {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            posts = json;
            posts.filter( item => {
                return item.id >= 50 && item.id <=60
            }).forEach(post => {
                postsWrapper.innerHTML += createTemplate(post);
            })
            btnDelete = document.querySelectorAll('.btnDelete');
        })
        .then( () => {
            for(let elem of btnDelete) {
                elem.addEventListener('click', e => { 
                    let idElem = e.target.parentNode.dataset.id;
                    deletePost(requestUrl, idElem);
                })
            }
        })
}

getPosts(requestUrl);

const deletePost = (url, id) => {
    fetch(url + '/' + id, {
        method: 'DELETE'
    })
}

const createPost = url => {
    let inputTitle = document.getElementById('title').value,
    inputBody = document.getElementById('body').value,
    inputUserId = document.getElementById('userId').value;

    let createObj = {
        title: inputTitle,
        body: inputBody,
        userId: inputUserId
    } 

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(createObj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

btnCreate.addEventListener('click', e => {
    e.preventDefault();
    createPost(requestUrl);
})

const updatePost = url => {
    let inputTitleUpdate = document.getElementById('title').value,
    inputBodyUpdate = document.getElementById('body').value,
    inputUserIdUpdate = document.getElementById('userId').value,
    inputIdPostUpdate = document.getElementById('idPostUpdate').value;

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            id: inputIdPostUpdate,
            title: inputTitleUpdate,
            body: inputBodyUpdate,
            userId: inputUserIdUpdate
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

btnUpdate.addEventListener('click', e => {
    e.preventDefault();
    updatePost(requestUrl + '/1');
})

