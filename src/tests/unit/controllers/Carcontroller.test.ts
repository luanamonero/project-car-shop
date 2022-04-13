import chai from "chai";
import chaiHttp from "chai-http";
import { Response, Request } from "express";
import sinon from "sinon";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import CarController from "../../../controllers/Car";
import { Car, CarSchema } from "../../../interfaces/CarInterface";
import CarService from "../../../services/Car";
import { carPayload, carPayloadBody, errorCreate } from "../services/mock";

chai.use(chaiHttp);
const { expect } = chai;

describe("CarController", () => {
  describe("Teste Car Controller metodo create em caso de sucesso", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    before(() => {
      request.body = carPayloadBody;
      sinon.stub(carService, "create").resolves(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore();
      sinon.restore();
    });

    it("retorna o carro criado", async () => {
      await carController.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });

    it("retorna o carro json", async () => {
      await carController.create(request, response);
      expect((response.json as sinon.SinonStub).calledWith(carPayload)).to.be
        .true;
    });
  });

  describe("Teste Car Controller metodo create rejects", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    before(() => {
      request.body = carPayloadBody;
      sinon.stub(carService, "create").rejects(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore();
      sinon.restore();
    });

    it("retorna o carro criado", async () => {
      await carController.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500))
    });
  });

  describe("Teste Car Controller metodo create em caso de falha com objeto nulo", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    const errors = ControllerErrors;
    before(() => {
      request.body = "";
      sinon.stub(carService, "create").resolves(null);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore();
      sinon.restore();
    });

    it("retorna o status de erro 500", async () => {
      await carController.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
    });

    it("retorna uma mensagem de erro", async () => {
      await carController.create(request, response);
      expect(
        (response.json as sinon.SinonStub).calledWith({
          error: errors.internal,
        })
      ).to.be.true;
    });
  });

  describe("Teste Car Controller metodo create em caso de falha com objeto inválido", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.body = {...carPayload, doorsQty: 0};
      sinon.stub(CarSchema, "safeParse").resolves(errorCreate as never);
      carController = new CarController(carService);
    });

    after(() => {
      sinon.restore()
    });

    it("retorna o status de erro 400", async () => {
      await carController.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400))
    });
  });

  describe("Teste Car Controller metodo read em caso de sucesso", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub()

    before(() => {
      sinon.stub(carService, "read").resolves([carPayload])
      carController = new CarController(carService);
    })

    after(() => {
      (carService.read as sinon.SinonStub).restore()
    })

    it('retorna o carro criado', async () => {
      await carController.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200))
    })
  }) 

  describe("Teste Car Controller metodo read rejects", async () => {
    let carController: CarController;
    let carService = new CarService();
    const request = {} as RequestWithBody<Car | any>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub()

    before(() => {
      sinon.stub(carService, "read").rejects([carPayload])
      carController = new CarController(carService);
    })

    after(() => {
      (carService.read as sinon.SinonStub).restore()
    })

    it('retorna o erro 500', async () => {
      await carController.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500))
    })
  }) 

  describe("Teste Car Controller metodo readOne em caso de sucesso", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      sinon.stub(carService, "readOne").resolves(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.readOne as sinon.SinonStub).restore();
    });

    it("retorna o status 200 pelo Id", async () => {
      await carController.readOne(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200));
    });

    it("retorna o carro json", async () => {
      await carController.readOne(request, response);
      expect((response.json as sinon.SinonStub).calledWith(carPayload));
    });
  });

  describe("Teste Car Controller metodo readOne rejects", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      sinon.stub(carService, "readOne").rejects(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.readOne as sinon.SinonStub).restore();
    });

    it("retorna o status 500", async () => {
      await carController.readOne(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500));
    });
  });

  describe("Teste Car Controller metodo readOne em caso de falha", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: 'aa' };
      sinon.stub(carService, "readOne").resolves(errorCreate as never)
      carController = new CarController(carService);
    })

    after(() => {
      (carService.readOne as sinon.SinonStub).restore()
    })

    it('retorna o status de erro 400', async () => {
      await carController.readOne(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400))
    })

  })

  describe("Teste Car Controller metodo update em caso de sucesso", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      request.body = carPayloadBody;
      sinon.stub(carService, "update").resolves(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.update as sinon.SinonStub).restore();
    });

    it("retorna o status 200 pelo Id", async () => {
      await carController.update(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200));
    });

    it("retorna o carro json", async () => {
      await carController.update(request, response);
      expect((response.json as sinon.SinonStub).calledWith(carPayload));
    });
  });

  describe("Teste Car Controller metodo update rejects", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      request.body = carPayloadBody;
      sinon.stub(carService, "update").rejects(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.update as sinon.SinonStub).restore();
    });

    it("retorna o status 500 pelo Id", async () => {
      await carController.update(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500));
    });
  });

  describe("Teste Car Controller metodo update em caso de falha", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: 'aa' };
      request.body = carPayloadBody;
      sinon.stub(carService, "update").resolves(errorCreate as never)
      carController = new CarController(carService);
    })

    after(() => {
      (carService.update as sinon.SinonStub).restore()
    })

    it('retorna o status de erro 400', async () => {
      await carController.update(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400))
    })

  })

  describe("Teste Car Controller metodo update em caso de falha id", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: '4edd40c86762e0fb12000009' };
      request.body = carPayloadBody;
      sinon.stub(carService, "update").resolves(errorCreate as never)
      carController = new CarController(carService);
    })

    after(() => {
      (carService.update as sinon.SinonStub).restore()
    })

    it('retorna o status de erro 400', async () => {
      await carController.update(request, response);
      expect((response.status as sinon.SinonStub).calledWith(404))
    })
  })

  describe("Teste Car Controller metodo delete em caso de sucesso", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      sinon.stub(carService, "delete").resolves(carPayload);
      carController = new CarController(carService);
    });

    after(() => {
      (carService.delete as sinon.SinonStub).restore();
    });

    it("retorna o status 204 pelo Id", async () => {
      await carController.delete(request, response);
      expect((response.status as sinon.SinonStub).calledWith(204));
    });

    it("retorna o carro json", async () => {
      await carController.delete(request, response);
      expect((response.json as sinon.SinonStub).calledWith(carPayload));
    });
  });

  describe("Teste Car Controller metodo delete em caso de falha", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: 'aa' };
      request.body = carPayloadBody;
      sinon.stub(carService, "delete").resolves(errorCreate as never)
      carController = new CarController(carService);
    })

    after(() => {
      (carService.delete as sinon.SinonStub).restore()
    })

    it('retorna o status de erro 404', async () => {
      await carController.delete(request, response);
      expect((response.status as sinon.SinonStub).calledWith(404))
    })

  })

  describe("Teste Car Controller metodo delete rejects", async () => {
    const request = {} as Request<{ id: string }>;
    let carController: CarController;
    let carService = new CarService();
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    before(() => {
      request.params = { id: carPayload._id };
      request.body = carPayloadBody;
      sinon.stub(carService, "delete").rejects(carPayload)
      carController = new CarController(carService);
    })

    after(() => {
      (carService.delete as sinon.SinonStub).restore()
    })

    it('retorna o status de erro 500', async () => {
      await carController.delete(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500))
    })
  })

  describe("Teste Car Controller route", async () => {
    let carController = new CarController();

    before(() => {
      sinon.stub(carController, "route").resolves("/cars")
    })

    after(() => {
      sinon.restore()
    })

    it('retorna o status de erro 500', async () => {
      const route = carController.route;
      expect(route).to.be.equal('/cars');
    })
  })
});
