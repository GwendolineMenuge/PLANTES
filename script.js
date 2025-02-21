document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    // Activation de l'onglet par défaut
    document.querySelector(".tab-content").classList.add("active");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            contents.forEach(content => content.classList.remove("active"));
            document.getElementById(tab.dataset.tab).classList.add("active");

            // Changer l'onglet actif
            tabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // Gestion des Plantes
    const planteForm = document.getElementById("planteForm");
    const plantesList = document.getElementById("plantes-list");
    let plantes = JSON.parse(localStorage.getItem("plantes")) || [];

    function renderPlantes() {
        plantesList.innerHTML = "";
        plantes.forEach((plante, index) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = plante.image; // Ajout de l'image
            img.alt = plante.nom;

            li.innerHTML = `<strong>${plante.nom}</strong><br>
                            <p>${plante.desc}</p>;
            li.prepend(img);  // Insérer l'image avant le texte
            plantesList.appendChild(li);
        });
    }

    planteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nom = document.getElementById("planteNom").value;
        const desc = document.getElementById("planteDesc").value;
        const image = document.getElementById("planteImage").files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            plantes.push({ 
                nom, 
                desc, 
                image: reader.result // Stocker l'image en base64
            });
            localStorage.setItem("plantes", JSON.stringify(plantes));
            renderPlantes();
            planteForm.reset();
        };

        if (image) {
            reader.readAsDataURL(image); // Convertir l'image en base64
        }
    });

    renderPlantes();
});

