const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

const options = ["Atecion al Cliente", "Atencion a Proveedores", "Departamento Tecnico"];
const secondaryOptions = {
"Atecion al Cliente": ["Mostrador Quilmes", "Mostrador Berazategui", "Ventas Industriales", "Atencion Personalizada"],
"Atencion a Proveedores": ["Pago a Proveedores", "Compras a Proveedores"]
};

function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender + "-message";
    messageDiv.innerText = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function showOptions(options, isSecondary = false) {
    const optionsDiv = document.createElement("div");
    
    options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.className = "option-button";
        optionButton.innerText = option;
        optionButton.addEventListener("click", isSecondary ? () => handleSecondaryOptionClick(option) : () => handleOptionClick(index));
        optionsDiv.appendChild(optionButton);
    });
    
    chatLog.appendChild(optionsDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function handleSecondaryOptionClick(option) {
    console.log("Opción secundaria seleccionada:", option);
    appendMessage(option, "user");
    handleSecondaryOption(option);
}


function handleOptionClick(index) {
    const selectedOption = options[index];
    
    console.log("Opción seleccionada:", selectedOption);
    
    appendMessage(selectedOption, "user");
    console.log("Opción seleccionada:", index);
  
    const secondaryOptionsForSelected = secondaryOptions[selectedOption];
  
    

        switch (selectedOption) {
            case "Departamento Tecnico":
                openWhatsAppChat(+5491165970420, "Hola, necesito asistencia técnica.");
                break;
            case undefined:
                alert("undefined")
                break;
            default:
                if(secondaryOptionsForSelected){
                    showOptions(secondaryOptionsForSelected, true);
                }else{
                    console.log("Acción no definida para la opción seleccionada:", selectedOption);
                }   
                break;
            }
    }



    // Función para manejar elecciones secundarias y redirigir a WhatsApp
    function handleSecondaryOption(option) {

        switch (option) {
            case "Mostrador Quilmes":
                openWhatsAppChat(+5491161667138, "Hola quisiera consultar precios sobre algunos productos") //num de quilmes
            break;
            case "Mostrador Berazategui":
                openWhatsAppChat(+5491153539408, "Hola quisiera consultar precios sobre algunos productos") //num de bera
                break;
                case "Ventas Industriales":
                    openWhatsAppChat(+5491165970420, "Hola quisiera que me hagas una cotizacion")   //num de jesus
                    break;
                case "Atencion Personalizada":
                    openWhatsAppChat(+5491165970420, "Hola quisiera comunicarme con algun empleado de administracion")  //num de ???
                    break;
                case "Pago a Proveedores":
                    openWhatsAppChat(+5491123295730, "Hola quisiera pagar/consultar alguna deuda vigente")  //num de carla
                    break;
                case "Compras a Proveedores":
                    openWhatsAppChat(+54911, "ventas a proveedores sirve")  //num de jaz
                    break;
            default:
                alert("Consultar error con el Programador")
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
appendMessage("¡Hola! Soy tu asistente virtual, Dime con quien deseas comunicarte", "bot");
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
darle un mejor diseño
*/