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
    // Crée un nouvel élément li pour la nouvelle conversation
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
    // Ajoute la nouvelle conversation à la liste des conversations
    conversationsList.appendChild(newConversation);
    
    // Attache des gestionnaires d'événements pour les nouveaux boutons d'édition et de suppression
    newConversation.querySelector(".edit-conversation").addEventListener("click", function(event) {
        event.stopPropagation(); // Arrête la propagation de l'événement pour éviter de déclencher le clic sur la conversation
        editTitle(newConversation);
    });

    newConversation.querySelector(".delete-conversation").addEventListener("click", function(event) {
        event.stopPropagation(); // Arrête la propagation de l'événement pour éviter de déclencher le clic sur la conversation
        deleteConversation(this); // Utilisez "this" pour passer le bouton de suppression actuel à la fonction
    });
});


// Fonction pour supprimer une conversation
// Fonction pour supprimer une conversation
function deleteConversation(deleteButton) {
    const conversation = deleteButton.closest("li"); // Obtient l'élément parent li de la conversation
    conversation.remove(); // Supprime la conversation
}


// Fonction pour modifier le titre de la conversation
function editTitle(conversation) {
    const currentTitle = conversation.querySelector(".conversation-button").innerText;
    const newTitle = prompt("Entrez le nouveau titre de la conversation :", currentTitle);
    if (newTitle !== null && newTitle !== "") {
        conversation.querySelector(".conversation-button").innerText = newTitle;
    }
}

// Ajoute les gestionnaires d'événements pour les boutons d'édition et de suppression
document.querySelectorAll(".edit-conversation").forEach(editButton => {
    editButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Arrête la propagation de l'événement pour éviter de déclencher le clic sur la conversation
        const conversation = editButton.parentElement.parentElement; // Obtient l'élément parent (li) de la conversation
        editTitle(conversation);
    });
});

document.querySelectorAll(".delete-conversation").forEach(deleteButton => {
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Arrête la propagation de l'événement pour éviter de déclencher le clic sur la conversation
        const conversation = deleteButton.parentElement.parentElement; // Obtient l'élément parent (li) de la conversation
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
