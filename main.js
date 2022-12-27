let data;

let filterEvents = [];

const loadData = async () => {
  await fetch("./assets/data/data.json", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      data = res;
      filterEvents = res.events;
    });

  renderiseCards(filterEvents);
};

const renderiseCards = (filterEvents) => {
  const containerCards = document.getElementById("containerCards");

  let innerHTMLCards = "";

  containerCards.innerHTML = "";

  let title = document.title.replace("Amazing Events | ", "");

  for (let event of filterEvents) {
    if (title === "Upcoming Events" && new Date(event.date) < actualDate) {
      innerHTMLCards += buildCard(event);
    } else if (title === "Past Events" && new Date(event.date) > actualDate) {
      innerHTMLCards += buildCard(event);
    } else if (title === "Home") {
      innerHTMLCards += buildCard(event);
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
