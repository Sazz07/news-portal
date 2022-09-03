// All Catagory Section

const loadCatagories = async() =>{
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        displayCatagories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}

const displayCatagories = catagories => {

    const catagoriesContainer = document.getElementById('catagories-container');
    catagoriesContainer.innerHTML = ``;

    catagories.forEach(catagory => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `<a class="nav-link mx-4" href="#">${catagory.category_name}</a>`;
        catagoriesContainer.appendChild(li);
    });
}








loadCatagories();