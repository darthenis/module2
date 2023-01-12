const $containerCards = document.getElementById("containerCards");

const $containerCheckBoxes = document.getElementById("containerCheckBoxes");

let $checkBoxes;

const $searchInput = document.getElementById("search");

const templateLoading = ` <div class="lds-roller">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                        `

const isLoading = (id, idContainer, idsTohide) => {

  hiddenElements(idsTohide);

  const loading = document.getElementById(id);

  if(loading) return loading.remove();

  const container = document.getElementById(idContainer);

  const newNode = document.createElement('div');

  newNode.classList.add("d-flex")

  newNode.classList.add("justify-content-center")

  newNode.classList.add("align-items-center")

  newNode.style.height = "50vh"

  newNode.id = "loading"

  newNode.innerHTML += templateLoading;

  container.insertBefore(newNode, container.firstChild)

}


const hiddenElements = (elements) => {

  for(let element of elements){
  
  let nodeElement = document.getElementById(element);
  
  let display = nodeElement.style.visibility;
  
  if(display === "hidden") nodeElement.style.visibility = "visible"
  else nodeElement.style.visibility = "hidden";
  }
  
}

const handlerErrorLoadData = (elementsToHide, containerId) => {

  hiddenElements(elementsToHide);

  const container = document.getElementById(containerId);

  container.innerHTML = ` <p class="text-center fs-3 text-light mt-4">
                            Oops, something went wrong. Please try more later.
                          </p>`

}

const loadData = async (url) => {
  return fetch(url)
                .then((res) => res.json())
                .then((res) => {
                  return res.events;
                })
                .catch(err => {

                  throw err;

                })
};

const renderiseEventsCard = (events, container) => {

  container.innerHTML  = "";

  if(!events.length) return container.innerHTML="<p class='text-light text-center fs-3 text-notfound'>There are no matches that correspond to the search</p>"

  for (let event of events) {
    container.innerHTML += buildCard(event);
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
            <a href="./details.html?id=${card._id}" class="btn-viewMore">View more</a>
        </div>
    </div>
</article>`;
};

//LoadData

isLoading("loading", "main", ['search'])

loadData("https://mindhub-xj03.onrender.com/api/amazing").then((data) => {

  isLoading("loading", "main", ['search'])

  renderiseEventsCard(data, $containerCards);

  generateCheckBoxes(data, $containerCheckBoxes);

  $checkBoxes = document.querySelectorAll('input[type=checkbox]')
  
  filterEvents(data, $checkBoxes, $searchInput);

})
.catch(err => {

  isLoading("loading", "main", ['search'])

  console.log(err)

  handlerErrorLoadData(['search'], "main")

})

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

  let filterEventsSearch = searchHandler($searchInput, events);

  let filterEvents = checkBoxHandler(filterEventsSearch, $checkBoxes);

  renderiseEventsCard(filterEvents, $containerCards)
}


const searchHandler = (input, events) => {

  return events.filter(data => data.name.toLowerCase().startsWith( input.value.toLowerCase() ));

}


const checkBoxHandler = (events, inputs) => {

    let filterData = [];

    let isActiveFilter = inputs.length;

    for(let input of inputs){

      if(input.checked){

        isActiveFilter++

        filterData = filterData.concat(events.filter(e => e.category.split(" ").join("") === input.value));

      } else {

        isActiveFilter--

        filterData = filterData.filter(e => e.category.split(" ").join("")  !== input.value);

      }

    }

    if(!filterData.length && !isActiveFilter) filterData = events;

    return filterData;

}