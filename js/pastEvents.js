const $containerCards = document.getElementById("containerCards");

const $containerCheckBoxes = document.getElementById("containerCheckBoxes");

let $checkBoxes;

const $searchInput = document.getElementById("search");


const loadData = async (url) => {
  return fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      return getUpcomingEvents(res.events, res.currentDate)
    });
};

const getUpcomingEvents = (events, currentDate) => {
  let upcomingEvents = [];

  for (let event of events) {
    if (event.date < currentDate) {
      upcomingEvents.push(event);
    }
  }

  return upcomingEvents;
};

const renderiseEventsCard = (events, where) => {

  where.innerHTML = "";

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
            <a href="./details.html?id=${card._id}" class="btn-viewMore">View more</a>
        </div>
    </div>
</article>`;
};

loadData("./assets/data/data.json").then((data) => {

  renderiseEventsCard(data, $containerCards);

  generateCheckBoxes(data, $containerCheckBoxes)

  $checkBoxes = document.querySelectorAll('input[type=checkbox]')

  filterEvents(data, $checkBoxes, $searchInput)

});


/*generate checkBoxes input from data's categories */

const generateCheckBoxes = (events, container) => {

  const categories = events.map( event => event.category )

  const noRepeat = new Set( categories );
  
  container.innerHTML += buildTemplateCheckBoxes( noRepeat )

}


const buildTemplateCheckBoxes = (categories) => {
  
  let template = ''

  categories.forEach( (category) => {
      template += ` <div>
                      <input type="checkbox" class="accent-color" value=${category.split(" ").join("")} id=${category} />
                      <label for=${category}>${category}</label>
                    </div>`
  });

  return template


}


/* apply filters events */ 

const filterEvents = (events, checkBoxes, searchInput) => {

  for(let box of checkBoxes){

    box.addEventListener('change', () => filterHandler(events))

  }

  searchInput.addEventListener('input', () => filterHandler(events))

}

const filterHandler = (events) => {

  let filterEventsSearch = searchHandler($searchInput, events)

  let filterEvents = checkBoxHandler(filterEventsSearch, $checkBoxes)

  renderiseEventsCard(filterEvents, $containerCards)
}


const searchHandler = (input, events) => {

  return events.filter(data => data.name.toLowerCase().startsWith( input.value.toLowerCase() ))

}


const checkBoxHandler = (events, inputs) => {

    let filterData = [];

    let isActiveFilter = inputs.length;

    for(let input of inputs){

      if(input.checked){

        isActiveFilter++

        filterData = filterData.concat(events.filter(e => e.category.split(' ').join("") === input.value));

      } else {

        isActiveFilter--

        filterData = filterData.filter(e => e.category.split(' ').join("") !== input.value);

      }

    }

    if(!filterData.length && !isActiveFilter) filterData = events;

    return filterData;

}