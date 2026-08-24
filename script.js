/* ==================================================
   MOBILE MENU
================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });


    /* Close menu after clicking a link */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.textContent = "☰";

        });

    });

}



/* ==================================================
   DARK / LIGHT MODE
================================================== */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    const savedTheme =
        localStorage.getItem("nijhum-theme");


    /* Load saved theme */

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }


    /* Change theme */

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

}



/* ==================================================
   TYPING ANIMATION
================================================== */

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

    if (!typingText) {
        return;
    }


    const currentWord =
        words[wordIndex];


    typingText.textContent =
        currentWord.slice(
            0,
            characterIndex
        );


    /* Typing */

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

    }


    /* Deleting */

    else {

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

        deleting
            ? 55
            : 90

    );

}


typeLoop();



/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const navItems =
    document.querySelectorAll(".nav-link");


const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;


        if (
            window.scrollY >=
            sectionTop - 180
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.toggle(

            "active",

            link.getAttribute("href")
            ===
            "#" + current

        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();



/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver"
    in window
) {


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


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* Fallback */

else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}



/* ==================================================
   SKILL BAR ANIMATION
================================================== */

const skillSection =
    document.getElementById("skills");


if (
    skillSection &&
    "IntersectionObserver" in window
) {


    const skillObserver =
        new IntersectionObserver(

            entries => {

                if (
                    entries[0].isIntersecting
                ) {


                    document
                        .querySelectorAll(
                            ".bar span"
                        )
                        .forEach(bar => {

                            const width =
                                bar.dataset.width;


                            if (width) {

                                bar.style.width =
                                    width;

                            }

                        });


                    skillObserver.disconnect();

                }

            },

            {
                threshold: 0.25
            }

        );


    skillObserver.observe(
        skillSection
    );

}



/* ==================================================
   COUNTER ANIMATION
================================================== */

const aboutSection =
    document.getElementById("about");


if (
    aboutSection &&
    "IntersectionObserver" in window
) {


    const counterObserver =
        new IntersectionObserver(

            entries => {

                if (
                    !entries[0]
                        .isIntersecting
                ) {

                    return;

                }


                const counters =
                    document.querySelectorAll(
                        "[data-target]"
                    );


                counters.forEach(counter => {


                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let value = 0;


                    const duration = 1000;


                    const intervalTime =
                        Math.max(
                            20,
                            Math.floor(
                                duration /
                                target
                            )
                        );


                    const timer =
                        setInterval(() => {

                            value++;


                            counter.textContent =
                                value + "+";


                            if (
                                value >= target
                            ) {

                                clearInterval(
                                    timer
                                );

                            }

                        }, intervalTime);


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

}



/* ==================================================
   PROJECT FILTER
================================================== */

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


            /* Remove active */

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            /* Add active */

            button.classList.add(
                "active"
            );


            /* Get filter */

            const filter =
                button.dataset.filter;


            /* Filter cards */

            projectCards.forEach(card => {


                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
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



/* ==================================================
   PROJECT MODAL
================================================== */

const modal =
    document.getElementById("modal");


const modalTitle =
    document.getElementById("modalTitle");


const modalText =
    document.getElementById("modalText");


const modalClose =
    document.getElementById("modalClose");


const detailsButtons =
    document.querySelectorAll(
        ".details-btn"
    );


detailsButtons.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            if (modalTitle) {

                modalTitle.textContent =
                    button.dataset.title
                    || "Project";

            }


            if (modalText) {

                modalText.textContent =
                    button.dataset.text
                    || "";

            }


            if (modal) {

                modal.classList.add(
                    "show"
                );

            }

            /* Prevent background scroll */

            document.body.style.overflow =
                "hidden";

        }
    );

});



/* Close modal function */

function closeModal() {

    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";

}



/* Close button */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}



/* Click outside modal */

if (modal) {

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

}



/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);



/* ==================================================
   CONTACT FORM - FORMSPREE
================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {


    contactForm.addEventListener(
        "submit",
        async event => {


            /*
                Prevent normal page reload
            */

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const formData =
                new FormData(
                    contactForm
                );


            /* Button loading */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";

            }


            try {


                const response =
                    await fetch(
                        contactForm.action,
                        {

                            method: "POST",

                            body: formData,

                            headers: {

                                Accept:
                                    "application/json"

                            }

                        }
                    );


                if (
                    response.ok
                ) {


                    /* Success message */

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your message has been sent successfully. ✦";

                    }


                    /* Clear form */

                    contactForm.reset();


                } else {


                    /* Error */

                    if (formMessage) {

                        formMessage.textContent =
                            "Something went wrong. Please try again.";

                    }

                }


            } catch (error) {


                if (formMessage) {

                    formMessage.textContent =
                        "Network error. Please check your internet connection.";

                }

            }


            /* Restore button */

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Message ✦";

            }

        }
    );

}



/* ==================================================
   CURRENT YEAR
================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* ==================================================
   PROFILE IMAGE ERROR HANDLING
================================================== */

const profileImage =
    document.querySelector(
        ".photo-ring img"
    );


if (profileImage) {


    profileImage.addEventListener(
        "error",
        () => {

            console.log(
                "Profile image could not be loaded."
            );

        }
    );

}



/* ==================================================
   FINISHED
================================================== */

console.log(
    "Nijhum Portfolio loaded successfully ✦"
);
