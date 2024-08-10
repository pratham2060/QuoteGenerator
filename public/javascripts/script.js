document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");

    function displayRandomQuote() {
        fetch('/quote')
            .then(response => response.json())
            .then(data => {
                const lines = document.querySelector(".quote-lines");
                const author = document.querySelector(".author");

                // Set the quote text and author
                lines.innerHTML = data.quote;
                author.innerHTML = `- ${data.author}`;
            })
            .catch(error => console.error('Error fetching quote:', error));
    }

    // Event listener for generate button
    generateButton.addEventListener('click', displayRandomQuote);

    // Initially display a random quote
    displayRandomQuote();
});
