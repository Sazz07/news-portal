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
        li.innerHTML = `<a onclick="loadCatagoriesDetails('${catagory.category_id}')" class="nav-link mx-4" href="#">${catagory.category_name}</a>`;
        catagoriesContainer.appendChild(li);
    });
}

// All news in a Category

const loadCatagoriesDetails = async category_id => {

    try {
        const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayCatagoriesDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

const displayCatagoriesDetails = catagories => {
    
    // loader start 
    
    toggleSpiner(true);
    
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    // found Message 

    const foundNumber = document.getElementById('found-number');
    foundNumber.innerText = catagories.length;

    // No news section

    const noCatagory = document.getElementById('no-found-message');
    
    if(catagories.length === 0){
        noCatagory.classList.remove('d-none');
    }
    else{
        noCatagory.classList.add('d-none');
    }

    // sort
    catagories.sort((x, y) =>{
        if(x.total_view < y.total_view){
            return 1;
        }
        else{
            return -1;
        }
    });



    catagories.forEach(catagory => {
        const makeNewsDiv = document.createElement('div');
        makeNewsDiv.classList.add('row');
        makeNewsDiv.innerHTML = `
        <div class="card mb-3 d-flex flex-row">
            <div class="col-md-4 col-sm-6">
                <img src="${catagory.image_url}" class="img-fluid rounded-start p-3" alt="...">
            </div>
            <div class="col-md-8 col-sm-6">
                <div class="card-body">
                <h5 class="card-title">${catagory.title}</h5>
                <p class="card-text">${catagory.details.slice(0, 500)}...</p>
                <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <img class="rounded-circle" style="width: 40px; height: 40px;"
                  src="${catagory.author.img}"
                  class="rounded-full w-10 h-10"
                  alt="" 
                />
                <p class="ps-2">${catagory.author.name ? catagory.author.name : 'Author Unknown'}<br><label>${catagory.author.published_date ? catagory.author.published_date : 'Date not available'}</label></p>
                </div>
              <div>
                <p><i class="fa fa-light fa-eye"></i> ${catagory.total_view ? catagory.total_view : 'No Views Yet'}</p>
              </div>
              <div>
                <a onclick="loadCatagoriesModal('${catagory._id}')" data-bs-toggle="modal" data-bs-target="#catagoryDetailModal" href=""><i class="fa fa-solid fa-arrow-right"></i></a>
              </div>
              </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(makeNewsDiv);
    });
    // stop spinner 
    toggleSpiner(false);
}


// toggle spiner
const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}


// News detail url:

const loadCatagoriesModal = async news_id => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayCatagoriesModal(data.data[0]);
        // console.log((data.data[0].author));
    }
    catch (error) {
        console.log(error);
    }

}


const displayCatagoriesModal = catagory => {

        const catagoryDetails = document.getElementById('catagory-details');
        catagoryDetails.innerHTML = `
            <p>Author Name: ${catagory.author.name ? catagory.author.name : 'No Author Name Found'}</p>
            <p>Publish Date: ${catagory.author.published_date ? catagory.author.published_date : 'No Publish date found'}</p>
            <p>Views: <i class="fa fa-light fa-eye"></i> ${catagory.total_view ? catagory.total_view : 'No Views Yet'}</p>
            <img src="${catagory.author.img}" class="img-fluid rounded" alt="">            
            `;

}







loadCatagories();