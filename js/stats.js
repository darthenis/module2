

const loadData = async (url) => {

    return fetch(url)
            .then(res => res.json())
            .then(res => res)

}


loadData("https://mindhub-xj03.onrender.com/api/amazing")
.then(data => {

    fillTableStaticEvents(data.events, 'staticsEventsContainer')

    fillCategoriesStaticTable(data.events, 'upcomingCategoriesContainer', false, data.currentDate)

    fillCategoriesStaticTable(data.events, 'pastCategoriesContainer', true, data.currentDate)

})

//tableStatic

const fillTableStaticEvents = (events, id) => {

    const threeEvents = getEventStatic(events)

    const container = document.getElementById(id);

    container.innerHTML += buildTable(threeEvents)

}

const buildTable = (events) => {

    return `<td>${events[0].name} ${events[0].value}%</td>
    <td>${events[1].name} ${events[1].value}%</td>
    <td>${events[2].name} ${events[2].value}</td>`

}

const getEventStatic = (events) => {

    return events.reduce((acc, event) => {

        let key = event.assistance ? "assistance" : "estimate";

        if(event[key] * 100 / event.capacity > acc[0].value) {
                
                acc[0].name = event.name;
                acc[0].value = parseFloat((event[key] * 100 / event.capacity).toFixed(2));
        }


        if(event[key]  * 100 / event.capacity < acc[1].value) {
                
                acc[1].name = event.name;
                acc[1].value = parseFloat((event[key] * 100 / event.capacity).toFixed(2));
        }


        if(event.capacity > acc[2].value) {

            acc[2].name = event.name;
            acc[2].value = event.capacity;

        }

        return acc;

    }, [{name: "", value: -Infinity},
        {name: "", value: Infinity},
        {name: "", value: -Infinity}])

}

//tablesCategories

const fillCategoriesStaticTable = (events, id, isBefore, currentDate) => {

    let filterTimeEvents;

    if(isBefore) filterTimeEvents = events.filter(e => e.date < currentDate)

    else filterTimeEvents = events.filter(e => e.date > currentDate)
  
    const filterCategoriesData = getCategoriesData(filterTimeEvents)
    
    const container = document.getElementById(id);

    container.innerHTML += buildTablesCategories(filterCategoriesData)

}

const getCategoriesData = (events) => {

    let filterCategories = events.map(e => e.category);

    let noRepeat = new Set(filterCategories);

    let categories = Array.from(noRepeat);

    return categories.map(category => {

            let categoryEvents = events.filter(e => e.category === category);

            let capacity = 0;

            return categoryEvents.reduce((acc, event, index) => {

                let key = event.estimate ? "estimate" : "assistance";

                acc.revenues += event[key] * event.price;

                acc.assistance += event[key];

                capacity += event.capacity;

                if(index === categoryEvents.length - 1) {
                    
                    acc.assistance = parseFloat((acc.assistance * 100 / capacity).toFixed(2));
                }

                return acc;

            }, {name : category, 
                revenues: 0, 
                assistance : 0, 
                })

    })


}

const buildTablesCategories = (categories) => {

    let template = "";

    for(let category of categories){

        template +=  `<tr><td>${category.name}</td>
                        <td>$${category.revenues}</td>
                        <td>${category.assistance}%</td>
                        </tr>`

    }

    return template;

}