const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    addCategory(data.data);
    // console.log(data.data);
}

const addCategory = (categories) => {
    const categoryContainer = document.querySelector('#category-btns-container');
    categories.forEach(category => {

        const div = document.createElement('div');
        div.innerHTML = `<button onClick="catBtnClicked(${category?.category_id})" class="btn rounded-sm category-btn">${category?.category}</button>`;
        categoryContainer.appendChild(div);
    });
}

const catBtnClicked = async (id = 1000) => {
    console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const cardsJson = await response.json();
    const cards = cardsJson.data;
    // addCategory(data.data);
    const videoContainer = document.querySelector('#video-container');
    videoContainer.innerHTML = '';
    cards.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('relative')
        div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl">
        <figure><img class="rounded-xl h-48 w-full" src="${data?.thumbnail}" alt="Shoes" /></figure>
        <div class="flex space-y-5">
            <div class="w-1/6 mt-5">
                <img class="w-10 h-10 rounded-full" src="${data?.authors[0]?.profile_picture}" alt="">
            </div>
            <div class="space-y-3">
                <h2 class="card-title">${data.title}</h2>
                <div class="flex gap-3">
                    <p>${data?.authors[0]?.profile_name}</p>
                    <span>${(data?.authors[0]?.verified) ? '<i class="fa-solid fa-circle-check text-blue-500"></i>' : ''}</span>
                </div>
                <p>${data?.others?.views} views</p>
            </div>
        </div>
        <p class="absolute top-40 right-3 text-white bg-black px-1 rounded-lg"><span>${(data?.others?.posted_date)?parseInt((data?.others?.posted_date)/3600):''}</span>${(data?.others?.posted_date)?'hrs ':''}<span>${(data?.others?.posted_date)?parseInt(((data?.others?.posted_date)%3600)/60):''}</span>${(data?.others?.posted_date)?' min ago':''}</p>`;
        videoContainer.appendChild(div);
    });
    console.log(cards);
}


loadCategory();
catBtnClicked();