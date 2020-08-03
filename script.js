const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-query');
const outputSection = document.querySelector('.output');

searchButton.addEventListener('click', searchTopic);



function searchTopic() {
    let searchQuery = input.value;

    fetch(`https://gnews.io/api/v3/search?q=${searchQuery}&token=d5640825b9574f46716962e062c5e996`)
        .then(response => response.json())
        .then(array => {
            let articles = array.articles;
            for (i = 0; i < articles.length; i++) {
                function createElement(name, element, className, parentClassName) {
                    name = document.createElement(`${element}`);
                    name.classList.add(`${className}`);
                    let parentClass = document.querySelectorAll(`.${parentClassName}`)
                    parentClass[i].appendChild(name);
                }

                function populate(name, array, key) {
                    name = document.querySelectorAll(`.${name}`);
                    name[i].innerText = (array[i] + '.' + key);
                    console.log(name.innerText);
                    console.log(array);
                }

                function link(name, array, key) {
                    name = document.querySelectorAll(`.${name}`);
                    name[i].href = (array[i] + '.' + key);
                }

                createElement('article', 'div', 'article', 'output');
                createElement('articleTitle', 'a', 'article__title', 'article');
                createElement('articleDescription', 'p', 'article__description', 'article');
                createElement('articleSource', 'a', 'article__source', 'article');
                createElement('articlePubDate', 'p', 'article__date', 'article');

                populate('article__title', articles, 'title');
                populate('article__description', articles, 'description');
                populate('article__source', articles, 'source.name');
                populate('article__date', articles, 'publishedAt');

                link('article__title', articles, 'url');
                link('article__source', articles, 'source.url');
                searchQuery = "";
            }
        })
        .catch(error => console.log(error));
}