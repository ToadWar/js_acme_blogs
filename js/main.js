const createElemWithText = (HTMLElem = "p", textContent = "", className ) => {

    const element = document.createElement(HTMLElem);
 
     element.textContent = textContent;
 
     if (className) element.className = className;
 
      return element;
 
 }
 
 const createSelectOptions = (users) => {
  
     if (!users) { 
         return ; 
     }
 
     const options = [];
 
     for(let i = 0; i < users.length; i++) {
 
        options[i] = new Option( users[i].name, users[i].id);           
 
     }
     return options;
 
 }
 
 const toggleCommentSection = (postID) => {
 
    if (!postID) {
        return;
    }
    const section = document.querySelector(`section[data-post-id = '${postID}']`);
    
    if(!section){

        return section;
    }
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

const toggleComments = () => {
 // TODO: later
}


