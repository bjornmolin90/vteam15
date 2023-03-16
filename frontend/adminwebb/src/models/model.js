const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337`);
        const result = await response.json();
        console.log(result)

        return result[0]
    },

    customers: async function customers() {
        const response = await fetch(`http://localhost:1337/api/v01/user`, {
            credentials: 'include'
        });
        const result = await response.json();
        console.log(result)

        return result
    },

    bikes: async function bikes() {
        const response = await fetch(`http://localhost:1337/api/v01/bike`);
        const result = await response.json();
        console.log(result)

        return result
    },

    parking: async function bikes() {
        const response = await fetch(`http://localhost:1337/api/v01/locations/parkingzones`);
        const result = await response.json();
        console.log(result)

        return result
    },

    chargers: async function bikes() {
        const response = await fetch(`http://localhost:1337/api/v01/locations/charger`);
        const result = await response.json();
        console.log(result)

        return result
    },

    rides: async function rides(id) {
        const response = await fetch(`http://localhost:1337/api/v01/bikeride/user/${id}`);
        const result = await response.json();
        console.log(result)

        return result
    },

    moveBike: async function moveBike(id, coor) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bike_id: id, coordinate: coor})
        };
        console.log(requestOptions.body)
        console.log(id)
        const response = await fetch(`http://localhost:1337/api/v01/bike`, requestOptions);
        const result = await response.json();
        console.log(result)
        window.location.reload()

        return result
    },
    
    deleteUser: async function deleteUser(id) {
        const response = await fetch(`http://localhost:1337/api/v01/user/${id}`);
        const result = await response.json();
        console.log(result)

        return result
    },
};

export default fetching;