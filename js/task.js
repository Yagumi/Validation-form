let loginInput = document.querySelector('.form__login');
let passwordInput = document.querySelector('.form__psw1');
let password2Input = document.querySelector('.form__psw2');
const btn = document.querySelector('.form__btn');

const form = {
    login: 'Vasa',
    password: '13edewd',
    password2: '13edewd',
}

const schemaValidation = {
    login: {
        required: true,
        minLength: 4,
        maxLength: 10,
        regex: /^[A-Za-z]+$/,
    },
    password: {
        required: true,
        minLength: 4,
        maxLength: 10,
        custom: (value, form) => {
            return value === form.password2;
        }
    }
}

//-------My own code-------//
let results = [];
let loginResults = [];
let passwordResults = [];
let password2Results = [];

let formData = {
    login: '',
    password: '',
    password2: '',
};

//--------------Functions helpers------------//
function cheackRequired(value) {
    if(value !== '') {
        results.push(true);
        return true;
    } else {
        results.push(false);
        return false;
    }
}

function cheackMinAndMaxLength(value, minLength, maxLength) {
    if(value.length >= minLength && value.length <= maxLength) {
        results.push(true);
        return true;
    } else {
        results.push(false);
        return false;
    }
}

function cheackForInvalidCharacters(value, regex) {
    const reg = new RegExp(regex);
    if(reg.test(value)) {
        results.push(true);
        return true;
    } else {
        results.push(false);
        return false;
    }
}

function cheackForIdentity(value, form) {
    if(value === form) {
        results.push(true);
        return true;
    } else {
        results.push(false);
        return false;
    }
}

//----------------Login Validations------------//
function checkLoginValidation(form, schemaValidation, formData) {
    cheackRequired(formData.login);
    cheackMinAndMaxLength(formData.login, schemaValidation.login.minLength, schemaValidation.login.maxLength);
    cheackForInvalidCharacters(formData.login, schemaValidation.login.regex);
    cheackForIdentity(formData.login, form.login);
    if(results.every(item => item === true)) {
        // console.log('true');
        loginResults = results.slice();
        results = [];
        return true;
    } else {
        loginResults = results.slice();
        results = [];
        // console.log('false');
        return false;
    }
}

//----------------Password Validations--------//
function checkPasswordValidation(form, schemaValidation, formData) {
    cheackRequired(formData.password);
    cheackMinAndMaxLength(formData.password, 
        schemaValidation.password.minLength, 
        schemaValidation.password.maxLength
    );

    cheackForIdentity(formData.password, form.password);
    if(results.every(item => item === true)) {
        // console.log('true');
        passwordResults = results.slice();
        results = [];
        return true;
    } else {
        // console.log('false');
        passwordResults = results.slice();
        results = [];
        return false;
    }
}

//----------------Passwords Indentity---------//
function cheackForIndentityPsw1AndPsw2(psw1, psw2) {
    if(psw1 === psw2) {
        // console.log('true');
        password2Results.push(true);
        return true;
    } else if(psw1 !== psw2) {
        // console.log('false');
        password2Results.push(false);
        return false;
    }
}

//---------------Catch An Event------------//
btn.addEventListener('click', (event) => {
    event.preventDefault();

    formData.login = loginInput.value;
    formData.password = passwordInput.value;
    formData.password2 = password2Input.value;

    checkLoginValidation(form, schemaValidation, formData);
    checkPasswordValidation(form, schemaValidation, formData);
    cheackForIndentityPsw1AndPsw2(formData.password, formData.password2);
    allValidations(loginResults, passwordResults, password2Results);
});

//---------------Cheack All Validations---------------//
function allValidations(loginResults, passwordResults, password2Results) {
    let allResults = [];
    allResults = loginResults.concat(passwordResults, password2Results);
    // console.log(`results is: ${results} `)
    console.log(`passwordResult is: ${passwordResults}`)
    console.log(`password2Result is: ${password2Results}`)
    if(allResults.every(item => item === true)) {
        console.log('All validation is true');
    } else {
        console.log('All validation is false');
    }
}




