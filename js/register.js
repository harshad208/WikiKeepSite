document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        const socket = new WebSocket("wss://wiki-keep-208-d40bc33efc6d.herokuapp.com/ws");

        // Event handler for when the WebSocket connection is established
        socket.onopen = async function(event) {
            console.log("WebSocket connection established.");
            
            // Prepare registration data
            const data = {
                action: "register",
                username: username,
                email: email,
                password: password
            };
            
            // Send registration data to the server
            socket.send(JSON.stringify(data));
        };

        // Event handler for incoming messages from the server
        socket.onmessage = async function(event) {
            const response = JSON.parse(event.data);
            if (response) {
                alert('Registration successful! Please log in.');
                window.location.href = '/login.html';
            } else {
                alert(response.message || 'Registration failed.');
            }
        };

        // Event handler for WebSocket connection close
        socket.onclose = function(event) {
            console.log("WebSocket connection closed.");
        };
    });
});
