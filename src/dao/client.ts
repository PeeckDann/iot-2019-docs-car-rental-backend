import models from '../models';
import Client from '../models/client';
// import CSVReader from '../csvUtils/csvReader';

export default class ClientDAO {
  public async getClientById(clientId): Promise<Client> {
    return await models.Client.findOne({
      where: { id: clientId },
      raw: true
    });
  }

  public async getClientByEmail(email): Promise<Client> {
    return await models.Client.findOne({
      where: { email },
      raw: true
    });
  }

  public async getClients(): Promise<Client[]> {
    return await models.Client.findAll({ raw: true });
  }

  public async createClient(newClient): Promise<void> {
    await models.Client.create(newClient);
  }

  public async createAndGetClient(newClient): Promise<Client> {
    return await models.Client.create(newClient);
  }

  public async createClientsFromCSV(): Promise<void> {
    // await models.Client.bulkCreate(new CSVReader().getParsedData('client'));
  }

  public async updateClient(clientId, updatedClient): Promise<void> {
    await models.Client.update(updatedClient, { where: { id: clientId } });
  }

  public async deleteClient(clientId): Promise<void> {
    await models.Client.destroy({ where: { id: clientId } });
  }
}
