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