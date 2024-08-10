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

// Function to copy text to clipboard
function copyTextToClipboard(text) {
    var tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    alert('Quote copied to clipboard!');
}

// Copy quote when "Copy Quote" button is clicked
document.getElementById('copyButton').addEventListener('click', function() {
    var quoteText = document.querySelector('.quote-lines').innerText;
    copyTextToClipboard(quoteText);
});

// Copy quote when the quote itself is clicked
document.querySelector('.quote-lines').addEventListener('click', function() {
    var quoteText = this.innerText;
    copyTextToClipboard(quoteText);
});
