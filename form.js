document.addEventListener('DOMContentLoaded', () => {
    const requestButton = document.getElementById('requestButton');
    localStorage.removeItem('nameData');
    localStorage.removeItem('emailData');
    localStorage.removeItem('messageData');
    async function loadFormHtml() {
        const name = JSON.parse(localStorage.getItem('nameData'));
        const email = JSON.parse(localStorage.getItem('emailData'));
        const message = JSON.parse(localStorage.getItem('messageData'));
        return `
            <div class="popup-form">
                <button class="cancel-button">×</button>
                <form id="dynamicForm" action="#">
                    <h2>Napíšte nám</h2>
                    <div class="form-group">
                        <label for="name">Meno:</label>
                        <input type="text" id="name" name="name" value="${name || ''}"  required>
                        <!-- Added autocomplete="name" for name field -->
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${email || ''}"  required>
                        <!-- Added autocomplete="email" for email field -->
                    </div>
                    <div class="form-group">
                        <label for="message">Správa:</label>
                        <textarea id="message" name="message" rows="5" autocomplete="message" required>${message || ''}</textarea>
                        <!-- Added autocomplete="message" for message field -->
                    </div>
                    <button type="submit">Odoslať</button>
                </form>
                <div class="success-message"></div>
            </div>
        `;
    }

    function saveFormData() {
        document.querySelectorAll('input, textarea').forEach(input => {
            var name;
            var email;
            var message;
            console.log('Input:', input.name, input.value);
            if (input.name === 'name') {
                name = input.value;
                localStorage.setItem('nameData', JSON.stringify(name));
                ;}
            else if (input.name === 'email') {
                email = input.value;
                localStorage.setItem('emailData', JSON.stringify(email));
            }
            else if (input.name === 'message') {
                message = input.value;
                localStorage.setItem('messageData', JSON.stringify(message));
            }
        }); 
    }

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
                        localStorage.removeItem('nameData');
                        localStorage.removeItem('emailData');
                        localStorage.removeItem('messageData');
                        form.reset();
                        
                    } else {
                        throw new Error('Formulár sa nepodarilo odoslať.');
                    }
                } catch (error) {
                    console.error('Chyba pri odosielaní formulára:', error.message);
                }
            });

            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', saveFormData);
            });

        } catch (error) {
            console.error('Chyba pri načítaní formulára:', error.message);
        }
    });

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
