// Scroll position restore across reloads (e.g. after switching language).

function saveScroll() {
    sessionStorage.setItem("scrollY", window.scrollY);
}

export function setupScrollRestoration() {
    history.scrollRestoration = "manual";
    window.addEventListener("beforeunload", saveScroll);
}

export function restoreScroll() {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY !== null) {

        document.documentElement.style.scrollBehavior = "auto";

        window.scrollTo(0, parseInt(scrollY));

        document.documentElement.style.scrollBehavior = "smooth";
    }
}

// Highlights the sidebar link of the section currently in view.
export function setupScrollSpy() {
    const sections = document.querySelectorAll("[data-nav]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.dataset.target === entry.target.id
                    );
                });

            }
        });
    }, {
        threshold: 0,
        rootMargin: "-10% 0px -80% 0px"
    });

    sections.forEach(section => observer.observe(section));
}
