//const db = require("./../config/db")

// test api data 
let dummyData = [
    {
        userId: 1,
        name: "test"
    },
    {
        userId: 2,
        name: "test2"
    },
];

const getAllUsers = function () {
    const res = dummyData;
    // console.log(res);
    return res;
}

const getUserById = function (id_) {
    console.log(id_);
    for (const element of dummyData) {
        if (element.userId === Number(id_)) {
            console.log("s");
            console.log(element);
            return element;
        }
    }
}

const createUser = function (data) {
    try {
        dummyData.push(data)
        return
    } catch (error) {
        return error
    }
}

module.exports = { getUserById, getAllUsers, createUser };