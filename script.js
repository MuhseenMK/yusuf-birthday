document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CREATE THE STARFIELD ---
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize position, size, and animation duration
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }

    // --- 2. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements that need to animate
    const animatedElements = document.querySelectorAll('.reveal-scale, .reveal-text, .reveal-up');
    
    animatedElements.forEach(el => observer.observe(el));

    // --- 3. WHATSAPP FORM LOGIC ---
    const form = document.getElementById('waForm');
    const messageInput = document.getElementById('waMessage');
    const myPhoneNumber = "2349112473302"; 

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload
        
        const userMessage = messageInput.value.trim();
        
        if (userMessage) {
            // Encode the message to be URL friendly
            const encodedMessage = encodeURIComponent(userMessage);
            
            // Create the WhatsApp direct link
            const whatsappURL = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
            
            // Open in a new tab
            window.open(whatsappURL, '_blank');
            
            // Clear the input so it looks clean if he comes back
            messageInput.value = '';
        }
    });
});