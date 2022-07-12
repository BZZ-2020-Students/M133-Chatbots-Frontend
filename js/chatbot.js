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
        title.innerHTML = data.chatbotName;
        madeBy.innerHTML = data.user.username;
    }).catch(error => {
        alert(error.message);
    });
});