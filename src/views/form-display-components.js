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
    const dateMode = document.createElement("select");
    const dailyOption = createSelectOption("Daily");
    const dateOption = createSelectOption("Specific date");
    const dateInput = document.createElement("input");

    newLabel.setAttribute("for", `${objName}-mode`);
    dateMode.setAttribute("name", `${objName}Mode`);
    dateMode.setAttribute("id", `${objName}-mode`);
    dateMode.appendChild(dailyOption);
    dateMode.appendChild(dateOption);
    dateOption.setAttribute("selected", true);

    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("name", objName);
    dateInput.setAttribute("id", objName);

    //date form validation
    dateInput.setAttribute("value", todayDate);
    dateInput.setAttribute("min", todayDate);
    dateInput.setAttribute("required", true);
    //end

    newLabel.innerHTML = label;

    fieldWrapper.appendChild(newLabel);
    fieldWrapper.appendChild(dateMode);
    fieldWrapper.appendChild(dateInput);

    dateMode.addEventListener("change", () => {
        const isDaily = dateMode.value === "Daily";
        dateInput.disabled = isDaily;
        dateInput.required = !isDaily;
    });

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

    const urgentPrio = createSelectOption("Urgent");
    const highPrio = createSelectOption("High");
    const medPrio = createSelectOption("Medium");
    const lowPrio = createSelectOption("Low");

    lowPrio.setAttribute("selected", true);

    newInput.appendChild(urgentPrio);
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
    newLabel.textContent = `Current Active Project: ${projectName}`;
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