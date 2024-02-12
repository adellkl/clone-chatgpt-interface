// Sélection des éléments du DOM
const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");
const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");
const message_box = document.querySelector("#message");
const conversationsList = document.querySelector(".conversations");
const models = document.querySelectorAll(".model-selector button");

// Ajout des écouteurs d'événements
hide_sidebar.addEventListener("click", function() {
    sidebar.classList.toggle("hidden");
});

show_user_menu.addEventListener("click", function() {
    user_menu.classList.toggle("show");
    setTimeout(function() {
        user_menu.classList.toggle("show-animate");
    }, 50);
});

new_chat_button.addEventListener("click", function() {
    addNewConversation();
    show_view(".new-chat-view");
});

// Fonction pour ajouter une nouvelle conversation
function addNewConversation() {
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

    // Ajout des écouteurs d'événements pour les nouveaux boutons d'édition et de suppression
    newConversation.querySelector(".edit-conversation").addEventListener("click", function(event) {
        event.stopPropagation();
        editTitle(newConversation);
    });

    newConversation.querySelector(".delete-conversation").addEventListener("click", function(event) {
        event.stopPropagation();
        deleteConversation(this);
    });
}

// Fonction pour supprimer une conversation
function deleteConversation(deleteButton) {
    const conversation = deleteButton.closest("li");
    conversation.remove();
}

// Fonction pour modifier le titre de la conversation
function editTitle(conversation) {
    const currentTitle = conversation.querySelector(".conversation-button").innerText;
    const newTitle = prompt("Entrez le nouveau titre de la conversation :", currentTitle);
    if (newTitle !== null && newTitle !== "") {
        conversation.querySelector(".conversation-button").innerText = newTitle;
    }
}

// Ajout des écouteurs d'événements pour les boutons d'édition et de suppression existants
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

// Autres fonctionnalités

message_box.addEventListener("keyup", function() {
    message_box.style.height = "auto";
    let height = message_box.scrollHeight + 2;
    if (height > 200) {
        height = 200;
    }
    message_box.style.height = height + "px";
});


function show_view(view_selector) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    document.querySelector(view_selector).style.display = "flex";
}

models.forEach(model => {
    model.addEventListener("click", function() {
        document.querySelector(".model-selector button.selected")?.classList.remove("selected");
        model.classList.add("selected");
    });
});

document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", function() {
        show_view(".conversation-view");
    });
});
