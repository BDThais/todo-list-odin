const activeProjFieldID = "active-project-field";
let activeProjField;
activeProjField = createActiveProjectField("None");
activeProjField.fieldWrapper.setAttribute("id", activeProjFieldID);

function createSubmitButton() {
    const submitButtonDiv = document.createElement("div");
    submitButtonDiv.classList.add("submit-button-wrapper");
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submit-button");
    submitButton.innerHTML = "✓";
    submitButtonDiv.appendChild(submitButton);

    return { submitButtonDiv, submitButton };
}

function createTextInputField(label, objName) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`${objName}-field-wrapper`);
    const newLabel = document.createElement("label");
    const newInput = document.createElement("input");

    newLabel.setAttribute("for", objName);
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", objName);
    newInput.setAttribute("id", objName);
    newInput.setAttribute("required", true);
    newLabel.innerHTML = label;

    fieldWrapper.appendChild(newLabel);
    fieldWrapper.appendChild(newInput);

    return fieldWrapper;
}

function createTextAreaField(label, objName) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`${objName}-field-wrapper`);
    const newLabel = document.createElement("label");
    const newInput = document.createElement("textarea");

    newLabel.setAttribute("for", objName);
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", objName);
    newInput.setAttribute("id", objName);
    newInput.setAttribute("required", true);
    newLabel.innerHTML = label;

    fieldWrapper.appendChild(newLabel);
    fieldWrapper.appendChild(newInput);

    return fieldWrapper;
}

function createDateInputField(label, objName) {
    const todayDate = (new Date()).toLocaleDateString("sv-SE");
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`${objName}-field-wrapper`);
    const newLabel = document.createElement("label");
    const newInput = document.createElement("input");

    newLabel.setAttribute("for", objName);
    newInput.setAttribute("type", "date");
    newInput.setAttribute("name", objName);
    newInput.setAttribute("id", objName);

    //date form validation
    newInput.setAttribute("value", todayDate);
    newInput.setAttribute("min", todayDate);
    //end

    newLabel.innerHTML = label;

    fieldWrapper.appendChild(newLabel);
    fieldWrapper.appendChild(newInput);

    return fieldWrapper;
}

function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createSelectOption(value) {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", value);
    newOption.innerHTML = `${capitalizeFirstLetter(value)}`;
    return newOption;
}

function createPrioritySelectionField(label, objName) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`${objName}-field-wrapper`);
    const newLabel = document.createElement("label");
    const newInput = document.createElement("select");

    newLabel.setAttribute("for", objName);
    newInput.setAttribute("name", objName);
    newInput.setAttribute("id", objName);
    newLabel.innerHTML = label;

    const veryHigh = createSelectOption("☠️Absolute")
    const highPrio = createSelectOption("👽Lethal");
    const medPrio = createSelectOption("😈Ruthless");
    const lowPrio = createSelectOption("🐯Average");

    lowPrio.setAttribute("selected", true);

    newInput.appendChild(veryHigh);
    newInput.appendChild(highPrio);
    newInput.appendChild(medPrio);
    newInput.appendChild(lowPrio);

    fieldWrapper.appendChild(newLabel);
    fieldWrapper.appendChild(newInput);

    return fieldWrapper;
}

function generateActiveProjectContent(projectName) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add(`active-project-field-wrapper`);
    const newLabel = document.createElement("label");
    newLabel.textContent = `Current Active Chapter: ${projectName}`;
    fieldWrapper.appendChild(newLabel);
    return { fieldWrapper, newLabel };
}

function createActiveProjectField(projectName) {
    if (activeProjField !== undefined) {
        activeProjField.fieldWrapper.innerHTML = "";
        return generateActiveProjectContent(projectName);
    }
    else {return generateActiveProjectContent(projectName)} 
}

export {
    createSubmitButton, createTextAreaField, createTextInputField, createDateInputField,
    createPrioritySelectionField, createActiveProjectField, activeProjField,
};