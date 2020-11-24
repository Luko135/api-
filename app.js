const database =document.querySelector(".my_data_base");
// // const data=fetch("http://localhost/php/restapi/api/posts/read.php");
const URL = 'http://localhost/php/restapi/api/posts/read.php';
const URL2 = 'http://localhost/php/restapi/api/posts/read_single.php';
const ULRcreate = 'http://localhost/php/restapi/api/posts/create.php'



function read(){
    // return the entire promise chain
    return fetch(`${URL}`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .then((data) => {
        const posts = data.data
      return posts; // return the customer_name here
    });
}
   
   // later, use the function somewhere
  read().then((posts) => {
       posts.map(({title,body,id,author,category_name})=>{
        const post = document.createElement('div');
        post.classList.add('post')
        post.setAttribute('id', `${id}`)
        post.innerHTML= 
        `
        <h2 class="title">${title}</h2>
        <div class="body">${body}</div>
        <div class="downbar"><p>${author}</p><p>${category_name}</p> </div>
        `
        database.appendChild(post);

       })
   });


   //! -----------------------------------------------------------------------------------------------------------------------------------

   function read_single(id){
    // return the entire promise chain
    return fetch(`${URL2}?id=${id}`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .then((data) => {
        const post = data
      return post; // return the customer_name here
    });
}
   
   // later, use the function somewhere
   read_single(4).then(({title,body,id,author,category_name}) => {

    const post = document.createElement('div');
    post.classList.add('single_post')
    post.setAttribute('id', `${id}`)
    post.innerHTML= 
    `
    <h2 class="title">${title}</h2>
    <div class="body">${body}</div>
    <div class="downbar"><p>${author}</p><p>${category_name}</p> </div>
    `
    database.appendChild(post);

   });
   function create(){
     const title  = document.querySelector('#title').value;
     const body  = document.querySelector('#body').value;
     const author  = document.querySelector('#author').value;
     const category_id  = document.querySelector('#category_id').value;
    // return the entire promise chain
    const newPost={
      "title":title,
      "body":body,
      "category_id":category_id,
      "author":author
    }
    return fetch(`http://localhost/php/restapi/api/posts/create.php/`)
    .then((response) => {
      if(response.ok) {
        return console.log("jest ok");
      } else {
        return console.log("nie jest jest ok");
      }
    })
}
   // later, use the function somewhere

   const btn = document.querySelector('button');
   btn.addEventListener('click', create);