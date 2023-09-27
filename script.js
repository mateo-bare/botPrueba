const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");


const options = ["At.Cliente", "At.Proveedores", "Dpto.Tecnico"];
const secondaryOptions = {
"At.Cliente": ["Mostrador Quilmes", "Mostrador Berazategui", "Ventas Industriales", "At.Personalizada"],
"At.Proveedores": ["Pago Proveedores", "Ventas Proveedores"]
};


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


function handleOptionClick(index) {
    const selectedOption = options[index];

    console.log("Opción seleccionada:", selectedOption);

    appendMessage(selectedOption, "user");
    console.log("Opción seleccionada:", index);
    const secondaryOptionsForSelected = secondaryOptions[selectedOption];
   
    if (secondaryOptionsForSelected) {
        showOptions(secondaryOptionsForSelected)
        console.log(secondaryOptionsForSelected)
    } else{
        switch (selectedOption) {
            case "Dpto.Tecnico":
                openWhatsAppChat(1165970420, "Hola, necesito asistencia técnica.");
                break;
            case undefined:
                openWhatsAppChat(1165970420, "hola quisiera atencion persionalizada")
                break;
            default:
                console.log("Acción no definida para la opción seleccionada:", selectedOption);
                break;
        }
    }
};


    // Función para manejar elecciones secundarias y redirigir a WhatsApp
    function handleSecondaryOption(option) {

        switch (option) {
            case "Mostrador Quilmes":
                openWhatsAppChat(1165970420, "mostrador sirve")
            break;
            default:
                // Si no hay coincidencia, no hacemos nada especial
                break;
        }
    }
    
    
    function openWhatsAppChat(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(whatsappLink, "_blank");
    }

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

/*Errores a reparar:
arrelgar apariciones de opciones secundarias(ya que no aparecen)
darle un mejor diseño
*/