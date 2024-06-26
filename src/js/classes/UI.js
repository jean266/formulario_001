
import { inputsRadio, inputConsent, message } from "../useful/selectors.js";

export default class UI {

    radio() {
        inputsRadio.forEach(e => {
            const boxInput = e.parentElement.parentElement;

            e.addEventListener('click', (e) => {
                this.removeClass(boxInput, 'select');

            })
        });
    }

    checkbox() {
        const input = inputConsent.children[0];
        const check = inputConsent.children[1];
        const label = inputConsent.children[2];

        this.checked(input, input);
        this.checked(check, input);
        this.checked(label, input);
    } 

    /* funciones utiles */
    removeClass(element, classe) {
        const elementParent = element.parentElement;
        const inputRadio = element.children[0].children[0];
        const elementClass = elementParent.querySelector(`.${classe}`) || null;

        if (elementClass) {
            elementClass.classList.remove(classe);
            element.classList.add(classe);
            elementClass.children[0].children[0].classList.remove('checking');
            inputRadio.classList.add('checking');
        } else {
            element.classList.add(classe);
            inputRadio.classList.add('checking');
        }
    }

    checked(element, input) {
        element.addEventListener('click', () => {
            if(input.classList.contains('select')) {
                input.classList.remove('select');
            } else {
                input.classList.add('select');
            }
        }); 
    }

    /* Muestra el mensaje de success */
    showMessage() {
        message.classList.add('visible');
        
        setTimeout(() => {
            message.classList.remove('visible');
        }, 3000);
    }

    /* Imprime la alerta */
    sprintAlert(message, element, input = null) {
        const alert = document.createElement('P');
        alert.classList.add('alert')
        alert.textContent = message;

        if(input) {
            element.children[1].classList.add("input_alert");
        }

        // Agregar el elemento al DOM
        element.appendChild(alert);
    }

    /* Remueve la alerta */
    removeAlert(element, input = null) {
        const alert = element.querySelector(".alert");

        if(input) {
            input.classList.remove('input_alert');
        }

        if(alert) {
            alert.remove();
        }
    }
}