let data = [];

let filterData = [];

let actualDate;

const containerCards = document.getElementById("containerCards");

const loadData = async () => {
  await fetch("./assets/data/data.json", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      data = res.events;
      filterData = res.events;
      actualDate = new Date(res.currentDate);
    });

  renderiseCards();
};

const renderiseCards = () => {
  let innerHTMLCards = "";

  containerCards.innerHTML = "";

  let title = document.title.replace("Amazing Events | ", "");

  for (let card of filterData) {
    if (title === "Upcoming Events" && new Date(card.date) < actualDate) {
      innerHTMLCards += buildCard(card);
    } else if (title === "Past Events" && new Date(card.date) > actualDate) {
      innerHTMLCards += buildCard(card);
    } else if (title === "Home") {
      innerHTMLCards += buildCard(card);
    }
  }

  containerCards.innerHTML = innerHTMLCards;
};

const buildCard = (card) => {
  return `<article class="card p-2 col-3" style="width: 15rem;">
    <img src=${card.image} class="card-img-top" alt="Collectivities-Party">
    <div class="card-body p-2 d-flex flex-column justify-content-between">
        <div>
            <h5 class="card-title text-center">${card.name}</h5>
            <p class="card-text">${card.description}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">Price $${card.price}</span>
            <a href="./details.html" class="btn-viewMore">View more</a>
        </div>
    </div>
</article>`;
};

loadData();
