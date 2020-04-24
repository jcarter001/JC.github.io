/*
 * When the airspeed value is changed, this function is called with the
 * new value to update the airspeed readout (the readonly number element
 * next to the range).
 */
function updateSpeed(value) {
    let speedDisplay = document.getElementById('airspeed-out');
    speedDisplay.value = value;
}

/*
 * Given a list BUTTONS of checkboxes or radio buttons, this function returns
 * a boolean value indicating whether at least one button in BUTTONS was 
 * checked.  That is to say, the reutn value is true if at least one button
 * in BUTTONS was checked, and false otherwise.
 * 
 * If the optional argument REQUIRED is supplied, it is taken as the number of
 * buttons in BUTTONS that have to be checked in order for the return value
 * to be true.  That is to say, if REQUIRED is given, then the function will
 * return false if the number of buttons checked in BUTTONS is fewer than
 * REQUIRED, and will return true otherwise.
 *
 * If the second optional argument FLAGELT is supplied, it is a flag element
 * that should be updated to reflect whether the number of boxes checked is
 * at least REQUIRED.
 */
function buttonChecked(buttons, required = 1, flagElt = undefined) {
    
    let checked = 0; // Count of how many buttons in BUTTONS have been checked
    for (let button of buttons) {  // Loop over the buttons
        if (button.checked) {      // each time we find one that's checked
            checked = checked + 1; // increase the count by 1
        }
    }
    console.log('Checked: ' + checked); // For debugging
    let enoughChecked = (checked >= required);
    
    if (flagElt) { // If flagElt exists, set (or remove) its "valid" attribute
	if (enoughChecked) {
	    flagElt.classList.add("valid");
	}
	else {
	    flagElt.classList.remove("valid");
	}
    }
    return enoughChecked;
}


/*
 * This function takes a form element FORMELT and returns true if the controls
 * in the form element are all valid.
 */
function validInput(formElt) {
    let valid = true;
    valid = valid && buttonChecked(document.querySelectorAll(".swallow input"), 2);
    return valid;
}