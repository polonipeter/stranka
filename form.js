function handleBoxClick(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.click(); // Simulate a button click
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const requestButton = document.getElementById('requestButton');
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
                        <!-- Added autocomplete="name" for name field -->
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${email || ''}"  required>
                        <!-- Added autocomplete="email" for email field -->
                    </div>
                    <div class="form-group">
                    <label for="phone">Telefónne číslo:</label>
                    <input type="phone" id="phone" name="phone" value="${phone || ''}" >
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
            } else if (input.name === 'email') {
                email = input.value;
                localStorage.setItem('emailData', JSON.stringify(email));
            } else if (input.name === 'phone') {
                email = input.value;
                localStorage.setItem('phoneData', JSON.stringify(email));
            } else if (input.name === 'message') {
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

                // Simulate form submission (replace with actual logic)
                try {
                    const formData = new FormData(form);
                    const response = await submitForm(formData);

                    if (response.success) {
                        successMessage.innerText = 'Formulár bol úspešne odoslaný!';
                        successMessage.style.display = 'block';
                        localStorage.removeItem('nameData');
                        localStorage.removeItem('emailData');
                        localStorage.removeItem('phoneData');
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

    function getFormHtml(title) {
        const name = JSON.parse(localStorage.getItem('nameData')) || '';
        const email = JSON.parse(localStorage.getItem('emailData')) || '';
        const phone = JSON.parse(localStorage.getItem('phoneData')) || '';
        const message = JSON.parse(localStorage.getItem('messageData')) || '';
        const form =  
        `<button class="cancel-button">×</button>
        <form id="dynamicForm" action="#">
            <div class="form-group">
                <label for="name">Meno:</label>
                <input type="text" id="name" name="name" value="${name}" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${email}" required>
            </div>
            <div class="form-group">
                <label for="phone">Telefónne číslo:</label>
                <input type="phone" id="phone" name="phone" value="${phone}" >
            </div>
            <div class="form-group">
                <label for="message">Správa:</label>
                <textarea id="message" name="message" rows="5" required>${message}</textarea>
            </div>
            <button type="submit">Objednať</button>
        </form>
        <div class="success-message"></div>`;

        if (title === 'Elektronická ochrana') {
            return `<div class="popup-form"> <h2>${title}</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            + `<img src="img/security.png" alt="Informátor">`
            + form + `</div>`;
        } else if (title === 'Fyzická ochrana osôb - bodyguard') {
            return `<div class="popup-form"> <h2>${title}</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            + `<img src="img/security.png" alt="Informátor">`
            + form + `</div>`;
        } else if (title === 'Fyzická ochrana v priestoroch zákazníka') {
            return `<div class="popup-form"> <h2>${title}</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            + `<img src="img/security.png" alt="Informátor">`
            + form + `</div>`;
        } else if (title === 'Hliadka pešej obchôdzky objektu') {
            return `<div class="popup-form"> <h2>${title}</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            + `<img src="img/security.png" alt="Informátor">`
            + form + `</div>`;
        }
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

    function handleButtonClick(buttonId, formTitle) {
        const requestButton = document.getElementById(buttonId);
        localStorage.removeItem('nameData');
        localStorage.removeItem('emailData');
        localStorage.removeItem('phoneData');
        localStorage.removeItem('messageData');
        
        requestButton.addEventListener('click', async () => {
            try {
                const formHtml = getFormHtml(formTitle); // Get form HTML

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

                    // Simulate form submission (replace with actual logic)
                    try {
                        const formData = new FormData(form);
                        const response = await submitForm(formData);

                        if (response.success) {
                            successMessage.innerText = 'Formulár bol úspešne odoslaný!';
                            successMessage.style.display = 'block';
                            localStorage.removeItem('nameData');
                            localStorage.removeItem('emailData');
                            localStorage.removeItem('phoneData');
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
    }

    function submitForm(formData) {
        // Simulate sending form data to server (replace with actual fetch request)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() < 0.8; // Simulate 80% success rate
                resolve({ success });
            }, 2000); // Simulate 2 seconds delay
        });
    }

    // Initialize buttons with their titles
    handleButtonClick('cameraButton', 'Elektronická ochrana');
    handleButtonClick('bodyguardButton', 'Fyzická ochrana osôb - bodyguard');
    handleButtonClick('houseButton', 'Fyzická ochrana v priestoroch zákazníka');
    handleButtonClick('walkButton', 'Hliadka pešej obchôdzky objektu');
});
