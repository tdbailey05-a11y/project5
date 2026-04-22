/* Project 5 Template */

let phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.(com|gov|edu|io|net)$/i;
let zipCodeRegex = /^(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?$/;

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form = null;
let successMsg = null;
function initValidation(formId, successId) {

  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  if (!form) return;

  let inputs = form.querySelectorAll("input, textarea");
  for (let input of inputs) {

    input.addEventListener("change", inputChanged);
  }
  form.addEventListener("submit", submitForm);

}
function inputChanged(ev) {
  let el = ev.currentTarget;
  validateForm();
 
  el.classList.add("was-validated");

  if (el.type === "checkbox" || el.type === "radio") {
    let group = document.querySelectorAll(`input[name="${el.name}"]`);
    group.forEach(g => g.classList.add("was-validated"));
  }
}

function submitForm(ev) {
  console.log("in submit");
  let form = ev.currentTarget;
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    let inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(el => el.classList.add("was-validated"));
  } else {
    form.style.display = "none";
    if (successMsg) successMsg.style.display = "block";
  }

}


function validateForm() {

  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");

  if (checkRequired("state", "State is Required")) {
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }

  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex);
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex);
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex);
  }
  checkRequired("newspaper", "you must select at least one!");

}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  let value = el.value.toUpperCase().trim();
  if (stateAbbreviations.includes(value)) {
    valid = true;
  }
  setElementValidity(id, valid, msg);
  return valid;
}

function checkFormat(id, msg, regex) {
  let el = document.getElementById(id);
  let valid = regex.test(el.value);

  setElementValidity(id, valid, msg);
  return valid;

}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case 'text':
    case 'password':
    default:
      if (el.tagName === 'TEXTAREA') {
        if (el.value && el.value.trim().length > 0) {
          valid = true;
        }
        break;
      }
      if (el.value && el.value.trim().length > 0) {
        valid = true;
      }
      break;

    case 'checkbox':
    case 'radio': {
      let name = el.name;
      let group = document.querySelectorAll(`input[name="${name}"]`);
      for (let item of group) {
        if (item.checked) {
          valid = true;
          break;
        }
      }
      break;
    }

  }
  setElementValidity(id, valid, message);


  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);

  if (valid) {
    el.setCustomValidity('');
  } else {
    el.setCustomValidity(message);
  }

  // Insert/remove the message in the sibling error div (if one exists).
  // We walk forward through siblings until we hit a `.errorMsg` div, so we
  // don't require it to be the immediate next sibling.
  let errorDiv = null;
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.classList && sibling.classList.contains("errorMsg")) {
      errorDiv = sibling;
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  // Fallback: look inside the parent <li> for any .errorMsg
  if (!errorDiv && el.parentElement) {
    errorDiv = el.parentElement.querySelector(".errorMsg");
  }

  if (errorDiv) {
    errorDiv.textContent = valid ? "" : message;
  }

}
