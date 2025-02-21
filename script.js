document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addForm");
    const list = document.getElementById("list");

    // Charger les données stockées
    let items = JSON.parse(localStorage.getItem("plantes")) || [];

    function renderList() {
        list.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${item.name}</strong><br>${item.description} 
                <button class="delete" data-index="${index}">❌</button>`;
            list.appendChild(li);
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        if (name && description) {
            items.push({ name, description });
            localStorage.setItem("plantes", JSON.stringify(items));
            renderList();
            form.reset();
        }
    });

    list.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            items.splice(index, 1);
            localStorage.setItem("plantes", JSON.stringify(items));
            renderList();
        }
    });

    renderList();
});
