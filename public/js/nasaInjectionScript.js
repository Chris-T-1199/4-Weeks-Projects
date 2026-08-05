function displayNasaEvents(nasaEvents, containerSelector) {

    // containerSelector : la classe CSS du contenur ou placer les cartes
    const nasaEventsContainer = document.querySelector(containerSelector);

    if (!nasaEventsContainer) {
        console.error(
            `Conteneur introuvable : ${containerSelector}`
        );

        return;
    }

    if (!Array.isArray(nasaEvents)) {
        console.error(
            "Les données reçues ne sont pas un tableau :", nasaEvents
        );

        return;
    }

    // On vide le conteur avant d'ajouter les cartes
    nasaEventsContainer.innerHTML = "";

    // On loop au travers de chacun des objets event du JSON
    nasaEvents.forEach((nasaEvent, index) => {

        //  créer nos conteneurs et leurs contenu

        const nasaEventCard = document.createElement("article");
        nasaEventCard.classList.add("nasa-event-card");

        const nasaEventTitle = document.createElement("h2");
        nasaEventTitle.classList.add("nasa-event-title");
        nasaEventTitle.textContent = nasaEvent.name

        const nasaEventType =document.createElement("span");
        nasaEventType.classList.add("nasa-event-type");
        nasaEventType.textContent = nasaEvent.type

        const nasaEventDescription = document.createElement("span");
        nasaEventDescription.classList.add("nasa-event-description");
        nasaEventDescription.textContent = nasaEvent.description



        // ----------------- Coller aux parents -----------------
        nasaEventCard.appendChild(nasaEventDescription)
        nasaEventCard.appendChild(nasaEventType)
        nasaEventCard.appendChild(nasaEventTitle);
        nasaEventsContainer.appendChild(nasaEventCard);
    });

}

async function loadNasaEvents() {
    try{
        // On appelle le JSON
        const response = await fetch("/api/events");

        if(!response.ok) {
            throw new Error(
                `Erreur du serveur : ${response.status}`
            );
        }

        // On transforme le JSON en Js
        const nasaEventsData = await response.json();
        
        // On affiche les events de la NASA
        displayNasaEvents(
            nasaEventsData, ".test"
        );
        
    } catch (error) {
        console.error("Erreur lors du chargement des événements de la NASA :", error);
    }
}

// test pour commit

loadNasaEvents();