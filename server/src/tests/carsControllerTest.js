require('sinon-as-promised');

var should = require('should'),
    sinon = require('sinon'),
    mlog = require('mocha-logger');

describe('carsController Test', () => {

    const carsController = require('../controllers/CarsController');

    class CarSchemaMock {
        constructor(newCar) {
            this.name = newCar.name;
            this.save = sinon.stub().resolves();
        }
    }

    var CarSchemaMockConstrSpy, fakeResStatusSend, fakeResStatusJson;

    ///////////////////////////////////////////////////////////////

    before(() => {

        CarSchemaMockConstrSpy = sinon.spy(CarSchemaMock, 'constructor');

        fakeResStatusSend = {
            status: sinon.stub().returns({send: sinon.spy()})
        }

        fakeResStatusJson = {
            status: sinon.stub().returns({json: sinon.spy()})
        }

    });

    afterEach(() => {
        CarSchemaMockConstrSpy.reset();
        fakeResStatusSend.status.reset();
    });

    describe(' createOne test', () => {
        it('should return status 400 if name does not exists in req body', () => {

            let emptyReq = {body: {}};
            carsController(CarSchemaMock).createOne(emptyReq, fakeResStatusSend);

            fakeResStatusSend.status.called.should.equal(true);
            fakeResStatusSend.status.calledWith(400).should.equal(true);

        });

        it('should not call CarSchema contructor if name does not exists in req body', () => {

            let emptyReq = {body: {}};
            carsController(CarSchemaMock).createOne(emptyReq, fakeResStatusSend);

            CarSchemaMockConstrSpy.called.should.equal(false);

        });

        it('should return status 201', () => {

            let req = {body: {name: 'test'}};

            carsController(CarSchemaMock).createOne(req, fakeResStatusJson);

            setTimeout(function () {
                fakeResStatusJson.status.calledWith(201).should.equal(true);
            }, 200);

        });

        it('should call CarSchema contructor', () => {

            let req = {body: {name: 'test'}};

            carsController(CarSchemaMock).createOne(req, fakeResStatusJson);

            setTimeout(function () {
                CarSchemaMockConstrSpy.called.should.equal(true);
            }, 200);

        });
    });
});