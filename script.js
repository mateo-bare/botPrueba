const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender + "-message";
    messageDiv.innerText = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function showOptions(options) {
    const optionsDiv = document.createElement("div");
    
    options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.className = "option-button";
        optionButton.innerText = option;
        optionButton.addEventListener("click", () => handleOptionClick(index));
        optionsDiv.appendChild(optionButton);
    });
    
    chatLog.appendChild(optionsDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}
function openWhatsAppChat(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
}

function handleOptionClick(index) {
    const selectedOption = options[index];
    appendMessage(selectedOption, "user");
    
    const botResponse = "Perfecto, estás interesado en " + selectedOption + ".";
    
    if (selectedOption === "At.Cliente" || selectedOption === "At.Proveedores") {
        setTimeout(function() {
            appendMessage(botResponse, "bot");
            const itemOptions = getOptionsForItem(selectedOption);
            showOptions(itemOptions);
        }, 500);
    } else if (selectedOption.startsWith("At.Cliente")) {
        const itemName = selectedOption.toLowerCase().replace(/\s/g, "-");
        const whatsappLink = `https://api.whatsapp.com/send?phone=1165970420&text=¡Hola! Estoy interesado en ${itemName}. ¿Puede proporcionarme más información?`;
        window.open(whatsappLink, "_blank");
    } else if(selectedOption.startsWith("At.proveedores") ){
        const itemName = selectedOption.toLowerCase().replace(/\s/g, "-");
        const whatsappLink = `https://api.whatsapp.com/send?phone=1165970420&text=¡Hola! Estoy interesado en ${itemName}. ¿Puede proporcionarme más información?`;
        window.open(whatsappLink, "_blank");
    }else if (selectedOption.startsWith("Dpto.Tecnico")) {
        const itemName = selectedOption.toLowerCase().replace(/\s/g, "-");
        const whatsappLink = `https://api.whatsapp.com/send?phone=1165970420&text=¡Hola! Estoy interesado en ${itemName}. ¿Puede proporcionarme más información?`;
        window.open(whatsappLink, "_blank");
    }else{
        setTimeout(function() {
            appendMessage(botResponse + " Aquí tienes más información...", "bot");
            // Puedes implementar más lógica para otras opciones aquí
        }, 500);
    }
    
    // Eliminar las opciones después de la respuesta del bot
    const optionsDiv = document.querySelector(".options");
    if (optionsDiv) {
        optionsDiv.parentNode.removeChild(optionsDiv);
    }
}


function getOptionsForItem(item) {
    console.log(item)
    switch (item) {
        case "At.Cliente":
            return ["Motrador Quilmes", "Mostrador Berazategui", "Ventas Industriaes", "At.Personalizada"];
        case "At.Proveedores":
            return ["Dpto.Compras", "Pago a Proveedores"];
        default:
            return [];
    }

}

const options = ["At.Cliente", "At.proveedores", "Dpto.Tecnico"];
let optionsShown = false;

// Mensaje de bienvenida inicial
appendMessage("¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?", "bot");

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const userMessage = userInput.value;
        appendMessage(userMessage, "user");
        
        if (!optionsShown) {
            showOptions(options);
            optionsShown = true;
            userInput.value = "";
        } else {
            // Manejar respuesta adicional si se desea
        }
    }
});
