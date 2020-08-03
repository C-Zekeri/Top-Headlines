const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-query');
const outputSection = document.querySelector('.output');

searchButton.addEventListener('click', searchTopic);

function createElement(name, element, className, parentName) {
    name = document.createElement(`${element}`);
    name.classList.add(`${className}`);
    parentName.appendChild(name);
    return name;
}

function searchTopic() {
    let searchQuery = input.value;

    fetch(`https://gnews.io/api/v3/search?q=${searchQuery}&token=d5640825b9574f46716962e062c5e996`)
        .then(response => response.json())
        //.then(articles => console.log(articles))
        .then(articles => {
            for (i = 0; i < articles.length; i++) {
                console.log("hello");
                createElement(article, div, article, outputSection);
                createElement(articleTitle, a, article__title, article);
                createElement(articleDescription, p, article__description, article);
                createElement(articleSource, a, article__source, article);
                createElement(articlePubDate, p, article__date, article);
        
                articleTitle.innerText = `${articles[i].title}`;
                articleDescription.innerText = `${articles[i].description}`;
                articleSource.innerText = `${articles[i].source.name}`;
                articlePubDate.innerText = `${articles[i].publishedAt}`;
                
                articleTitle.href = `${articles[i].url}`;
                articleSource.href = `${articles[i].source.url}`;
            }
        })
        .catch(error => console.log(error));
}