function handleBoxClick(buttonClass) {
    const buttons = document.getElementsByClassName(buttonClass);
    if (buttons.length > 0) {
        buttons[0].click(); // Simulate a button click on the first button with the class
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const requestButtons = document.getElementsByClassName('requestbutton'); // Get all buttons with the class
    localStorage.removeItem('nameData');
    localStorage.removeItem('emailData');
    localStorage.removeItem('phoneData');
    localStorage.removeItem('messageData');

    async function loadFormHtml() {
        const name = JSON.parse(localStorage.getItem('nameData'));
        const email = JSON.parse(localStorage.getItem('emailData'));
        const phone = JSON.parse(localStorage.getItem('phoneData'));
        const message = JSON.parse(localStorage.getItem('messageData'));
        return `
            <div class="popup-form">
                <button class="cancel-button">×</button>
                <form id="dynamicForm" action="#">
                    <h2>Napíšte nám</h2>
                    <div class="form-group">
                        <label for="name">Meno:</label>
                        <input type="text" id="name" name="name" value="${name || ''}"  required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${email || ''}"  required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefónne číslo:</label>
                        <input type="phone" id="phone" name="phone" value="${phone || ''}" >
                    </div>
                    <div class="form-group">
                        <label for="message">Správa:</label>
                        <textarea id="message" name="message" rows="5" required>${message || ''}</textarea>
                    </div>
                    <button type="submit">Odoslať</button>
                </form>
                <div class="success-message"></div>
            </div>
        `;
    }

    function saveFormData() {
        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.name === 'name') {
                localStorage.setItem('nameData', JSON.stringify(input.value));
            } else if (input.name === 'email') {
                localStorage.setItem('emailData', JSON.stringify(input.value));
            } else if (input.name === 'phone') {
                localStorage.setItem('phoneData', JSON.stringify(input.value));
            } else if (input.name === 'message') {
                localStorage.setItem('messageData', JSON.stringify(input.value));
            }
        }); 
    }

    Array.from(requestButtons).forEach(button => {
        button.addEventListener('click', async () => {
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

                function closePopup() {
                    document.body.removeChild(backdrop);
                    document.body.removeChild(formContainer);
                }

                cancelButton.addEventListener('click', closePopup);
                backdrop.addEventListener('click', closePopup);

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        closePopup();
                    }
                });

                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    try {
                        const formData = new FormData(form);
                        const response = await submitForm(formData);
                        console.log(response);

                        successMessage.innerText = 'Formulár bol úspešne odoslaný!';
                        successMessage.style.display = 'block';
                        localStorage.removeItem('nameData');
                        localStorage.removeItem('emailData');
                        localStorage.removeItem('phoneData');
                        localStorage.removeItem('messageData');
                        form.reset();

                        closePopup();
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
    });

    async function submitForm(formData) {
        const endpointUrl = 'https://albasec.sk:3000/send-email';

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            console.log('Sending form data:', data);
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            const contentType = response.headers.get('Content-Type') || '';
            let result;
            
            if (contentType.includes('application/json')) {
                result = await response.json(); // Parse JSON if it's in JSON format
            } else {
                result = await response.text(); // Parse as text if it's not JSON
            }
            console.log('Response:', result);
            if (!response.ok) {
                console.log(response)
                throw new Error(result.message || 'Server error');
            }
            alert("Email úspešne odoslaný")
            return { success: true };
        } catch (error) {
            alert("Email sa nepodarilo odoslať. Skúste nás kontaktovať telefonicky alebo na email podporaalbasec@gmail.com.")
            console.error('Chyba pri odosielaní formulára:', error.message);
            return { success: false };
        }
    }
});
