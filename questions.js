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