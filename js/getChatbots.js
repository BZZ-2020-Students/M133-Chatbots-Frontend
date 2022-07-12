document.addEventListener("DOMContentLoaded", () => {
    let chatbotCollection = document.getElementById("chatbotCollection");

    fetch("".concat(baseUrl, "/chatbot/list"))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to get chatbots");
            }
        }).then(data => {
        console.log(data);
        data.forEach(chatbot => {
                let chatbotElement = document.createElement("div");
                chatbotElement.className = "chatbot";
                chatbotElement.innerHTML = `
                    <h2>${chatbot.chatbotName}</h2>
                    <p>${chatbot.user.username}</p>
                    <a href="${baseUrl}/chatbot/${chatbot.id}/chat">Chat</a>
                `;
                chatbotCollection.appendChild(chatbotElement);
            }
        );
    }).catch(error => {
        alert(error.message);
    });
});
