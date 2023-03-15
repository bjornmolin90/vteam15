let {
    createBikeController,
    getBikeController,
    getAllBikesController,
    deleteAllBikesController,
    deleteBikeByIdController,
    getAllBikesInACityController
} = require('../../../controller/bikeController');

let bikeService = require('../../../services/bikeService');

jest.mock('../../../services/bikeService', () => ({
    createBike: jest.fn(),
    getBikeById: jest.fn(),
    getAllBikes: jest.fn(),
    deleteAllBikes: jest.fn(),
    deleteBikeById: jest.fn(),
    getAllBikesInACity: jest.fn(),
}));

describe('bikeController', () => {
    describe('createBikeController', () => {
        it('should response with status code 201', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            bikeService.createBike.mockReturnValueOnce("yes");

            const req = { body: 'apa' };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await createBikeController(req, res)

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('yes');
        });

        it('should response with status code 500', async () => {
            // Definiera en mock funktion för createBike som returnerar "Yes"
            bikeService.createBike.mockImplementationOnce(() => { throw new Error() });

            const req = { body: 'apa' };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Anropa createBikeController och använd expect för att testa att det returnerade värdet är "Yes"
            await createBikeController(req, res)

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(Error());
        });
    });
    describe('getBikeController', () => {
        it('should return a bike by id', async () => {
            const mockBike = {
                id: '123',
                location: 'TestCity'
            };
            bikeService.getBikeById.mockReturnValueOnce(mockBike);

            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getBikeController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBike);
        });
        it('should respond with 500 if an error occurs', async () => {
            bikeService.getBikeById.mockImplementationOnce(() => { throw new Error() });

            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getBikeController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(Error());
        });
    });

    describe('getAllBikesController', () => {
        it('should return all bikes', async () => {
            const mockBikes = [{ id: '123', location: 'TestCity2', }];
            bikeService.getAllBikes.mockReturnValueOnce(mockBikes);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getAllBikesController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBikes);
        });

        it('should respond with 500 if an error occurs', async () => {
            bikeService.getAllBikes.mockImplementationOnce(() => { throw new Error() });

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getAllBikesController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(Error());
        });
    });
});