const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");




function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender + "-message";
    messageDiv.innerText = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

const options = ["At.Cliente", "At.Proveedores", "Dpto.Tecnico"];
//opciones secundarias de At cliente
const secoptions = ["Mostrador Quilmes", "mostrador berazategui", "ventas industriaes", "at.personalizada"]
//opciones secundarias de At proovedores
const thdoptions = ["pago proveedores","ventas proveedores"]

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
    const selectedOption = options[index].toLowerCase(); // Convertir la opción a minúsculas
    
    appendMessage(selectedOption, "user");
    
    console.log(options)
    console.log(index)
    console.log("seleccionaste",selectedOption)
    if (selectedOption === "at.cliente") {
        console.log(options[index])
        let list = handleSecondaryOption(selectedOption); // Llama a la función para redirigir a WhatsApp
        showOptions(list)

    } else if (selectedOption === "at.proveedores") {
        let list = handleSecondaryOption(selectedOption);
        showOptions(list)

    }else if (selectedOption === "dpto.tecnico") {
        handleSecondaryOption(selectedOption);
        openWhatsAppChat(1165970420, "hola")
        
    }else{
        alert("error")
    }
    
    // Eliminar las opciones después de la respuesta del bot
    const optionsDiv = document.querySelector(".options");
    if (optionsDiv) {
        optionsDiv.parentNode.removeChild(optionsDiv);
    }
}

function getOptionsForItem(item) {
    switch (item) {
        case "at.cliente":
            console.log("Item en get", item)
            console.log("option en get", secoptions)
            return secoptions
            case "at.proveedores":
                console.log(item)
                return thdoptions
        default:
            return [];
        }
    }
    // Función para manejar elecciones secundarias y redirigir a WhatsApp
    function handleSecondaryOption(option) {
        console.log("handleSecondary: ", option)
        getOptionsForItem
        switch (option) {
            case "at.cliente":
                return getOptionsForItem(option)
                case "at.proveedrores":
                return getOptionsForItem(option)
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
hacer que sea una ventana flotante
darle un mejor diseño
*/