// ----------------------
// Getting DOM Elements
// ----------------------

// Displays
const cardNameDisplay = document.getElementById("card-name");
const cardNumberDisplay = document.getElementById("card-number");
const cardMonthDisplay = document.getElementById("card-month");
const cardYearDisplay = document.getElementById("card-year");
const cardCvcDisplay = document.getElementById("credit-card-back-cvc");

// Form Inputs
const cardNameInput = document.getElementById("input-name");
const cardNumberInput = document.getElementById("input-number");
const cardMonthInput = document.getElementById("input-exp-mm");
const cardYearInput = document.getElementById("input-exp-yy");
const cardCvcInput = document.getElementById("input-cvc");
const submitButton = document.getElementById("form-submit");

// Error Message Objects
const cardNameErrorMessageObject = document.getElementById("card-name-error");
const cardNumberErrorMessageObject = document.getElementById("card-number-error");
const cardDateErrorMessageObject = document.getElementById("date-fields-error");
const cardCvcErrorMessageObject = document.getElementById("cvc-error");
const formErrorMessageObject = document.getElementById("form-error");

// Content Areas
const mainScreenDisplay = document.getElementById("credit-card-form");
const thankYouDisplay = document.getElementById("thank-you");

// Validation Bundle
let validationBundle = [false, false, false, false, false];

// ------------------------
// Event listeners
// ------------------------
cardNameInput.addEventListener('input', () => {
    cardNameDisplay.innerHTML = cardNameInput.value;
    validationBundle[0] = true;

    // Validations
    if (cardNameInput.value == "") {
        cardNameDisplay.innerHTML = "Jane Appleseed";
        validationBundle[0] = false;
    } else if (!hasLettersOnly(cardNameInput.value)) {
        showErrorMessage('No numbers or special chars are allowed.', cardNameErrorMessageObject, cardNameInput);
        validationBundle[0] = false;
    } else if (cardNameInput.value.length > 20) {
        showErrorMessage('Max 20 characters.', cardNameErrorMessageObject, cardNameInput);
        validationBundle[0] = false;
    } else {
        hideErrorMessage(cardNameErrorMessageObject, cardNameInput);
        validationBundle[0] = true;
    }
});

cardNumberInput.addEventListener('input', () => {
    cardNumberDisplay.innerHTML = formatCreditCardNumber(cardNumberInput.value);
    validationBundle[1] = true;

    // Validations
    if (cardNumberInput.value == "") {
        cardNumberDisplay.innerHTML = "0000 0000 0000 0000";
        hideErrorMessage(cardNumberErrorMessageObject, cardNumberInput);
        validationBundle[1] = false;
    } else if (!hasNumbersOnly(cardNumberInput.value)) {
        showErrorMessage("Only numbers allowed, without spaces.", cardNumberErrorMessageObject, cardNumberInput);
        validationBundle[1] = false;
    } else if (cardNumberInput.value.length > 16) {
        showErrorMessage('Max 16 numbers.', cardNumberErrorMessageObject, cardNumberInput);
        validationBundle[1] = false;
    } else {
        hideErrorMessage(cardNumberErrorMessageObject, cardNumberInput);
        validationBundle[1] = true;
    }
});

cardMonthInput.addEventListener('input', () => {
    cardMonthDisplay.innerHTML = formatMonth(cardMonthInput.value);
    validationBundle[2] = true;

    // Validations
    if (cardMonthInput.value == "") {
        cardMonthDisplay.innerHTML = "00";
        hideErrorMessage(cardDateErrorMessageObject, cardMonthInput);
        validationBundle[2] = false;
    } else if (!(cardMonthInput.value > 0 && cardMonthInput.value <= 12)) {
        showErrorMessage('Month should be between 1 and 12.', cardDateErrorMessageObject, cardMonthInput);
        cardMonthDisplay.innerHTML = '00';
        validationBundle[2] = false;
    } else {
        hideErrorMessage(cardDateErrorMessageObject, cardMonthInput);
        validationBundle[2] = true;
    }
})

cardYearInput.addEventListener('input', () => {
    cardYearDisplay.innerHTML = formatMonth(cardYearInput.value);
    validationBundle[3] = true;

    // Validations
    if (cardYearInput.value == "") {
        cardYearDisplay.innerHTML = "00";
        hideErrorMessage(cardDateErrorMessageObject, cardYearInput);
        validationBundle[3] = false;
    } else if (!(isCurrentOrAboveYear(cardYearInput.value))) {
        showErrorMessage('Year should be current or future.', cardDateErrorMessageObject, cardYearInput);
        cardYearDisplay.innerHTML = '00';
        validationBundle[3] = false;
    } else {
        hideErrorMessage(cardDateErrorMessageObject, cardYearInput);
        validationBundle[3] = true;
    }
})

cardCvcInput.addEventListener('input', () => {
    cardCvcDisplay.innerHTML = cardCvcInput.value;
    validationBundle[4] = true;

    // Validations
    if (cardCvcInput.value == "") {
        cardCvcDisplay.innerHTML = "000";
        hideErrorMessage(cardCvcErrorMessageObject, cardCvcInput);
        validationBundle[4] = false;
    } else if (!hasThreeDigits(cardCvcInput.value)) {
        showErrorMessage("CVC should be 3 digits.", cardCvcErrorMessageObject, cardCvcInput);
        cardCvcDisplay.innerHTML = "000";
        validationBundle[4] = false;
    } else {
        hideErrorMessage(cardCvcErrorMessageObject, cardCvcInput);
        validationBundle[4] = true;
    }
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validationBundle.every(element => element == true)) {
            mainScreenDisplay.classList.toggle("hide-screen");
            thankYouDisplay.classList.remove("hide-screen");
        } else {
            formErrorMessageObject.classList.add('show-error');
        }
})

// ---------------------
// Validation Functions
// ---------------------

function hasLettersOnly(text) {
    let regex = /^[a-zA-Z\s]*$/;
    return regex.test(text);
}

function hasNumbersOnly(text) {
    let regex = /^\d+$/;
    return regex.test(text);
}

function isCurrentOrAboveYear(year) {
    currentYear = new Date().getFullYear().toString();
    return (year >= currentYear.substr(2, 2))
}

function hasThreeDigits(cvc) {
    return (cvc > 0 && cvc.length == 3);
}


// -------------------
// Auxiliary Functions
// -------------------

function showErrorMessage(errorMessage, messageObject, inputField) {
    messageObject.innerHTML = errorMessage;
    if (!messageObject.classList.contains('show-error')) {
        messageObject.classList.add('show-error');
    }
    inputField.style.borderColor = "#ff5252";
}

function hideErrorMessage(messageObject, inputField) {
        messageObject.classList.remove("show-error");
        inputField.style.borderColor = "";
}

function formatCreditCardNumber(creditCardNumber) {
    a = creditCardNumber.substr(0, 4);
    b = creditCardNumber.substr(4, 4);
    c = creditCardNumber.substr(8, 4);
    d = creditCardNumber.substr(12, 4);
    formattedNumber = a + ' ' + b + ' ' + c + ' ' + d;
    return formattedNumber;
}

function formatMonth(month) {
    if (month.length == 1) {
        return ('0' + month);
    } else {
        return month;
    }
}