const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
// Отримуємо елемент ul з класом .gallery
const galleryList = document.querySelector('ul.gallery');

// Створення розмітки для галереї зображень
const galleryMarkup = images.map(image => `
<li class="gallery-item">
  <a class="gallery-link" href="${image.original}">
    <img
      class="gallery-image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description || 'Image'}" 
    />
  </a>
</li>
`).join('');

// Додавання згенерованої розмітки до елементу ul з класом .gallery
galleryList.innerHTML = galleryMarkup;

// Створюємо модальне вікно
const modal = basicLightbox.create(`
<img src="" alt="" />
`, {
onShow: () => { document.addEventListener('keydown', keydownHandler); },
onClose: () => { document.removeEventListener('keydown', keydownHandler); }
});

// Функція для обробки подій натискання клавіш
const keydownHandler = function(e) {
if (e.code === 'Escape') {
  modal.close();
}
};

// Функція для відкриття модального вікна зображення
const openModal = (source) => {
const content = `<img src="${source}" alt="Expanded Image" width="1112" height="640" />`;
modal.element().innerHTML = content;
modal.show();
};

// Функція для закриття модального вікна
const closeModal = () => {
modal.close();
};




// Обробник подій кліку на зображенні для відкриття модального вікна
modal.element().addEventListener('click', (event) => {
if (event.target.nodeName === 'IMG') {
  closeModal();
}
});

// Обробник подій кліку на зображенні галереї
galleryList.addEventListener("click", (event) => {
event.preventDefault();
const clickedGalleryItem = event.target.closest('.gallery-item');
if (clickedGalleryItem) {
  const clickedImage = clickedGalleryItem.querySelector('.gallery-image');
  const clickedImageSource = clickedImage.dataset.source;
  if (clickedImageSource) {
    openModal(clickedImageSource);
  }
}
});