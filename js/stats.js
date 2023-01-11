
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

        if (event.assistance * 100 / event.capacity > acc[0].value) {

            acc[0].name = event.name;
            acc[0].value = parseFloat(((event.estimate ?? event.assistance) * 100 / event.capacity).toFixed(2));
        }


        if (event.assistance * 100 / event.capacity < acc[1].value) {

            acc[1].name = event.name;
            acc[1].value = parseFloat(((event.estimate ?? event.assistance) * 100 / event.capacity).toFixed(2));
        }


        if (event.capacity > acc[2].value) {

            acc[2].name = event.name;
            acc[2].value = event.capacity;

        }

        return acc;

    }, [{ name: "", value: -Infinity },
        { name: "", value: Infinity },
        { name: "", value: -Infinity }])

}

//tablesCategories

const fillCategoriesStaticTable = (events, id, isBefore, currentDate) => {

    let filterEvents;

    if (isBefore) filterEvents = events.filter(e => e.date < currentDate)

    else filterEvents = events.filter(e => e.date > currentDate)

    const filterCategoriesData = getCategoriesData(filterEvents)

    const container = document.getElementById(id);

    container.innerHTML += buildTablesCategories(filterCategoriesData)

}

const getCategoriesData = (events) => {

    return events.reduce((acc, event, index, array) => {

            let accId = acc.indexOf(e => e.name === event.category); 

            if(accId >= 0){

                acc[accId].revenues += (event.estimate ?? event.assistance) * event.price;

                acc[accId].assistance += (event.estimate ?? event.assistance) * 100 / event.capacity;

                acc[accId].count += 1;

            } else {

                const element = {
                    name : event.category,
                    revenues: (event.estimate ?? event.assistance) * event.price,
                    assistance : ((event.estimate ?? event.assistance) * 100) / event.capacity,
                    count: 1
                }

                acc.push(element);

            }

            if (index === array.length - 1) {

                for(let ele of acc){

                    ele.assistance = parseFloat((ele.assistance / ele.count).toFixed(2));

                    delete ele.count;
                }

            }

            return acc;

            
    }, [])

}

const buildTablesCategories = (categories) => {

    let template = "";

    for (let category of categories) {

        template += `<tr><td>${category.name}</td>
                        <td>$${category.revenues}</td>
                        <td>${category.assistance}%</td>
                        </tr>`

    }

    return template;

}