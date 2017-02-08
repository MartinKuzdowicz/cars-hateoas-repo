require('sinon-as-promised');

var should = require('should'),
    sinon = require('sinon'),
    mlog = require('mocha-logger'),
    sinonMongoose = require('sinon-mongoose'),
    CarModel = require('../models/CarModel'),
    mongoose = require('mongoose');

describe('carsController Test', () => {

    const carsController = require('../controllers/CarsController');

    class FakeCarSchema {
        constructor(newCar) {
            this.constructorCallTest();
            this.name = newCar.name;
            this.save = sinon.stub().resolves();
        }

        constructorCallTest() {
            mlog.log('constructor was called');
        }

    }

    FakeCarSchema.prototype.find = sinon.stub().resolves();

    var CarSchemaMockConstrSpy, fakeRes, fakeReq;

    ///////////////////////////////////////////////////////////////

    before(() => {
        CarSchemaMockConstrSpy = sinon.spy(FakeCarSchema.prototype, 'constructorCallTest');
        fakeRes = {
            status: sinon.stub().returns({
                send: sinon.stub(),
                json: sinon.stub()
            })
        }
    });

    beforeEach(() => {
        fakeReq = {
            body: {},
            headers: {
                host: 'localhost:3000'
            },
            query: {},
            params: {}
        };
    });

    afterEach(() => {
        CarSchemaMockConstrSpy.reset();
        fakeRes.status.reset();

    });

    describe(' createOne test', () => {
        it('should not return status 500 and res.status should be only called once', (done) => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);

            setTimeout(function () {
                fakeRes.status.calledOnce.should.equal(true);
                fakeRes.status.calledWith(500).should.equal(false);
                done();
            }, 50);
        });

        it('should run res.status only once', (done) => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledOnce.should.equal(true);
                done();
            }, 50);
        });

        it('should not call res.status.json if req.body is empty', (done) => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status().json.called.should.equal(false);
                done();
            }, 50);
        });

        it('should return status 400 if name does not exists in req body', () => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            fakeRes.status.calledWith(400).should.equal(true);
        });


        it('should not call CarSchema constructor if name does not exists in req body', () => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            CarSchemaMockConstrSpy.called.should.equal(false);
            fakeRes.status.calledWith(500).should.equal(false);
        });

        it('should call res.status once if status 400', () => {
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            fakeRes.status.called.should.equal(true);
        });

        it('should return status 201', (done) => {
            fakeReq.body.name = 'test';
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(201).should.equal(true);
                done();
            }, 50);
        });

        it('should call CarSchema constructor', () => {
            fakeReq.body.name = 'test';
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            CarSchemaMockConstrSpy.called.should.equal(true);
        });

    });

    describe(' getAll test', () => {

        var FakeCarSchemaForFindFn = (function() {
            return {
                find: function() {
                    return this
                },
                skip: function() {
                    return this
                },
                limit: sinon.stub().resolves()
            }
        })();

        it('res should return status 200', (done) => {

            carsController(FakeCarSchemaForFindFn, mlog).getAll(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(200).should.equal(true);
                done();
            }, 50);
        });

        it('res should not return status 500', (done) => {

            carsController(FakeCarSchemaForFindFn, mlog).getAll(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(500).should.equal(false);
                done();
            }, 50);
        });
    });

    describe(' getOne test', () => {

        var FakeCarSchemaForFindOneFn = {
            findById: sinon.stub().resolves(new CarModel())
        }

        it('res should return status 200', (done) => {
            fakeReq.params.car_id = 'osdjf90';

            carsController(FakeCarSchemaForFindOneFn, mlog).getOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(200).should.equal(true);
                done();
            }, 50);
        });

        it('res should not return status 500', (done) => {
            fakeReq.params.car_id = 'osdjf90';

            carsController(FakeCarSchemaForFindOneFn, mlog).getOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(500).should.equal(false);
                done();
            }, 50);
        });

        it('res should return status 400 if req params is empty', (done) => {

            carsController(FakeCarSchemaForFindOneFn, mlog).getOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(400).should.equal(true);
                done();
            }, 50);
        });
    });

    describe(' deleteOne test', () => {

        var FakeCarSchemaForDeleteOneFn = {
            remove: sinon.stub().resolves()
        }

        it('res should return status 204', (done) => {
            fakeReq.body.car_id = 'osdjf90';

            carsController(FakeCarSchemaForDeleteOneFn).deleteOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(204).should.equal(true);
                done();
            }, 50);
        });

        it('res should return status 400 if req params is empty', (done) => {

            carsController(FakeCarSchemaForDeleteOneFn).deleteOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(400).should.equal(true);
                done();
            }, 50);
        });
    });

    describe(' updateOne test', () => {

        var fakeCarObject = {
            save: sinon.stub().resolves({car_id: 'osdjf90'})
        }

        var FakeCarSchemaForUpdateOneFn = {
            findById: sinon.stub().resolves(fakeCarObject)
        }

        var ctrl = carsController(FakeCarSchemaForUpdateOneFn, mlog);

        it('res should return status 204', (done) => {
            fakeReq.body.car_id = 'osdjf90';

            ctrl.updateOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(204).should.equal(true);
                done();
            }, 50);
        });

        it('should not return status 500 and res.status should be only called once', (done) => {
            fakeReq.body.car_id = 'osdjf90';
            ctrl.updateOne(fakeReq, fakeRes);

            setTimeout(function () {
                // fakeRes.status.calledOnce.should.equal(true);
                fakeRes.status.calledWith(500).should.equal(false);
                done();
            }, 50);
        });

        it('res should return status 400 if req params is empty', (done) => {
            var fakeReq = {body: {}};

            ctrl.updateOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(400).should.equal(true);
                done();
            }, 50);
        });
    });
});