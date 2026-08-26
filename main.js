/* =========================================================
   MAESTRO MATH
   MAIN JAVASCRIPT
========================================================= */


/* ================= YEAR ================= */

document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});


/* ================= LANGUAGE ================= */

let currentLanguage =
    localStorage.getItem("maestroLanguage") || "en";


function applyLanguage() {

    const html = document.documentElement;

    html.lang = currentLanguage;

    html.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    const elements =
        document.querySelectorAll(
            "[data-en][data-ar]"
        );


    elements.forEach(element => {

        element.textContent =
            currentLanguage === "ar"
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-en");

    });


    const languageText =
        document.getElementById("languageText");


    if (languageText) {

        languageText.textContent =
            currentLanguage === "ar"
                ? "English"
                : "العربية";

    }


    /* ================= LOGIN PLACEHOLDERS ================= */

    const nameInput =
        document.getElementById("studentName");

    const emailInput =
        document.getElementById("studentEmail");

    const passwordInput =
        document.getElementById("studentPassword");


    if (nameInput) {

        nameInput.placeholder =
            currentLanguage === "ar"
                ? "اكتب اسمك"
                : "Enter your name";

    }


    if (emailInput) {

        emailInput.placeholder =
            currentLanguage === "ar"
                ? "اكتب البريد الإلكتروني"
                : "Enter your email";

    }


    if (passwordInput) {

        passwordInput.placeholder =
            currentLanguage === "ar"
                ? "اكتب كلمة المرور"
                : "Enter your password";

    }

}


function toggleLanguage() {

    currentLanguage =
        currentLanguage === "en"
            ? "ar"
            : "en";


    localStorage.setItem(
        "maestroLanguage",
        currentLanguage
    );


    applyLanguage();

}


document.addEventListener(
    "DOMContentLoaded",
    applyLanguage
);



/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");


    if (!menu) return;


    menu.classList.toggle("show");

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const menu =
            document.getElementById("mobileMenu");


        if (!menu) return;


        const links =
            menu.querySelectorAll("a");


        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove("show");

                }
            );

        });

    }
);



/* ================= WHATSAPP ================= */

const whatsappNumber = "201005645074";


function contactWhatsApp(grade) {

    /*
        رسالة واتساب بالعربي دائمًا
        بدون Prompt أو Alert
    */

    const message =
`مرحبًا مستر أشرف 👋

الاسم: 

الصف: ${grade}

الاستفسار: 

Maestro Math`;


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* ================= QUIZZES ================= */


/*
    حطي لينك الاختبار هنا.

    لو فيه لينك:
    الطالب هيتحول للاختبار مباشرة.

    لو مفيش لينك:
    الزرار مش هيعمل أي حاجة.

    مثال:

    "رابعة ابتدائي":
    "https://forms.google.com/...."
*/


const quizLinks = {

    "رابعة ابتدائي": "",

    "خامسة ابتدائي": "",

    "سادسة ابتدائي": ""

};



function startQuiz(
    grade,
    directLink = ""
) {

    const link =
        directLink.trim() !== ""
            ? directLink
            : quizLinks[grade];


    /*
        لو فيه لينك → افتحه
        لو مفيش → لا تعمل أي حاجة
    */

    if (
        link &&
        link.trim() !== ""
    ) {

        window.open(
            link,
            "_blank"
        );

    }

}



/* ================= LOGIN ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const loginForm =
            document.getElementById("loginForm");


        if (!loginForm) return;


        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "studentName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "studentEmail"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "studentPassword"
                    ).value;


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                if (
                    !name ||
                    !email ||
                    !password
                ) {

                    if (message) {

                        message.textContent =
                            currentLanguage === "ar"
                                ? "من فضلك املأ كل البيانات."
                                : "Please fill in all fields.";

                    }

                    return;

                }


                const student = {

                    name: name,

                    email: email

                };


                localStorage.setItem(
                    "maestroStudent",
                    JSON.stringify(student)
                );


                if (message) {

                    message.textContent =
                        currentLanguage === "ar"
                            ? `أهلاً ${name}! تم تسجيل الدخول بنجاح.`
                            : `Welcome ${name}! Login successful.`;

                }


                loginForm.reset();


                setTimeout(
                    () => {

                        window.location.href =
                            "index.html";

                    },
                    1200
                );

            }
        );

    }
);



/* ================= LOGOUT ================= */

function logoutStudent() {

    localStorage.removeItem(
        "maestroStudent"
    );


    window.location.href =
        "index.html";

}



/* ================= STUDENT STATE ================= */

function getLoggedStudent() {

    const data =
        localStorage.getItem(
            "maestroStudent"
        );


    if (!data) {

        return null;

    }


    try {

        return JSON.parse(data);

    }

    catch {

        return null;

    }

}



/* ================= LOGIN / LOGOUT BUTTON ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const student =
            getLoggedStudent();


        const loginButtons =
            document.querySelectorAll(
                ".login-btn"
            );


        if (!loginButtons.length) {

            return;

        }


        if (student) {

            loginButtons.forEach(button => {

                button.textContent =
                    currentLanguage === "ar"
                        ? "تسجيل الخروج"
                        : "Logout";


                button.href = "#";


                button.onclick =
                    function(event) {

                        event.preventDefault();

                        logoutStudent();

                    };

            });

        }

    }
);



/* ================= CLOSE MOBILE MENU ================= */

document.addEventListener(
    "click",
    (event) => {

        const menu =
            document.getElementById(
                "mobileMenu"
            );


        const menuButton =
            document.querySelector(
                ".menu-btn"
            );


        if (!menu) return;


        if (
            menu.classList.contains("show") &&
            !menu.contains(event.target) &&
            !menuButton?.contains(event.target)
        ) {

            menu.classList.remove("show");

        }

    }
);



/* ================= ESCAPE ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {

            return;

        }


        const menu =
            document.getElementById(
                "mobileMenu"
            );


        if (menu) {

            menu.classList.remove("show");

        }

    }
);