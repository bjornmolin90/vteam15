const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337`);
        const result = await response.json();
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
};

export default fetching;
