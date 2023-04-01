let {
    getAllUsersController,
    getUserByIdController
} = require('../../../controller/userController');

let userService = require('../../../services/userService');

jest.mock('../../../services/userService', () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn()
}));

describe('userController', () => {
    describe('getAllBikeController', () => {
        it('should response with status code 201', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            userService.getAllUsers.mockReturnValueOnce("yes");

            const req = { body: 'Test' };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await getAllUsersController(req, res)

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('yes');
        });
        
    });

    describe('getUserByIdController', () => {
        it('should response with status code 201', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            userService.getUserById.mockReturnValueOnce("yes");

            const req = {params:{id:"1"}};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await getUserByIdController(req, res)

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('yes');
        });

    });


});