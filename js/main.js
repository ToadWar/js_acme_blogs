const createElemWithText = (HTMLElem = "p", textContent = "", className ) => {

    const element = document.createElement(HTMLElem);
 
     element.textContent = textContent;
 
     if (className) element.className = className;
 
      return element;
 
 }
 
 const createSelectOptions = (users) => {
  
     if (!users)  return ;
 
     const options = [];
 
     for(let i = 0; i < users.length; i++) {
 
        options[i] = new Option( users[i].name, users[i].id);           
 
     }
     return options;
 
 }
 
 const toggleCommentSection = (postID) => {
 
    if (!postID) return;
    
    const section = document.querySelector(`section[data-post-id = '${postID}']`);
    
    if(!section) return null;

    section.classList.toggle("hide");

    return section;
}

const toggleCommentButton = (postID) => {

    if (!postID){ 
        return;
    }

    const commentButton = document.querySelector(`button[data-post-id ='${postID}']`);
 
    if (!commentButton){

        return commentButton;
    }

    commentButton.textContent = commentButton.textContent === "Show Comments" ? "Hide Comments":"Show Comments";
    return commentButton;
}

const deleteChildElements = (parentElement) => {

    if ( !parentElement?.tagName) {

        return; 
    }
    console.log('hello');
    let child = parentElement.lastElementChild;

    while(child) {

        parentElement.removeChild(child);

        child = parentElement.lastElementChild;

    }
    return parentElement;
}

const addButtonListeners = () => {
    const main = document.querySelector("main");
    const buttons = main.getElementsByTagName("button");
    
    if (!buttons) return;

    buttons.forEach((button) =>{
        const postId = button.dataset.postId;
        addEventListener("click", function (event) { toggleComments(event, postId) }, false);
    });

    return buttons;
}

const removeButtonListeners = () => {
    const main = document.querySelector("main");
    const buttons = main.getElementsByTagName("button");
    
    if (!buttons) return;

    buttons.forEach((button) =>{
        const postId = button.dataset.postId;
        removeEventListener("click", function (event) { toggleComments(event, postId) }, false);
    });

    return buttons;
}

const createComments = (comments) => {
    if (!comments) return;

    let fragment = document.createDocumentFragment();

    for (const comment of comments) {

        const article = document.createElement('article');
        const name = createElemWithText('h3', comment.name);
        const paraBody = createElemWithText('p', comment.body);
        const paraEmail = createElemWithText('p', `From: ${comment.email}`);

        article.append(name);
        article.append(paraBody);
        article.append(paraEmail);
        fragment.append(article);

    }

    return fragment;
}

const populateSelectMenu = (users) => {
    if (!users) return;

    const selectMenu = document.querySelector('#selectMenu');
    const options = createSelectOptions(users);
    for (const option of options) {
        selectMenu.append(option);
    }

    return selectMenu;
}

const getUsers = async () => {

    try {
        const users = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!users) throw new Error(" No data received");
        return await users.json();
    } catch (err) {
        console.error(err);
    }
}

const getUserPosts = async (userId) => {
    if(!userId) return;

    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!posts) throw new Error(" No data received");
        return await posts.json();
    } catch (err) {
        console.error(err);
    }
}

const getUser = async (userId) => {
    if(!userId) return;

    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!user) throw new Error(" No data received");
        return await user.json();
    } catch (err) {
        console.error(err);
    }
}

const getPostComments= async (postId) => {
    if(!postId) return;

    try {
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!comments) throw new Error(" No data received");
        return await comments.json();
    } catch (err) {
        console.error(err);
    }
}

const displayComments = async (postID) => {
    if (!postID) return;

    const section = document.createElement('section');
    section.dataset.postId = postID;
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postID);
    const fragment = createComments(comments);
    section.append(fragment);

    return section;    

}

const createPosts = async (posts) => {

    if (!posts) return;

    const fragment = document.createDocumentFragment();

    for (const post of posts) {

        const article = document.createElement('article');
        const name = createElemWithText('h2', post.title);
        const paraBody = createElemWithText('p', post.body);
        const paraPostId = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser (post.userId);
        const paraAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const paraPhrase = createElemWithText('p', author.company.catchPhrase);
        console.log(paraPhrase);
        const button = document.createElement('button');
        button.innerHTML = 'Show Comments';
        button.dataset.postId = post.id;
        const section = await displayComments(post.id);
        
        article.append(name);
        article.append(paraBody);
        article.append(paraPostId);
        article.append(paraAuthor);
        article.append(paraPhrase);
        article.append(button);
        article.append(section);

        fragment.append(article);
    }

    return fragment;
}


const toggleComments = () => {

 // TODO: later
}


