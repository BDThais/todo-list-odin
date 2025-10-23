import { initAddForm } from "./init-add-form";
import { updateProject } from "./update-handler";

function initPage() {
    document.querySelector("#add-button").addEventListener("click", initAddForm);
    updateProject();
}

export { initPage };