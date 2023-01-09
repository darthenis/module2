const $containerCard = document.getElementById("containerDetail");

const loadData = async (url) => {
    return fetch(url, {
                  method: "GET",
                })
                  .then((res) => res.json())
                  .then((res) => {
                    return res.events;
                  });
};

loadData("https://mindhub-xj03.onrender.com/api/amazing").then(events => {

    renderDetailCard(events, $containerCard);
  
  })

const renderDetailCard = (events, container) => {

    let event = events.find(e => e._id === getParamUrl('id'));

    container.innerHTML = buildCard(event);
}

const getParamUrl = (param) => {

    let paramString = location.search;

    let params = new URLSearchParams(paramString);
    
    return params.get(param)

}


const buildCard = (event) => {

    return  `<img src=${event.image} alt="scale">
                <div>
                <h1 class="text-center">${event.name}</h1>
                <ul>
                    <li><span>Date:</span> ${event.date}</li>
                    <li><span>Description:</span> ${event.description}</li>
                    <li><span>Category:</span> ${event.category}</li>
                    <li><span>Place:</span> ${event.place}</li>
                    <li><span>Capacity:</span> ${event.capacity}</li>
                    <li><span>${event.assistance ? "Assistance" : "Estimate"}: </span>${event.assistance ? event.assistance : event.estimate}</li>
                    <li><span>Price:</span> $${event.price}</li>
                </ul>
                </div>`

}

 