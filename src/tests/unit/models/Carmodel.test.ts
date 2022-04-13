import { expect } from 'chai';
import CarModel from '../../../models/Car';
import sinon from 'sinon';
import { carPayload, carPayloadBody } from '../services/mock';


describe('Car Model', () => {
  describe('Teste Car Model metodo create em caso de sucesso', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon.stub(carModel.model, 'create').resolves(carPayload)
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carModel.model.create(carPayloadBody);
      expect(response).to.be.an('object');
    })
  });

  describe('Teste Car Model metodo findOne em caso de sucesso', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon.stub(carModel.model, 'findOne').resolves(carPayload as never);
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carModel.readOne("4edd40c86762e0fb12000003");      
      expect(response).to.be.an('object');
    })
  });

  describe('Teste Car Controller metodo findOneAndUpdate em caso de sucesso', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon.stub(carModel.model, 'findOneAndUpdate').resolves(carPayload as never);
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carModel.update("4edd40c86762e0fb12000003", carPayload);
      expect(response).to.be.an('object');
    })
  });

  describe('Teste Car Controller metodo findByIdAndDelete em caso de sucesso', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carPayload as never);
    });
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await carModel.delete("4edd40c86762e0fb12000003");
      expect(response).to.be.an('object');
    })
  });
});