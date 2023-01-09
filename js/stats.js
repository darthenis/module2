

const loadDataEvents = async (url) => {

    return fetch(url)
            .then(res => res.json())
            .then(res => res.events)

}


loadDataEvents("https://mindhub-xj03.onrender.com/api/amazing")
.then(events => {

    fillTableStaticEvents(events, 'staticsEventsContainer')

})

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

        if(event.assistance){

            if(event.assistance * 100 / event.capacity > acc[0].value) {
                
                acc[0].name = event.name;
                acc[0].value = parseFloat((event.assistance*100/event.capacity).toFixed(2));
            }


            if(event.assistance * 100 / event.capacity < acc[1].value) {
                
                acc[1].name = event.name;
                acc[1].value = parseFloat((event.assistance*100/event.capacity).toFixed(2));
            }


        }


        if(event.estimate){

            if(event.estimate * 100 / event.capacity > acc[0].value) {
                
                acc[0].name = event.name;
                acc[0].value = parseFloat((event.estimate * 100 / event.capacity).toFixed(2));
            }


            if(event.estimate * 100 / event.capacity < acc[1].value) {
                
                acc[1].name = event.name;
                acc[1].value = parseFloat((event.estimate * 100 / event.capacity).toFixed(2));
            }


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