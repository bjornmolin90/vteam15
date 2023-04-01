let {
    getAccountController,
    addAccountController,
    addMoneyToAccountController
} = require('../../../controller/paymentController');

let paymentService = require('../../../services/paymentService');

jest.mock('../../../services/paymentService', () => ({
    getAccount: jest.fn(),
    addAccount: jest.fn()
}));

describe('paymentController', () => {
    describe('getAccountController', () => {
        it('should response with status code 200', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            paymentService.getAccount.mockReturnValueOnce("success");
          
            const req = { user:{ user_id:'2'} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await getAccountController(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('success');
        });
        
    });

    describe('addAccountController', () => {
        it('should response with status code 201', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            paymentService.addAccount.mockReturnValueOnce("success");

            const req = { body: { account: "1" }, user :{ user_id:"2"} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await addAccountController(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('success');
        });

    });


});