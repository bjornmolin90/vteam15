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
};

export default fetching;