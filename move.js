document.addEventListener('scroll', function() {
    var headerContainer = document.getElementById('headerContainer');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) { // Adjust the scroll threshold as needed
        headerContainer.classList.add('sticky');
    } else {
        headerContainer.classList.remove('sticky');
    }
});
