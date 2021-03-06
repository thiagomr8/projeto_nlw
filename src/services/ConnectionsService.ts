import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  admin_id?: string;
  id?: string;
  socket_id: string;
  user_id: string;
}
class ConnectionsService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);
    return connection;
  }

  async findByUserID(user_id: string) {
    const connection = await this.connectionRepository.findOne({
      user_id,
    });
    return connection;
  }
}

export { ConnectionsService };
