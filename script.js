document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Add event listener to the form for form submission
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Display success message
        successMessage.innerText = 'Správa bola úspešne odoslaná!';
        successMessage.style.display = 'block'; // Make success message visible

        // Reset form fields after 3 seconds
        setTimeout(function() {
            form.reset();
            successMessage.style.display = 'none'; // Hide success message again
        }, 3000);

        // Optional: You can add code here to send the form data to the server
        // For example, using fetch or XMLHttpRequest to send data asynchronously
        // and handle any server-side processing or validation
    });

    // Function to check if an element is in viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    // Function to animate counting up to a target number when in viewport
    function animateValueWhenVisible(id, start, end, duration) {
        var range = end - start;
        var current = start;
        var increment = end > start ? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
        var obj = document.getElementById(id);
        var timer;

        function updateValue() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                if (id === "customers" && end >= 95) {
                    obj.textContent = "95+";
                } else if (id === "experience" && end >= 18) {
                    obj.textContent = "18+";
                } else if (id === "deployment" && end >= 24) {
                    obj.textContent = "24/7";
                } else {
                    obj.textContent = end; // Ensure final value is exactly 'end'
                }
            } else {
                obj.textContent = current;
            }
        }

        // Check if element is in viewport and start animation
        function checkVisibility() {
            if (isInViewport(obj)) {
                timer = setInterval(updateValue, stepTime);
                window.removeEventListener('scroll', checkVisibility); // Remove listener once started
            }
        }

        // Initial check when script runs
        checkVisibility();
        // Check again on scroll
        window.addEventListener('scroll', checkVisibility);
    }

    // Call animateValueWhenVisible function for each stat with desired values and durations
    animateValueWhenVisible("customers", 0, 95, 2000); // 95 customers, 2 seconds duration
    animateValueWhenVisible("experience", 0, 18, 2000); // 18 years of experience, 2 seconds duration
    animateValueWhenVisible("deployment", 0, 24, 2000); // 24/7 deployment, 2 seconds duration
});
