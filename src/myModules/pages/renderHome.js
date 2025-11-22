export const renderHome = () => {
    const paraText = "Get-It-Done is a todo list app here to help you stay on top of your tasks. Add tasks and keep them organized in projects so you never miss a step or do one out of order. Enjoy the productivity and peace of mind that our proper record keeping offers."

    const CONTENT = document.querySelector("#content");
    CONTENT.innerHTML = "";

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("mainContainer");
    CONTENT.appendChild(mainContainer);

    let h2 = document.createElement("h2");
    h2.textContent = "Welcome!";
    mainContainer.appendChild(h2);

    const introText = document.createElement("p");
    introText.textContent = paraText;
    mainContainer.appendChild(introText);

    let hr = document.createElement("hr");
    mainContainer.appendChild(hr);


    let h3 = document.createElement("h3");
    h3.textContent = "Projects";
    mainContainer.appendChild(h3);


    const projContainer = document.createElement("div");
    projContainer.classList.add("projCont");

    let h5 = document.createElement("h5");
    h5.textContent = "Title";
    projContainer.appendChild(h5);

    let tasksList = document.createElement("ul");

    for (let i = 0; i < 4; ++i) {
        let listItem = document.createElement("li");
        listItem.textContent = "TodoName - TodoDate";
        tasksList.appendChild(listItem);
    }

    projContainer.appendChild(tasksList);
    mainContainer.appendChild(projContainer);
}

