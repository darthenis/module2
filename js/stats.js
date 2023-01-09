

const loadDataEvents = async (url) => {

    return fetch(url)
            .then(res => res.json())
            .then(res => res.events)

}


loadDataEvents("https://mindhub-xj03.onrender.com/api/amazing")
.then(events => {

        console.log('events: ', events)


})

