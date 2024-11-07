let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

 window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(Links => {
                Links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active')
            }) 
        }
    })
 }

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}
// Initialize EmailJS with your user ID
emailjs.init("felixsimon877@gmail.com"); // Replace with your EmailJS User ID

// Select the contact form (assuming your form has the id 'contact-form')
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the form field values
    var fullName = document.getElementById("full_name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Basic validation
    if (fullName === "" || email === "" || subject === "" || message === "") {
        alert("Please fill out all the fields.");
        return; // Stop if any field is empty
    }

    // Email format validation using regex
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return; // Stop if the email format is invalid
    }

    // Show loading message or spinner
    document.getElementById("loading").style.display = "block"; // Optional: Show loading spinner

    // Prepare the email data to be sent
    var emailData = {
        from_name: fullName,
        from_email: email,
        subject: subject,
        message: message
    };

    // Send the email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailData) // Replace with your EmailJS Service and Template ID
        .then(function(response) {
            // Hide the loading message
            document.getElementById("loading").style.display = "none";

            // Show a success message or alert
            alert("Message sent successfully!");
            console.log("Success:", response);
        }, function(error) {
            // Hide the loading message
            document.getElementById("loading").style.display = "none";

            // Show an error message
            alert("Oops! Something went wrong. Please try again.");
            console.log("Error:", error);
        });
});
