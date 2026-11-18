// ---------- 1. Интерактивная лента «История дружбы» ----------
const episodes = [
  {
    title: "Настороженность",
    image: "img/ep1.jpg",
    frame: "Кадр 1 · котёнок в коробке, взгляд исподлобья",
    note: "Первая встреча. Оба ещё не знают, что этот момент изменит всё."
  },
  {
    title: "Крышка от бутылки",
    image: "img/ep2.jpg",
    frame: "Кадр 2 · маленькая крышка между двумя лапами",
    note: "Крышка — первый жест доверия. Маленький предмет, который становится мостом между двумя мирами."
  },
  {
    title: "Игра",
    image: "img/ep3.jpg",
    frame: "Кадр 3 · котёнок и пёс в прыжке",
    note: "Игра — это язык, на котором не нужно слов. Аниматоры раскадровывали каждое движение по кадрам."
  },
  {
    title: "Гроза",
    image: "img/ep4.jpg",
    frame: "Кадр 4 · тёмное небо, дождь, две фигуры под укрытием",
    note: "Самый страшный эпизод. Здесь становится ясно, что происходит за закрытыми дверями двора."
  },
  {
    title: "Спасение",
    image: "img/ep5.jpg",
    frame: "Кадр 5 · котёнок зовёт на помощь",
    note: "Маленький герой делает то, на что не решался раньше, — действует. И это меняет всё."
  },
  {
    title: "Побег",
    image: "img/ep6.jpg",
    frame: "Кадр 6 · две фигуры уходят в рассвет",
    note: "Финал не про то, куда они идут, а про то, что идут вместе. Дом — это не место."
  }
];

const storyImage = document.getElementById("storyImage");
const episodeNumber = document.getElementById("episodeNumber");
const titleEl = document.getElementById("timelineTitle");
const noteEl = document.getElementById("timelineNote");
const frameEl = document.getElementById("timelineFrame");

document.querySelectorAll(".timeline-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const ep = episodes[Number(btn.dataset.ep)];
    
    storyImage.src = ep.image;
    storyImage.alt = `Эпизод ${Number(btn.dataset.ep) + 1}: ${ep.title}`;
    episodeNumber.textContent = Number(btn.dataset.ep) + 1;
    titleEl.textContent = ep.title;
    noteEl.textContent = ep.note;
    frameEl.textContent = ep.frame;
  });
});

// ---------- 2. Галерея + лайтбокс ----------
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxContent.innerHTML = 
      `<p style="font-size:1.2em;margin-top:0;">${item.textContent}</p>
       <p style="color:#5a5751;font-size:0.9em;">Здесь будет кадр или эскиз. Замените этот блок на &lt;img src="..."&gt; с реальным изображением.</p>`;
    lightbox.hidden = false;
  });
});

lightboxClose.addEventListener("click", () => { lightbox.hidden = true; });
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.hidden = true;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.hidden = true;
});

// ---------- 3. Пасхалка: крышка от бутылки ----------
const cap = document.getElementById("bottleCap");
cap.addEventListener("click", () => {
  cap.classList.add("spin");
  setTimeout(() => cap.classList.remove("spin"), 800);
});

// ---------- 4. Появление секций при скролле ----------
const revealTargets = document.querySelectorAll(".section, .hero");
revealTargets.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));
// Обнови обработчик клика в script.js
document.querySelectorAll(".timeline-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const ep = episodes[Number(btn.dataset.ep)];
    
    // Плавная смена изображения
    const img = document.getElementById("storyImage");
    img.classList.add("fade");
    
    setTimeout(() => {
      img.src = ep.image;
      img.alt = `Эпизод ${Number(btn.dataset.ep) + 1}: ${ep.title}`;
      img.classList.remove("fade");
    }, 300);
    
    episodeNumber.textContent = Number(btn.dataset.ep) + 1;
    titleEl.textContent = ep.title;
    noteEl.textContent = ep.note;
    frameEl.textContent = ep.frame;
  });
});
// ---------- Бегающий котик ----------
const cat = document.getElementById('floatingCat');
let catX = Math.random() * (window.innerWidth - 100);
let catY = Math.random() * (window.innerHeight - 100);
let catSpeedX = 2;
let catSpeedY = 2;
let catDirection = 1; // 1 = вправо, -1 = влево

function animateCat() {
  // Движение
  catX += catSpeedX * catDirection;
  catY += catSpeedY;
  
  // Отскок от краёв
  if (catX <= 0 || catX >= window.innerWidth - 80) {
    catDirection *= -1;
    cat.style.transform = `scaleX(${catDirection})`;
  }
  
  if (catY <= 0 || catY >= window.innerHeight - 80) {
    catSpeedY *= -1;
  }
  
  // Применяем позицию
  cat.style.left = catX + 'px';
  cat.style.top = catY + 'px';
  
  requestAnimationFrame(animateCat);
}

// Запуск анимации
animateCat();

// Изменение скорости при клике (пасхалка)
cat.addEventListener('click', () => {
  catSpeedX = catSpeedX > 0 ? catSpeedX + 1 : catSpeedX - 1;
  catSpeedY = catSpeedY > 0 ? catSpeedY + 1 : catSpeedY - 1;
});