let {
    startBikeRideController,
    stopBikeRideController,
    getAllBikeRidesController,
    getAllBikeridesByBikeIdController,
    getAllBikeridesByUserIdController,
    getAllBikesInACityController
} = require('../../../controller/bikeRideController');

let BikeRide = require('../../../services/bikeProgram/bikeRide.js');

jest.mock('../../../services/bikeProgram/bikeRide.js', () => ({
    user: jest.fn(),
    bike: jest.fn(),
    bikeRideModels: jest.fn()
}));

describe('bikeRideController', () => {
    describe('startBikeRide', () => {
        it('should response with status code 201', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            BikeRide.user.mockReturnValueOnce("yes");

            const req = { user: {user_id: 1} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await startBikeRideController(req, res)

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('yes');
        });
    });
});