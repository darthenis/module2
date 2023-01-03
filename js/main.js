const $containerCards = document.getElementById("containerCards");

const $containerCheckBoxes = document.getElementById("containerCheckBoxes");


let eventsData;

const loadData = async (url) => {
  return fetch(url, {
                method: "GET",
              })
                .then((res) => res.json())
                .then((res) => {
                  eventsData = res.events;
                  return res.events;
                });
};

const renderiseEventsCard = (events) => {

  $containerCards.innerHTML  = "";

  for (let event of events) {
    $containerCards.innerHTML += buildCard(event);
  }
};

const buildCard = (card) => {
  return `<article class="card p-2" style="width: 15rem;">
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

loadData("./assets/data/data.json").then((data) => {

  renderiseEventsCard(data);

  generateCheckBoxes(data)
  
  filterEvents()

})

/*generate checkBoxes input from data's categories */

const generateCheckBoxes = (events) => {

  const categories = events.map( event => event.category )

  const noRepeat = new Set( categories );
  
  $containerCheckBoxes.innerHTML += buildTemplateCheckBoxes( noRepeat )

}


const buildTemplateCheckBoxes = (categories) => {
  
  let template = ''

  categories.forEach( (category) => {
      template += ` <div>
                      <input type="checkbox" class="accent-color filter" id=${category} />
                      <label for=${category}>${category}</label>
                    </div>`
  });

  return template


}


/* apply filters events */ 

const $checkBoxes = document.getElementsByClassName("filter");

const $searchInput = document.getElementById("search");

const filterEvents = () => {

  for(let box of $checkBoxes){

    box.addEventListener('change', filterHandler)

  }

  $searchInput.addEventListener('input', filterHandler)

}

const filterHandler = (e) => {

  let filterEventsSearch = searchHandler($searchInput)

  let filterEvents = checkBoxHandler(filterEventsSearch, $checkBoxes)

  renderiseEventsCard(filterEvents)
}


const searchHandler = (input) => {

  let filterData = eventsData.filter(data => data.name.toLowerCase().startsWith( input.value.toLowerCase() )).flat()

  if(!filterData.length) filterData = eventsData;

  return filterData;

}


const checkBoxHandler = (data, inputs) => {

    let filterData = [];

    let isActiveFilter = inputs.length; // 0 is not active

    for(let input of inputs){

      if(input.checked){

        isActiveFilter++

        filterData = filterData.concat(data.filter(e => e.category === input.nextElementSibling.innerHTML));

      } else {

        isActiveFilter--

        filterData = filterData.filter(e => e.category !== input.nextElementSibling.innerHTML);

      }

    }

    if(!filterData.length && !isActiveFilter) filterData = data;

    return filterData;

}
