


fetch("./assets/data/data.json", {
    method : "GET"
}) .then(data => data.json())
    .then(data => {

        console.log("data: ", data)

    })