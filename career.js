document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('jobButton');
    localStorage.removeItem('nameData');
    localStorage.removeItem('emailData');
    localStorage.removeItem('messageData');

    openFormButton.addEventListener('click', () => {
        loadFormHtml().then(formHtml => {
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

            const closePopup = () => {
                document.body.removeChild(backdrop);
                document.body.removeChild(formContainer);
            };

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
                    if (response.success) {
                        successMessage.innerText = 'Formulár bol úspešne odoslaný!';
                        successMessage.style.display = 'block';
                        localStorage.clear();
                        form.reset();
                        closePopup();
                    }
                } catch (error) {
                    console.error('Chyba pri odosielaní formulára:', error.message);
                }
            });

            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', saveFormData);
            });
        }).catch(error => {
            console.error('Chyba pri načítaní formulára:', error.message);
        });
    });

    async function loadFormHtml() {
        const name = JSON.parse(localStorage.getItem('nameData')) || '';
        const email = JSON.parse(localStorage.getItem('emailData')) || '';
        const message = JSON.parse(localStorage.getItem('messageData')) || '';

        return `
            <div class="popup-form">
                <button class="cancel-button">×</button>
                <form id="dynamicForm" action="#">
                    <h2>Bezpečnostný pracovník</h2>
                    <div class="form-group">
                        <label for="name">Meno:</label>
                        <input type="text" id="name" name="name" value="${name}" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${email}" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Správa:</label>
                        <textarea id="message" name="message" rows="5" required>${message}</textarea>
                    </div>
                    <button type="submit">Odoslať</button>
                </form>
                <div class="success-message"></div>
            </div>
        `;
    }

    function saveFormData() {
        document.querySelectorAll('input, textarea').forEach(input => {
            localStorage.setItem(`${input.name}Data`, JSON.stringify(input.value));
        });
    }

    async function submitForm(formData) {
        const endpointUrl = 'https://stranka-flame.vercel.app/api/send-email';

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Server error');
            return { success: true };
        } catch (error) {
            console.error('Chyba pri odosielaní formulára:', error.message);
            return { success: false };
        }
    }
});
