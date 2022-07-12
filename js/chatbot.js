let chatbot = null;
document.addEventListener("DOMContentLoaded", () => {
    const fullSearchParams = window.location.search;
    const urlParams = new URLSearchParams(fullSearchParams);
    const chatbotId = urlParams.get("chatbotId");
    const title = document.getElementById("title");
    const madeBy = document.getElementById("madeBy");

    fetch("".concat(baseUrl, "/chatbot/", chatbotId))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to get chatbot");
            }
        }).then(data => {
        console.log(data);
        chatbot = data;

        title.innerHTML = data.chatbotName;
        madeBy.innerHTML = data.user.username;
    }).catch(error => {
        alert(error.message);
    });

    document.getElementById("chatInputSend").addEventListener("click", sendMessage);
    document.getElementById("chatInputText").addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            await sendMessage();
        }
    });
});

async function sendMessage() {
    const chatInput = document.getElementById("chatInputText");
    const chatInputValue = chatInput.value;

    if (chatInputValue.length > 0) {
        const response = await fetch("".concat(baseUrl, "/chatbot/", chatbot.id, "/", chatInputValue), {
            method: "POST",
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            chatInput.value = "";
        } else {
            throw new Error("Failed to send message");
        }
    }
}