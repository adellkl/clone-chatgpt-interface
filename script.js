const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");

hide_sidebar.addEventListener( "click", function() {
    sidebar.classList.toggle( "hidden" );
} );

const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");


show_user_menu.addEventListener( "click", function() {
    if( user_menu.classList.contains("show") ) {
        user_menu.classList.toggle( "show" );
        setTimeout( function() {
            user_menu.classList.toggle( "show-animate" );
        }, 200 );
    } else {
        user_menu.classList.toggle( "show-animate" );
        setTimeout( function() {
            user_menu.classList.toggle( "show" );
        }, 50 );
    }
} );
const newChatButton = document.querySelector(".new-chat");
const conversationsList = document.querySelector(".conversations");

newChatButton.addEventListener("click", function() {

    const newConversation = document.createElement("li");
    newConversation.innerHTML = `
        <button class="conversation-button">
            <i class="fa fa-message fa-regular"></i> Nouvelle conversation
        </button>
        <div class="fade"></div>
        <div class="edit-buttons">
            <div class="edit-buttons">
                <button class="edit-conversation"><i class="fa fa-edit"></i></button>
                <button class="delete-conversation"><i class="fa fa-trash"></i></button>
            </div>
        </div>
    `;
    
    conversationsList.appendChild(newConversation);
    
    
    newConversation.querySelector(".edit-conversation").addEventListener("click", function(event) {
        event.stopPropagation(); 
        editTitle(newConversation);
    });

    newConversation.querySelector(".delete-conversation").addEventListener("click", function(event) {
        event.stopPropagation();
        deleteConversation(this);
    });
});



function deleteConversation(deleteButton) {
    const conversation = deleteButton.closest("li"); 
    conversation.remove(); 
}



function editTitle(conversation) {
    const currentTitle = conversation.querySelector(".conversation-button").innerText;
    const newTitle = prompt("Entrez le nouveau titre de la conversation :", currentTitle);
    if (newTitle !== null && newTitle !== "") {
        conversation.querySelector(".conversation-button").innerText = newTitle;
    }
}


document.querySelectorAll(".edit-conversation").forEach(editButton => {
    editButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        const conversation = editButton.parentElement.parentElement; 
        editTitle(conversation);
    });
});

document.querySelectorAll(".delete-conversation").forEach(deleteButton => {
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        const conversation = deleteButton.parentElement.parentElement; 
        deleteConversation(conversation);
    });
});

const models = document.querySelectorAll(".model-selector button");

for( const model of models ) {
    model.addEventListener("click", function() {
        document.querySelector(".model-selector button.selected")?.classList.remove("selected");
        model.classList.add("selected");
    });
}

const message_box = document.querySelector("#message");

message_box.addEventListener("keyup", function() {
    message_box.style.height = "auto";
    let height = message_box.scrollHeight + 2;
    if( height > 200 ) {
        height = 200;
    }
    message_box.style.height = height + "px";
});

function show_view( view_selector ) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    document.querySelector(view_selector).style.display = "flex";
}

new_chat_button.addEventListener("click", function() {
    show_view( ".new-chat-view" );
});

document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", function() {
        show_view( ".conversation-view" );
    })
});
