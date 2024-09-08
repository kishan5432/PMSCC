document.addEventListener('DOMContentLoaded', function() {
    // Handle signup form submission
    document.getElementById('signupForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        
        // Get form values
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        
        // Save user to XML (simulate this with a message for now)
        alert('Signup functionality is not implemented in this prototype.');
    });

    // Handle login form submission
    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Get form values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Load and parse XML file
        fetch('users.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                const users = xmlDoc.getElementsByTagName('user');
                
                let loginSuccessful = false;
                
                for (let i = 0; i < users.length; i++) {
                    const xmlUsername = users[i].getElementsByTagName('username')[0].textContent;
                    const xmlPassword = users[i].getElementsByTagName('password')[0].textContent;
                    
                    if (username === xmlUsername && password === xmlPassword) {
                        loginSuccessful = true;
                        break;
                    }
                }
                
                if (loginSuccessful) {
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => console.error('Error fetching XML:', error));
    });

    // Image Slider functionality
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.querySelector('.slides');
        const images = slides.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';  
        }
        slideIndex++;
        if (slideIndex > images.length) {slideIndex = 1}    
        images[slideIndex-1].style.display = 'block';  
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    window.prevSlide = function() {
        const slides = document.querySelector('.slides');
        const images = slides.getElementsByTagName('img');
        slideIndex -= 2; // Go back one slide
        if (slideIndex < 0) {slideIndex = images.length - 1}
        showSlides();
    };

    window.nextSlide = function() {
        showSlides();
    };
});
