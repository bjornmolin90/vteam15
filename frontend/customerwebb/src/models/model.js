const fetching = {
    fetchResult: async function fetchResult() {
        const response = await fetch(`http://localhost:1337`);
        const result = await response.json();

        return result[0];
    },

    customers: async function customers() {
        const response = await fetch(`http://localhost:1337/api/v01/user`, {
            credentials: "include",
        });
        const result = await response.json();

        return result;
    },

    accounts: async function accounts() {
        const response = await fetch(`http://localhost:1337/api/v01/payment`, {
            credentials: "include",
        });
        const result = await response.json();

        return result;
    },
    addAccount: async function addAccount(cardDetails) {
        const response = await fetch(`http://localhost:1337/api/v01/payment/add/account`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(cardDetails),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();
        console.log(result);

        return result;
    },

    addBalanceToAccount: async function addBalanceToAccount(balanceAmount) {
        const response = await fetch(`http://localhost:1337/api/v01/payment`, {
            credentials: "include",
            method: "PUT",
            body: JSON.stringify(balanceAmount),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response;
        console.log(result.status);

        return result.status;
    },

    monthlyPayment: async function monthlyPayment(yesno) {
        const response = await fetch(`http://localhost:1337/api/v01/payment/monthly-payment`, {
            credentials: "include",
            method: "PUT",
            body: JSON.stringify(yesno),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response;
        console.log(result.status);

        return result;
    },
};
//test git
export default fetching;
