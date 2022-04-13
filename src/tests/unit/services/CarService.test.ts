import { expect } from "chai";
import sinon from "sinon";
import { Car, CarSchema } from "../../../interfaces/CarInterface";
import CarModel from "../../../models/Car";
import Service from "../../../services";

import CarService from "../../../services/Car";
import { carPayload, carPayloadBody, errorCreate, newCarPayload } from "./mock";

describe("CarService", () => {
  let carService = new CarService();
  describe("Teste Car Service metodo create", async () => {
    before(() => {
      sinon.stub(carService.model, "create").resolves(carPayload);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna o carro criado", async () => {
      const cars = (await carService.create(carPayload)) as Car;
      expect(cars).to.be.eq(carPayload);
    });
  });

  describe('Teste Service metodo create', () => {
    let carModel = new CarModel;
    let carService = new Service(carModel);
    before(async () => {
      sinon.stub(carService.model, 'create').resolves(carPayloadBody);
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carService.create(carPayload);
      expect(response).to.be.an('object');
    })
  });

  describe("Teste Car Service metodo create em caso de falha com objeto inválido", async () => {
    
    before(() => {
      sinon.stub(CarSchema, "safeParse").returns(errorCreate as never); 
    })

    after(() => {
      sinon.restore()
    })

    it('retorna um erro', async () => {
      const cars = (await carService.create({...carPayload, doorsQty: 0})) as Car;
      expect(cars).to.be.an('object');
      expect(cars).to.have.property('error');
    })
  })

  describe("Teste Car Service metodo read", async () => {
    let carService = new CarService();
    before(() => {
      sinon.stub(carService.model, "read").resolves([carPayload]);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna a lista de carro", async () => {
      const cars = (await carService.read()) as Car[];
      expect(cars[0]).to.be.eq(carPayload);
    });
  });

  describe("Teste Car Service metodo readOne", async () => {
    let carService = new CarService();
    before(() => {
      sinon.stub(carService.model, "readOne").resolves(carPayload);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna o carro pelo Id", async () => {
      const cars = (await carService.readOne(
        "4edd40c86762e0fb12000003"
      )) as Car;
      expect(cars).to.be.eq(carPayload);
    });
  });

  describe("Teste Car Service metodo uptade", async () => {
    let carService = new CarService();
    before(() => {
      sinon.stub(carService.model, "update").resolves(newCarPayload);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna o carro atualizado", async () => {
      const cars = (await carService.update(
        "4edd40c86762e0fb12000003",
        newCarPayload
      )) as Car;
      expect(cars).to.be.eq(newCarPayload);
    });
  });

  describe('Teste Service metodo update', () => {
    let carModel = new CarModel;
    let carService = new Service(carModel);
    before(async () => {
      sinon.stub(carService.model, 'update').resolves(carPayloadBody);
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carService.update(carPayload._id, carPayload);
      expect(response).to.be.an('object');
    })
  });

  describe("Teste Car Service metodo update em caso de falha com objeto inválido", async () => {
    
    before(() => {
      sinon.stub(CarSchema, "safeParse").returns(errorCreate as never); 
    })

    after(() => {
      sinon.restore()
    })

    it('retorna um erro', async () => {
      const cars = (await carService.update("4edd40c86762e0fb12000003", {...carPayload, doorsQty: 0})) as Car;
      expect(cars).to.be.an('object');
      expect(cars).to.have.property('error');
    })
  })

  describe("Teste Car Service metodo delte", async () => {
    let carService = new CarService();
    before(() => {
      sinon.stub(carService.model, "delete").resolves(carPayload);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna o carro atualizado", async () => {
      const cars = (await carService.delete("4edd40c86762e0fb12000003")) as Car;
      expect(cars).to.be.eq(carPayload);
    });
  });
});

