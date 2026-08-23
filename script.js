/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});


/* Close menu */

document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.textContent = "☰";

        });

    });



/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeBtn =
    document.getElementById("themeBtn");


const savedTheme =
    localStorage.getItem("nijhum-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "nijhum-theme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "nijhum-theme",
            "light"
        );

    }

});



/* ==========================================
   TYPING ANIMATION
========================================== */

const typingText =
    document.getElementById("typingText");


const words = [

    "creative websites",

    "interactive experiences",

    "AI ideas",

    "biometric concepts"

];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeLoop() {

    const currentWord =
        words[wordIndex];


    typingText.textContent =
        currentWord.slice(
            0,
            characterIndex
        );


    if (!deleting) {

        characterIndex++;


        if (
            characterIndex >
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeLoop,
                1200
            );

            return;

        }

    } else {

        characterIndex--;


        if (characterIndex < 0) {

            characterIndex = 0;

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;

        }

    }


    setTimeout(

        typeLoop,

        deleting ? 55 : 90

    );

}


typeLoop();



/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const navItems =
    document.querySelectorAll(".nav-link");


const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            if (
                window.scrollY >=
                section.offsetTop - 160
            ) {

                current =
                    section.id;

            }

        });


        navItems.forEach(link => {

            link.classList.toggle(

                "active",

                link.getAttribute(
                    "href"
                ) === "#" + current

            );

        });

    }
);



/* ==========================================
   SCROLL REVEAL
========================================== */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });



/* ==========================================
   SKILL BAR ANIMATION
========================================== */

const skillSection =
    document.getElementById(
        "skills"
    );


const skillObserver =
    new IntersectionObserver(

        entries => {

            if (
                entries[0]
                    .isIntersecting
            ) {

                document
                    .querySelectorAll(
                        ".bar span"
                    )
                    .forEach(bar => {

                        bar.style.width =
                            bar.dataset.width;

                    });


                skillObserver.disconnect();

            }

        },

        {
            threshold: 0.3
        }

    );


skillObserver.observe(
    skillSection
);



/* ==========================================
   COUNTER ANIMATION
========================================== */

const aboutSection =
    document.getElementById(
        "about"
    );


const counterObserver =
    new IntersectionObserver(

        entries => {

            if (
                !entries[0]
                    .isIntersecting
            ) {

                return;

            }


            document
                .querySelectorAll(
                    "[data-target]"
                )
                .forEach(counter => {

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let value = 0;


                    const timer =
                        setInterval(() => {

                            value++;

                            counter.textContent =
                                value + "+";


                            if (
                                value >=
                                target
                            ) {

                                clearInterval(
                                    timer
                                );

                            }

                        }, 100);

                });


            counterObserver.disconnect();

        },

        {
            threshold: 0.3
        }

    );


counterObserver.observe(
    aboutSection
);



/* ==========================================
   PROJECT FILTER
========================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            filterButtons.forEach(
                btn => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            const filter =
                button.dataset.filter;


            projectCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category ===
                    filter
                ) {

                    card.classList.remove(
                        "hide"
                    );

                } else {

                    card.classList.add(
                        "hide"
                    );

                }

            });

        }
    );

});



/* ==========================================
   PROJECT MODAL
========================================== */

const modal =
    document.getElementById(
        "modal"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalText =
    document.getElementById(
        "modalText"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


document
    .querySelectorAll(
        ".details-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                modalTitle.textContent =
                    button.dataset.title;


                modalText.textContent =
                    button.dataset.text;


                modal.classList.add(
                    "show"
                );

            }

        );

    });


function closeModal() {

    modal.classList.remove(
        "show"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);



/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        formMessage.textContent =
            `Thank you, ${name}! Your message has been received.`;


        contactForm.reset();

    }
);



/* ==========================================
   CURRENT YEAR
========================================== */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();