const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337/api/v01/user`, {
            credentials: 'include'
        });
        const result = await response.json();
<<<<<<< HEAD
        //console.log(result);

        return result[0];
    },
    customers: async function customers() {
        const response = await fetch(`http://localhost:1337/api/v01/user/`);
        const result = await response.json();
        // console.log(result);
        try {
            return result[0].user_id;
        } catch (error) {
            throw `Constellation with id of ${error} could not be found.`;
        }
    },
=======
        console.log(result)

        return result[0]
    }
>>>>>>> c75fb1c5c4f9d9f65bdd46cc8b4fc4317b457c38
};

export default fetching;
