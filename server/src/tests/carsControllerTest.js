var should = require('should'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised');

describe('carsController Test', () => {

    var req, res, carsController;

    before(() => {
        carsController = require('../controllers/CarsController');
        res = {
            status: sinon.stub().returns({send: sinon.spy()})
        }
    });

    describe(' createOne test', () => {
        it('should return status 400 if name does not exists in req body', () => {
            var CarSchemaMock = function (car) {
                this.save = sinon.stub().resolves();
            };
            req = {body: {}};
            carsController(CarSchemaMock).createOne(req, res);
            res.status.calledWith(400).should.equal(true);
        });

        it('should return status 201 if name exists in req body', () => {
            var CarSchemaMock = function (car) {
                this.save = sinon.stub().resolves();
            };

            req = {body: {name: 'test'}};
            carsController(CarSchemaMock).createOne(req, res);
            res.status.calledWith(201).should.equal(true);
        });
    });
});