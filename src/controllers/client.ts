import { Request, Response } from 'express';
import { handleEndpointError } from '../utils/errorHandler';
import ClientDAO from '../dao/client';

export default class ClientController {
  private clientDAO: ClientDAO;

  constructor() {
    this.clientDAO = new ClientDAO();
  }

  public async getClientById(req: Request, res: Response) {
    try {
      const { clientId } = req.params;
      const client = await this.clientDAO.getClientById(clientId);
      res.send(client);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getClients(req: Request, res: Response) {
    try {
      const clients = await this.clientDAO.getClients();
      res.send(clients);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createClient(req: Request, res: Response) {
    try {
      const newClient = req.body;
      await this.clientDAO.createClient(newClient);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createClientsFromCSV(req: Request, res: Response) {
    try {
      await this.clientDAO.createClientsFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async updateClient(req: Request, res: Response) {
    try {
      const { clientId } = req.params;
      const updatedClient = req.body;
      await this.clientDAO.updateClient(clientId, updatedClient);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async deleteClient(req: Request, res: Response) {
    try {
      const { clientId } = req.params;
      await this.clientDAO.deleteClient(clientId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }
}
