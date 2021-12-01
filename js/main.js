/*
Author: Todd M. Wood
Project: Final INF 651
Date: 12/1/2021
Description: This code creates posts and functionality for an employee database.  Allows the user to select an employee and see the posts. 
*/

//Creates an HTML element with the given parameters.  Returns the Element.
const createElemWithText = (HTMLElem = 'p', textContent = '', className ) => {
    const element = document.createElement(HTMLElem);
 
     element.textContent = textContent;
 
     if (className) element.className = className;
 
     return element;
 }
 
 // Creates an options list with the given users parameter.  Returns the options element
 const createSelectOptions = (users) => {
     if (!users)  return ;
 
     const options = [];
 
     for(let i = 0; i < users.length; i++) {
         options[i] = new Option( users[i].name, users[i].id);           
      }
 
      return options;
 }
 
 //Hides or shows the comment section by adding or remove the hide class.  Returns the section
 const toggleCommentSection = (postID) => {
    if (!postID) return;
    
    const section = document.querySelector(`section[data-post-id = '${postID}']`);
    
    if(!section) return null;

    section.classList.toggle('hide');

    return section;
}

//Changes the text on the comment button based on it's current state.  Defaults to Show Comments. Returns the button
const toggleCommentButton = (postID) => {
    if (!postID) return;
    
    const commentButton = document.querySelector(`button[data-post-id ='${postID}']`);
 
    if (!commentButton) return commentButton;
    
    commentButton.textContent = commentButton.textContent === 'Show Comments' ? 'Hide Comments':'Show Comments';
    
    return commentButton;
}

// Deletes all comments for the employee passed in. Returns the empty parent
const deleteChildElements = (parentElement) => {
    if ( !parentElement?.tagName) return; 

    let child = parentElement.lastElementChild;

    while(child) {

        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }

    return parentElement;
}

// adds a listener for button click, calls toggle comments. Returns the buttons
const addButtonListeners = () => {
    const main = document.querySelector('main');
    const buttons = main.querySelectorAll('button');
    
    if (!buttons) return;

    buttons.forEach((button) =>{
        const postId = button.dataset.postId;
        button.addEventListener('click', function (event) { toggleComments(event, postId) }, false);
    });
    
    return buttons;
}

// removes the listener when the button is clicked. Returns the buttons
const removeButtonListeners = () => {
    const main = document.querySelector('main');
    const buttons = main.querySelectorAll('button');
    
    if (!buttons) return;

    buttons.forEach((button) =>{
        const postId = button.dataset.postId;
        button.removeEventListener('click', function (event) { toggleComments(event, postId) }, false);
    });
    
    return buttons;
}

// builds the comments fragment element based on incoming json comment data. Returns the fragment
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

// populates the menu with the users received in json format. Returns the menu
const populateSelectMenu = (users) => {
    if (!users) return;

    const selectMenu = document.querySelector('#selectMenu');
    const options = createSelectOptions(users);
    for (const option of options) {
        selectMenu.append(option);
    }

    return selectMenu;
}

// gets the users from website. Returns the data if received.  Throws an error if not. 
const getUsers = async () => {

    try {
        const users = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!users) throw new Error(' No data received');
        return await users.json();
    } catch (err) {
        console.error(err);
    }
}

// gets the posts from website based on a user.  Returns the data if received.  Throws an error if not. 
const getUserPosts = async (userId) => {
    if(!userId) return;

    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!posts) throw new Error(' No data received');
        return await posts.json();
    } catch (err) {
        console.error(err);
    }
}

// gets the user information for a specific user based on userId. Returns the data if received.  Throws an error if not. 
const getUser = async (userId) => {
    if(!userId) return;

    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!user) throw new Error(' No data received');
        return await user.json();
    } catch (err) {
        console.error(err);
    }
}

// gets the comments from website based on a user. Returns the data if received.  Throws an error if not. 
const getPostComments= async (postId) => {
    if(!postId) return;

    try {
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!comments) throw new Error(' No data received');
        return await comments.json();
    } catch (err) {
        console.error(err);
    }
}

// builds an element with comments from a specific user.  Returns the section element. 
const displayComments = async (postID) => {
    if (!postID) return;

    const section = document.createElement('section');
    section.dataset.postId = postID;
    section.classList.add('comments', 'hide');
    const comments = await getPostComments(postID);
    const fragment = createComments(comments);
    section.append(fragment);

    return section;    
}

// Builds the post.  Returns the post fragement. 
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

// Diplays the posts onto the screen by appending to the main element in HTML. Returns the Element. 
const displayPosts = async (posts) => {
    const main = document.querySelector('main');
    
    const element = posts?.length? await createPosts(posts) : createElemWithText('p', 'Select an Employee to display their posts.', 'default-text');
   
    main.append(element);
   
    return element;
}

// creates an array with the comments and buttons.   Returns an array with the comments and button
const toggleComments = (event, postID) => {
    if (!event || !postID) return;

    event.target.listener = true;
    const commentAndButton = [toggleCommentSection(postID), toggleCommentButton(postID)];

    return commentAndButton; 
}

// creates an array with the listeners, parent, posts, and added listeners.  Returns the array
const refreshPosts = async (posts) => {
    if (!posts) return;
    const main = document.querySelector('main');

    const results =[removeButtonListeners(), deleteChildElements(main), await displayPosts(posts), addButtonListeners()];
    
    return results;
}

// Event handler selects the item on change, pulls usersID, posts results from refreshPost into an array and returns the array. 
const selectMenuChangeEventHandler = async (event) => {
    const userId = event?.target?.value || 1;
    
    const posts = await getUserPosts(userId);
    const arr = [userId, posts, await refreshPosts(posts)];

    return arr;
}

// fires off the functions needed to gain data.  Stores teh information in an array. the app returns the needed data array
const initPage = async () => {
    const users = await getUsers();
    const data = [users, populateSelectMenu(users)]

    return data;
}

// starts the needed functions, starts select event, adds the listerner for the menu.  
const initApp = () => {
    initPage();
    const menu = document.querySelector('#selectMenu');
    menu.addEventListener('change', selectMenuChangeEventHandler, false);
}

// Waits for the DOM to fully load and begins the app. 
document.addEventListener('DOMContentLoaded', initApp, false);