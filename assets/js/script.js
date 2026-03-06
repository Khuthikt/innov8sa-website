document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Check if it's an internal anchor link
            if (href.startsWith('#') || href.startsWith('/')) {
                // Prevent default anchor click behavior
                e.preventDefault();

                // If it's a link to a different page, navigate to that page first
                if (href.startsWith('/')) {
                    window.location.href = href;
                    return;
                }

                // If it's a link to the current page, find the target section
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Active Link Highlight (Basic) ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Contact Form Validation (contact.html) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the form from submitting by default

            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(span => {
                span.textContent = '';
            });

            let isValid = true;

            // Validate Name
            if (name.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Name is required.';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('emailError').textContent = 'Email is required.';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Subject
            if (subject.value.trim() === '') {
                document.getElementById('subjectError').textContent = 'Subject is required.';
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Message is required.';
                isValid = false;
            }

            // If the form is valid, you can proceed with form submission
            if (isValid) {
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset(); // Clear the form fields
                // In a real application, you would send the data to a server here using fetch()
            }
        });
    }

});

