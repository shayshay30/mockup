const PHOTO_LIST = [
  'https://www.acedarspoon.com/wp-content/uploads/2013/01/Tomato-Cucumber-Salad-with-Yogurt-Dressing-Image-7.jpg',
  'https://images.themodernproper.com/billowy-turkey/production/posts/2018/pasta-with-tomato-cream-sauce-7.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1610375977&s=9c3eeea976df18fdce620a7970d0145d', 'https://cookieandkate.com/images/2017/06/simple-greek-sandwich.jpg',
  'https://www.acouplecooks.com/wp-content/uploads/2020/10/Sauteed-Vegetables-010.jpg', 
  'https://i2.wp.com/www.yummymummykitchen.com/wp-content/uploads/2021/01/protein-oatmeal-1-725x1088.jpg',
  'http://www.eatyourselfskinny.com/wp-content/uploads/2015/09/4441.jpg',
  "healthy-fried-rice-elizabeth-rider-recipe.jpg"
];


function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}


function onThumbnailClick(event) {
  currentIndex = event.currentTarget.dataset.index;
  const image = createImage(event.currentTarget.src);
  showFullsizeImage(image);
  document.body.classList.add('no-scroll');
  modalView.style.top = window.pageYOffset + 'px';
  modalView.classList.remove('hidden');
}

function showFullsizeImage(image) {
  modalView.innerHTML = '';

  image.addEventListener('pointerdown', startDrag);
  image.addEventListener('pointermove', duringDrag);
  image.addEventListener('pointerup', endDrag);
  image.addEventListener('pointercancel', endDrag);
  modalView.appendChild(image);
}

let originX = null;
function startDrag(event) {
  event.preventDefault();
  event.stopPropagation();

  originX = event.clientX;
  event.target.setPointerCapture(event.pointerId);
}

function duringDrag(event) {
  if (originX) {
    const currentX = event.clientX;
    const delta = currentX - originX;
    const element = event.currentTarget;
    element.style.transform = 'translateX(' + delta + 'px)';
  }
}

function endDrag(event) {
  if (!originX) {
    return;
  }

  const currentX = event.clientX;
  const delta = currentX - originX;
  originX = null;
  if (Math.abs(delta) < 100) {
    event.currentTarget.style.transform = '';
    return;
  }

  let nextIndex = currentIndex;
  if (delta < 0) {
    nextIndex++;
  } else {
    nextIndex--;
  }

  if (nextIndex < 0 || nextIndex == PHOTO_LIST.length) {
    event.currentTarget.style.transform = '';
    return;
  }

  const photoSrc = PHOTO_LIST[nextIndex];
  const image = createImage(photoSrc);
  if (delta < 0) {
    image.classList.add('animate-next');
  } else {
    image.classList.add('animate-prev');
  }
  showFullsizeImage(image);
  currentIndex = nextIndex;
}

function onModalClick() {
  hideModalView();
}

function hideModalView() {
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
}

let currentIndex = null;
const albumView = document.querySelector('#album-view');
for (let i = 0; i < PHOTO_LIST.length; i++) {
  const photoSrc = PHOTO_LIST[i];
  const image = createImage(photoSrc);
  image.dataset.index = i;
  image.addEventListener('pointerdown', onThumbnailClick);
  albumView.appendChild(image);
}

function toggleDiv() {
  var x = document.getElementById("drinks-album-view");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}
const modalView = document.querySelector('#modal-view');
modalView.addEventListener('pointerdown', onModalClick);
