// test api data 
let dummyData = [
   { 
        bikeId:1,
        power:100
    },
    {
        bikeId: 2,
        power: 100
    }
];

const getAllBikes = function () {   
    const res = dummyData;

    return res;
}

const getBikeById = async function (id_) {
    
    for (const element of dummyData) {
        if (element.bikeId === Number(id_)) {
            return element;
        }
    }
}

const createBike = function (data) {
    try {
        dummyData.push(data)
        return
    } catch (error) {
        return error
    }
}

module.exports = { getBikeById, createBike, getAllBikes };