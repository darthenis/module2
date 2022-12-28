const containerCards = document.getElementById("containerCards");

const loadData = (url, where) => {
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      renderiseEventsCard(res.events, where);
    });
};

const renderiseEventsCard = (events, where) => {
  for (let event of events) {
    where.innerHTML += buildCard(event);
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

loadData("./assets/data/data.json", containerCards);
