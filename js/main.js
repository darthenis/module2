let events;

let filterEvents = [];

const loadData = (events, filterEvents, url) => {
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      events = res.events;
      filterEvents = res.events;
      renderiseCards(res.events);
    });
};

const renderiseCards = (events) => {
  const containerCards = document.getElementById("containerCards");

  containerCards.innerHTML = "";

  for (let event of events) {
    containerCards.innerHTML += buildCard(event);
  }
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

loadData(events, filterEvents, "./assets/data/data.json");
