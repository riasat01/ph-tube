const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    addCategory(data.data);
    // console.log(data.data);
}

const addCategory = (categories) => {
    const categoryContainer = document.querySelector('#category-btns-container');
    categories.forEach(category => {
        let id = 1;
        const div = document.createElement('div');
        div.innerHTML = `<button id="${id}" onClick="btnClicked(this,${category?.category_id})" class="btn rounded-md category-btn">${category?.category}</button>`;
        categoryContainer.appendChild(div);
        ++id;
    });
    document.getElementById('1').classList.add('text-white', 'bg-[#FF1F3D]');
}

let currentCategory;

const btnClicked = (btn, id) => {
    const catBtn = document.querySelectorAll('#category-btns-container div .category-btn');
    catBtn.forEach(button => {
        button.classList.remove('text-white', 'bg-[#FF1F3D]');
    });
    btn.classList.add('text-white', 'bg-[#FF1F3D]')
    // console.log(catBtn);
    catBtnClicked(false, id);
    currentCategory = id;
}

const catBtnClicked = async (callFromSort = false, id = 1000) => {
    // console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const cardsJson = await response.json();
    const cards = cardsJson.data;
    if (callFromSort === true) {
        for (let k = 0; k < cards.length - 1; k++) {
            for (let l = k + 1; l < cards.length; l++) {
                if ((parseFloat(cards[k]?.others?.views.split('K')[0])) < parseFloat(cards[l]?.others?.views.split('K')[0])) {
                    [cards[l], cards[k]] = [cards[k], cards[l]];
                    // console.log(`a = ${cards[k]?.others?.views.split('K')[0]}, b = ${cards[l]?.others?.views.split('K')[0]}`);
                }
            }
        }
        // console.log(cards);
    }
    showCards(cards);
}

const showCards = (cards) => {
    const videoContainer = document.querySelector('#video-container');
    videoContainer.innerHTML = '';
    if (cards.length > 0) {
        cards.forEach(data => {
            const div = document.createElement('div');
            div.classList.add('relative')
            div.innerHTML = `<div class="card card-compact bg-base-100">
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
            <p class="absolute top-40 right-3 text-white bg-black px-1 rounded-lg"><span>${(data?.others?.posted_date) ? parseInt((data?.others?.posted_date) / 3600) : ''}</span>${(data?.others?.posted_date) ? 'hrs ' : ''}<span>${(data?.others?.posted_date) ? parseInt(((data?.others?.posted_date) % 3600) / 60) : ''}</span>${(data?.others?.posted_date) ? ' min ago' : ''}</p>`;
            videoContainer.appendChild(div);
        });
    } else {
        const div = document.createElement('div');
        div.classList.add('text-center', 'col-start-1','lg:col-start-2', 'col-span-2', 'flex', 'flex-col', 'items-center', 'space-y-8');
        div.innerHTML = `
            <img src="./images/Icon.png" alt="">
            <p class="text-4xl font-bold">Oops!! Sorry, There is no<br> content here</p>`;
            videoContainer.appendChild(div);
    }

}


document.querySelector('#sort-by-view').addEventListener('click', () => {
    const sort = true;
    catBtnClicked(sort, currentCategory);
})


loadCategory();
catBtnClicked();