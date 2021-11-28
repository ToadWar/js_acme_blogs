const createElemWithText = (HTMLElem = "p", textContent = "", className ) => {

    const element = document.createElement(HTMLElem);
 
     element.textContent = textContent;
 
     if (className) element.className = className;
 
      return element;
 
 }
 
 const createSelectOptions = (users) => {
  
     if (!users) {
 
         return undefined;
 
     }
 
     const options = [];
 
     for(let i = 0; i < users.length; i++) {
 
        options[i] = new Option( users[i].name, users[i].id);           
 
     }
     return options;
 
 }
 
 const toggleCommentSection = (postID) => {
 
    if (!postID) {

        return undefined;
    }
    const section = document.getElementById(postID);

    if(!section){

        return null;
    }
    section.classList.toggle("hide");

    console.log(section);

    return section;

}

const toggleCommentButton = (postID) => {

    if (!postID){

        return undefined;

    }

    const commentButton = document.getElementById(postID);

    if (!commentButton){

        return commentButton;

    }

    commentButton.textContent = commentButton.textContent === "Show Comments" ? "Hide Comments":"Show Comments";
    return commentButton;
}

const deleteChildElements = (parentElement) => {


    if ( typeof(parentElement) != "HTML" ) {

        return undefined; 

    }

    let child = parentElement.lastElementChild;

    while(child) {

        parentElement.removeChild(child);

        child = getElementById(`${parentElement}`).lastElementChild;

    }
    return parentElement;
}