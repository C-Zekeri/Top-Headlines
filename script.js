const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-query');
const outputSection = document.querySelector('.output');

searchButton.addEventListener('click', searchTopic);

function searchTopic() {
    while (outputSection.firstChild) {
        outputSection.removeChild(outputSection.firstChild);
    }

    let searchQuery = input.value;

    fetch(`https://gnews.io/api/v3/search?q=${searchQuery}&token=d5640825b9574f46716962e062c5e996`)
        .then(response => response.json())
        .then(array => {
            let articles = array.articles;
            for (let i = 0; i < articles.length; i++) {               
                function createElement(name, element, className, parentClassName, parentClassKey) {
                    name = document.createElement(`${element}`);
                    name.classList.add(`${className}`);
                    let parentClass = document.getElementsByClassName(`${parentClassName}`);
                    parentClass[parentClassKey].appendChild(name);
                }

                function populate(name, array, key) {
                    name = document.querySelectorAll(`.${name}`);
                    let obj = array[i];
                    name[i].innerText = obj[key];
                }

                createElement('article', 'div', 'article', 'output', 0);
                createElement('articleTitle', 'p', 'article__title', 'article', i);
                createElement('articleDescription', 'p', 'article__description', 'article', i);
                createElement('readMore', 'a', 'btn', 'article', i);
                createElement('articleSource', 'a', 'article__source', 'article', i);
                createElement('articlePubDate', 'p', 'article__date', 'article', i);

                populate('article__title', articles, 'title');
                populate('article__description', articles, 'description');
                populate('article__date', articles, 'publishedAt');

                let articleSource = document.querySelectorAll('.article__source');
                let readMore = document.querySelectorAll('.btn');
                readMore[i].href = articles[i].url;
                readMore[i].innerText = "Read More";
                readMore[i].classList.add('btn-info');
                articleSource[i].innerText = articles[i].source.name;
                articleSource[i].href = articles[i].source.url;

                input.value = "";
            }
        })
        .catch(error => console.log(error));
}