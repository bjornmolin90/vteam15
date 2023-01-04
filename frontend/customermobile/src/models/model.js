const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337`);
        const result = await response.json();
        console.log(result)
        
        return result[0]
    }
};

export default fetching;