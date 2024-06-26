
import { inputName, inputLastName, inputEmail, inputMessage, inputsRadio, btnSubmit, inputCheckbox, form } from "../useful/selectors.js";

import {scrolling, removeClasses} from '../funtions.js';

import UI from "./UI.js";

const ui = new UI;

export default class Verification {

    checking() {
        
        btnSubmit.addEventListener('click', e => {
            e.preventDefault();

            // Objeto que guarda los errores
            const mistakes = {};

            // Llena el objeto 'mistakes'
            mistakes[inputName.name] = this.inputsFull(inputName);
            mistakes[inputLastName.name] = this.inputsFull(inputLastName);
            mistakes[inputMessage.name] = this.inputsFull(inputMessage);
            mistakes[inputsRadio[1].name] = this.radio(inputsRadio);
            mistakes[inputCheckbox.name] = this.checkboxVerify(inputCheckbox);

            if(this.inputsFull(inputEmail)) {
                mistakes[inputEmail.name] = this.emailCorrect(inputEmail);
            } else {
                mistakes[inputEmail.name] = this.inputsFull(inputEmail);
            }

            // Verificar si hay errores; si los hay deterner ejecucion del codigo
            for(const key in mistakes) {
                if(mistakes[key] === false) {
                    return;
                } 
            } 

            // Limpiar formulario y mostrar mensaje de envio correcto
            form.reset();
            removeClasses('select');
            scrolling(0, 0);
            ui.showMessage();
        });
        
    }

    /* Verifica si los inputs estan llenos */
    inputsFull(input) {
        const elementParent = input.parentElement;
        if(input.value != '') {
            // Limpiar alerta
            ui.removeAlert(elementParent, input);
            return input.value;
        }

        // Limpiar alerta
        ui.removeAlert(elementParent);

        // Imprimir la alerta
        const message = "This field is requeried";
        ui.sprintAlert(message, elementParent, true);

        return false;
    }

    /* Verifica si el email tiene el formato correcto */
    emailCorrect(input) {
        const regex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

        const parent = input.parentElement;

        if(regex.test(input.value)) {
            // Limpiar alerta
            ui.removeAlert(parent);
            return input.value;
        }

        // Limpiar alerta
        ui.removeAlert(parent);  
        
        // Imprimir Alerta
        const message = "Please enter a valid email address";
        ui.sprintAlert(message, parent, true);
        return false;
    }

    /* Verifica si el radio esta selecionado */
    radio(array) {
        const parent = array[0].parentElement.parentElement.parentElement;
        const radioSelect = parent.querySelector('.checking');

        if(radioSelect) {        
            // Limpiar alerta
            ui.removeAlert(parent);
            return radioSelect.value;
        }
        
        // Limpiar alerta
        ui.removeAlert(parent);        

        // Imprimir Alerta
        const message = "Please select a query type";
        ui.sprintAlert(message, parent);
        return false;
    }

    /* Verifica si el checkbox esta selecionado */
    checkboxVerify(input) {
        const parent = input.parentElement;

        if(input.classList.contains('select')) {
            // Limpiar alerta
            ui.removeAlert(parent);
            return true;
        }

        // Limpiar alerta
        ui.removeAlert(parent);        

        // Imprimir Alerta
        const message = "To submit this form, please consent to being contacted";
        ui.sprintAlert(message, parent);
        return false;
    }

}