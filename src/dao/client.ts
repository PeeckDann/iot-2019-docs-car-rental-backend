import models from '../models';
// import CSVReader from '../csvUtils/csvReader';

export default class ClientDAO {
  public async getClientById(clientId) {
    return await models.Client.findOne({
      where: { id: clientId },
      raw: true
    });
  }

  public async getClients() {
    return await models.Client.findAll({ raw: true });
  }

  public async createClient(newClient) {
    await models.Client.create(newClient);
  }

  public async createClientsFromCSV() {
    // await models.Client.bulkCreate(new CSVReader().getParsedData('client'));
  }

  public async updateClient(clientId, updatedClient) {
    await models.Client.update(updatedClient, { where: { id: clientId } });
  }

  public async deleteClient(clientId) {
    await models.Client.destroy({ where: { id: clientId } });
  }
}
