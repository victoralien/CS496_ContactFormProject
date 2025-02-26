document.getElementById("contact-form").addEventListener("submit",async function(event){
    event.preventDefault();

    const formData = {
        name : document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };


    // edit the url with the real one. 
    const response = await fetch("https://4osow5elvg.execute-api.us-east-2.amazonaws.com/prod/contact",{
        method: "POST",
        headers: {"Content-Type":"appliction/json"},
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
});
