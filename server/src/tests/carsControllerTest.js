require('sinon-as-promised');

var should = require('should'),
    sinon = require('sinon');

describe('carsController Test', () => {

    var res, carsController;

    class CarSchemaMock {
        constructor(car) {
            this.save = sinon.stub().resolves();
        }
    };

    before(() => {
        carsController = require('../controllers/CarsController');
        res = {
            status: sinon.stub().returns({send: sinon.spy()})
        }

    });

    describe(' createOne test', () => {
        it('should return status 400 if name does not exists in req body', () => {

            var emptyReq = {body: {}};
            carsController(CarSchemaMock).createOne(emptyReq, res);

            res.status.calledWith(400).should.equal(true);
        });

        it('should return status 201 if name exists in req body', () => {

            var req = {body: {name: 'test'}};
            carsController(CarSchemaMock).createOne(req, res);

            res.status.calledWith(201).should.equal(true);
        });
    });
});