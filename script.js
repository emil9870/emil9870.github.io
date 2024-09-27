// script.js

// Find all dropdown buttons
const buttons = document.querySelectorAll(".dropdown-btn");

// Content for each section
const content = {
    'About Me': `<h1>About Me</h1><p>Hi! I'm a software engineer with a passion for web development.</p>`,
    'Work Experience': `<h1>Work Experience</h1><p>Details about my professional experience.</p>`,
    'Skills': `<h1>Skills</h1><p>JavaScript, CSS, HTML, React, Node.js, and more.</p>`,
    'My Work': `<h1>My Work</h1><p>Here are some of the projects I have worked on.</p>`,
    'Contact Me': `<h1>Contact Me</h1><p>You can reach me at example@example.com.</p>`
};

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const section = button.textContent;
        document.getElementById('content').innerHTML = content[section];
    });
});