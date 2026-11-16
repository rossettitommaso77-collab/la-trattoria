
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const linkMenu = document.querySelectorAll(".nav-links a");
const tornaSu = document.querySelector("#torna-su");

// MENU HAMBURGER
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        const menuAperto = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", menuAperto);
        menuToggle.setAttribute(
            "aria-label",
            menuAperto ? "Chiudi il menu" : "Apri il menu"
        );

        menuToggle.textContent = menuAperto ? "✕" : "☰";
    });

    // Chiude il menu quando si seleziona una sezione
    linkMenu.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Apri il menu");
            menuToggle.textContent = "☰";
        });
    });
}

// PULSANTE TORNA SU
if (tornaSu) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 350) {
            tornaSu.classList.add("visibile");
        } else {
            tornaSu.classList.remove("visibile");
        }
    });

    tornaSu.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// MODULO PRENOTAZIONE WHATSAPP
const formPrenotazione = document.querySelector("#form-prenotazione");

if (formPrenotazione) {

    // Impedisce di selezionare date passate
    const campoData = document.querySelector("#data");
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, "0");
    const giorno = String(oggi.getDate()).padStart(2, "0");

    campoData.min = `${anno}-${mese}-${giorno}`;

    formPrenotazione.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();
        const data = document.querySelector("#data").value;
        const orario = document.querySelector("#orario").value;
        const persone = document.querySelector("#persone").value;
        const richieste = document.querySelector("#richieste").value.trim();

        // Inserire qui il numero WhatsApp del ristorante
        const numeroRistorante = "390000000000";

        const dataItaliana = new Date(data + "T12:00:00")
            .toLocaleDateString("it-IT");

        const messaggio =
            `Buongiorno! Vorrei richiedere una prenotazione.\n\n` +
            `Nome: ${nome}\n` +
            `Telefono: ${telefono}\n` +
            `Data: ${dataItaliana}\n` +
            `Orario: ${orario}\n` +
            `Numero persone: ${persone}\n` +
            `Richieste particolari: ${richieste || "Nessuna"}\n\n` +
            `Attendo una vostra conferma. Grazie!`;

        const linkWhatsApp =
            `https://wa.me/${numeroRistorante}?text=${encodeURIComponent(messaggio)}`;

        window.open(linkWhatsApp, "_blank");
    });
}
