document.addEventListener('DOMContentLoaded', () => {
    const requestButton = document.getElementById('requestButton');
    
    requestButton.addEventListener('click', async () => {
        try {
            const formHtml = await loadFormHtml(); // Load form HTML asynchronously
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHtml;
            formContainer.classList.add('popup-form-container');
            
            const backdrop = document.createElement('div');
            backdrop.classList.add('popup-backdrop');
            
            document.body.appendChild(backdrop);
            document.body.appendChild(formContainer);
            
            const form = formContainer.querySelector('form');
            const successMessage = formContainer.querySelector('.success-message');
            const cancelButton = formContainer.querySelector('.cancel-button');
            
            cancelButton.addEventListener('click', () => {
                document.body.removeChild(backdrop);
                document.body.removeChild(formContainer);
            });
            
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                // Simulate form submission (replace with actual logic)
                try {
                    const formData = new FormData(form);
                    const response = await submitForm(formData);
                    
                    if (response.success) {
                        successMessage.innerText = 'Formulár bol úspešne odoslaný!';
                        successMessage.style.display = 'block';
                        form.reset();
                    } else {
                        throw new Error('Formulár sa nepodarilo odoslať.');
                    }
                } catch (error) {
                    console.error('Chyba pri odosielaní formulára:', error.message);
                }
            });
        } catch (error) {
            console.error('Chyba pri načítaní formulára:', error.message);
        }
    });
    
    async function loadFormHtml() {
        // Simulate fetching form HTML from server (replace with actual fetch request)
        return `
            <div class="popup-form">
                <button class="cancel-button">×</button>
                <form id="dynamicForm" action="#">
                    <h2>Napíšte nám</h2>
                    <div class="form-group">
                        <label for="name">Meno:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Správa:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit">Odoslať</button>
                </form>
                <div class="success-message"></div>
            </div>
        `;
    }
    
    async function submitForm(formData) {
        // Simulate sending form data to server (replace with actual fetch request)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() < 0.8; // Simulate 80% success rate
                resolve({ success });
            }, 2000); // Simulate 2 seconds delay
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".question");

    questions.forEach(function(question) {
        question.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".toggle-icon");

            // Toggle class for rotating icon
            icon.classList.toggle("open");

            // Toggle max-height to expand/collapse answer smoothly
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});