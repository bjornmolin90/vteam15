const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337/api/v01/user`, {
            credentials: 'include'
        });
        const result = await response.json();
        console.log(result)

        return result[0]
    },

    bikes: async function bikes() {
        const response = await fetch(`http://localhost:1337/api/v01/bike`);
        const result = await response.json();
        console.log(result)

        return result
    }

    // oneBike: async function oneBike() {
    //     const response = await fetch(`http://localhost:1337/api/v01/bike/{id}`);
    //     const result = await response.json();
    //     console.log(result);

    //     return result
    // },

    // rentBike: async function rentBike(bikeId) {
    //     const data = {
    //         bike_id: bikeId
    //     };
    //     const response = await fetch(`http://localhost:1337/api/v01/bikeride/`, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     });
    //     const result = await response.json();
    //     console.log(result)

    //     return result
    // },

    // returnBike: async function returnBike(bikeId) {
    //     const data = {
    //         bike_id: bikeId,
    //         end_time: new Date()
    //     }
    //     const response = await fetch(`http://localhost:1337/api/v01/bikeride/stop`, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     });
    //     const result = await response.json();
    //     console.log(result)

    //     return result
    // }
};

export default fetching;