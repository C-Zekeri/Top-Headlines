const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-query');
const outputSection = document.querySelector('.output');

searchButton.addEventListener('click', searchTopic);

function searchTopic() {
    let searchQuery = input.value;

    fetch(`https://newsapi.org/v2/top-headlines?q=${searchQuery}&apiKey=c322fecc82854c4a93cbeb3b16b60fd9`)
        .then(response => response.json())
        .then(articles => console.log(articles))
        .then (ouptutContent())
        .catch(error => console.log(error));
}

function outputContent() {

} 