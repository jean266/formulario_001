
import UI from "./UI.js";
import Verification from './Verification.js';

const verification = new Verification;
const ui = new UI;

export default class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        document.addEventListener('DOMContentLoaded', () => {
            ui.radio();
            ui.checkbox();
            verification.checking();
        });
    }
}