const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    const socket = new WebSocket("wss://wiki-keep-208-d40bc33efc6d.herokuapp.com/ws");

    // Event handler for when the WebSocket connection is established
    socket.onopen = async function(event) {
        console.log("WebSocket connection established.");
        
        // Prepare search data
        const data = {
            action: "search_article",
            article: searchTerm
        };
        
        // Send search data to the server
        socket.send(JSON.stringify(data));
    };
    
    // Event handler for incoming messages from the server
    socket.onmessage = async function(event) {
        const articleContent = JSON.parse(event.data);
        displaySearchResults([articleContent]);
    };
    
    // Event handler for WebSocket connection close
    socket.onclose = function(event) {
        console.log("WebSocket connection closed.");
    };
});

function displaySearchResults(results) {
    searchResults.innerHTML = '';
// Replace newline characters with <br> tags
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('searchResult');
        const contentWithBreaks = result.content.replace(/\n/g, '<br>');
        resultItem.innerHTML = `
            <h1>Title: ${result.title}</h1>
            <h2>Sentiment: ${result.sentiment}</h2>
            <p>${contentWithBreaks}</p>
        `;
        searchResults.appendChild(resultItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');

    registerLink.addEventListener('click', () => {
        // Redirect the user to the registration page
        window.location.href = '/register.html';
    });

    loginLink.addEventListener('click', () => {
        // Redirect the user to the login page
        window.location.href = '/login.html';
    });
});
