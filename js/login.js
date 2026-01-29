
const btn = document.getElementById("register");

btn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (name.length < 3 || password.length < 6 || !email.includes("@")) {
        alert("Please enter valid credentials.");
        return;
    }

    axios.get("http://localhost:8000/users")
        .then(response => {
            console.log("Response:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
