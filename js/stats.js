

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

    return categories.map(c => {

            let revenues = events.reduce((acc, event) => {
                
                let key = event.estimate ? "estimate" : "assistance"

                if(event.category === c) {
                    
                        acc += event[key] * event.price;
                    
                }

                return acc;
                
                }, 0)

            let assisCapacity = events.reduce((acc, event) => {

                let key = event.estimate ? "estimate" : "assistance";
                
                if(event.category === c) {
                        
                    acc.assistance += event[key];

                    acc.capacity += event.capacity;
                     
                }
 
                    return acc;
                 
                 }, {assistance : 0, capacity: 0})


            let assistance = parseFloat((assisCapacity.assistance * 100 / assisCapacity.capacity).toFixed(2));

            return { name : c, revenues: revenues, assistance : assistance}

    })

}

const buildTablesCategories = (categories) => {

    let template = "";

    for(let category of categories){

        template +=  `<tr><td>${category.name}</td>
                        <td>${category.revenues}</td>
                        <td>${category.assistance}%</td>
                        </tr>`

    }

    return template;

}