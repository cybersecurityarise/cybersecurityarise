document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for sidebar links
    const links = document.querySelectorAll(".sidebar a");
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Card flip animation
    const cards = document.querySelectorAll(".card-inner");
    let index = 0;

    setInterval(() => {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.toggle("flipped");
            }
        });
        index = (index + 1) % cards.length;
    }, 3000);
});

