import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ClientDAO from '../dao/client';
import { handleEndpointError, CustomError } from '../utils/errorHandler';

const authConfig = config.get('authConfig');

export default class AuthController {
  private clientDAO: ClientDAO;

  constructor() {
    this.clientDAO = new ClientDAO();
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      let client = await this.clientDAO.getClientByEmail(email);
      if (!client) {
        client = await this.clientDAO.createAndGetClient({ email, password });
      } else {
        this.verifyClient(client, password);
      }

      const token = jwt.sign({ id: client.id, email, password }, authConfig.secret, { expiresIn: '1d' });
      res.send({ token });
    } catch (e) {
      handleEndpointError(e, res, 401);
    }
  }

  private verifyClient(client, password) {
    if (client.password !== password) {
      throw new CustomError('Wrong credentials!');
    }
  }
}
