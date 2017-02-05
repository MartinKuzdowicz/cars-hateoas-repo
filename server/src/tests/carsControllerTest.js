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

    var CarSchemaMockConstrSpy, fakeRes, fakeResStatusJson;

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

    afterEach(() => {
        CarSchemaMockConstrSpy.reset();
        fakeRes.status.reset();

    });

    describe(' createOne test', () => {
        it('should not return status 500 and res.status should be only called once', (done) => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);

            setTimeout(function () {
                fakeRes.status.calledOnce.should.equal(true);
                fakeRes.status.calledWith(500).should.equal(false);
                done();
            }, 50);
        });

        it('should run res.status only once', (done) => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledOnce.should.equal(true);
                done();
            }, 50);
        });

        it('should not call res.status.json if req.body is empty', (done) => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status().json.called.should.equal(false);
                done();
            }, 50);
        });

        it('should return status 400 if name does not exists in req body', () => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            fakeRes.status.calledWith(400).should.equal(true);
        });


        it('should not call CarSchema constructor if name does not exists in req body', () => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            CarSchemaMockConstrSpy.called.should.equal(false);
            fakeRes.status.calledWith(500).should.equal(false);
        });

        it('should call res.status once if status 400', () => {
            let fakeReq = {body: {}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            fakeRes.status.called.should.equal(true);
        });

        it('should return status 201', (done) => {
            let fakeReq = {body: {name: 'test'}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(201).should.equal(true);
                done();
            }, 50);
        });

        it('should call CarSchema constructor', () => {
            let fakeReq = {body: {name: 'test'}};
            carsController(FakeCarSchema).createOne(fakeReq, fakeRes);
            CarSchemaMockConstrSpy.called.should.equal(true);
        });

    });

    describe(' getAll test', () => {

        it('res should return status 200', (done) => {
            var fakeReq = {query: {type: 'test'}};
            var FakeCarSchemaForFindFn = {
                find: sinon.stub().resolves()
            }

            carsController(FakeCarSchemaForFindFn).getAll(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(200).should.equal(true);
                done();
            }, 50);
        });
    });

    describe(' getOne test', () => {

        it('res should return status 200', (done) => {
            var fakeReq = {params: {car_id: 'osdjf90'}};
            var FakeCarSchemaForFindOneFn = {
                findById: sinon.stub().resolves()
            }

            carsController(FakeCarSchemaForFindOneFn).getOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(200).should.equal(true);
                done();
            }, 50);
        });

        it('res should return status 400 if req params is empty', (done) => {
            var fakeReq = {params: {}};
            var FakeCarSchemaForFindOneFn = {
                findById: sinon.stub().resolves()
            }

            carsController(FakeCarSchemaForFindOneFn).getOne(fakeReq, fakeRes);
            setTimeout(function () {
                fakeRes.status.calledWith(400).should.equal(true);
                done();
            }, 50);
        });
    });
});