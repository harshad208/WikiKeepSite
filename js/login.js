document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        const socket = new WebSocket("wss://wiki-keep-208-d40bc33efc6d.herokuapp.com/ws");

        // Event handler for when the WebSocket connection is established
        socket.onopen = async function(event) {
            console.log("WebSocket connection established.");
            
            // Prepare login data
            const data = {
                action: "login",
                username: username,
                password: password
            };
            
            // Send login data to the server
            socket.send(JSON.stringify(data));
        };

        // Event handler for incoming messages from the server
        socket.onmessage = async function(event) {
            const response = JSON.parse(event.data);
            if (response) {
                const userId = response.user_id;
                window.location.href = `/user_articles.html?user_id=${userId}`;
            } else {
                alert(response.message || 'Login failed.');
            }
        };

        // Event handler for WebSocket connection close
        socket.onclose = function(event) {
            console.log("WebSocket connection closed.");
        };
    });
});
