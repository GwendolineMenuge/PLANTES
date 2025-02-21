document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            contents.forEach(content => content.classList.remove("active"));
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Gestion des plantes
    const planteForm = document.getElementById("planteForm");
    const plantesList = document.getElementById("plantes-list");
    let plantes = JSON.parse(localStorage.getItem("plantes")) || [];

    function renderPlantes() {
        plantesList.innerHTML = "";
        plantes.forEach((plante, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${plante.nom}</strong><br>${plante.desc} 
                <button class="delete" data-index="${index}">❌</button>`;
            plantesList.appendChild(li);
        });
    }

    planteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nom = document.getElementById("planteNom").value;
        const desc = document.getElementById("planteDesc").value;

        plantes.push({ nom, desc });
        localStorage.setItem("plantes", JSON.stringify(plantes));
        renderPlantes();
        planteForm.reset();
    });

    // Gestion des potions
    const potionForm = document.getElementById("potionForm");
    const potionsList = document.getElementById("potions-list");
    let potions = JSON.parse(localStorage.getItem("potions")) || [];

    function renderPotions() {
        potionsList.innerHTML = "";
        potions.forEach((potion, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${potion.nom}</strong><br>${potion.desc} 
                <button class="delete" data-index="${index}">❌</button>`;
            potionsList.appendChild(li);
        });
    }

    potionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nom = document.getElementById("potionNom").value;
        const desc = document.getElementById("potionDesc").value;

        potions.push({ nom, desc });
        localStorage.setItem("potions", JSON.stringify(potions));
        renderPotions();
        potionForm.reset();
    });

    renderPlantes();
    renderPotions();
});
