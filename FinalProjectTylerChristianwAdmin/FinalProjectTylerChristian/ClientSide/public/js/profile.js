// back button - goes to previous page in browser history
function goBack() {
    window.history.back();
}

// submit button - validates and submits profile data
function submitProfile() {
    const fields = document.querySelectorAll('section p a');
    
    // check if all fields have content
    let allFilled = true;
    fields.forEach(field => {
        if (!field.textContent.trim()) {
            allFilled = false;
        }
    });

    if (!allFilled) {
        alert("Please fill in all profile fields before submitting.");
        return;
    }

    // submit logic here (e.g. send to server or redirect)
    alert("Profile submitted successfully!");
    window.location.href = "home.html"; }