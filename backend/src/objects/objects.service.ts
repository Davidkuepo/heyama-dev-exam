import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeyamaObject } from './object.entity';
import { CreateObjectDto } from './dto/create-object.dto';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(HeyamaObject)
    private objectRepository: Repository<HeyamaObject>,
    @Inject(WebSocketGateway) private wsGateway: WebSocketGateway,
  ) {}

  async create(
    createObjectDto: CreateObjectDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    const imageData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const object = this.objectRepository.create({
      ...createObjectDto,
      imageData,
      userId,
    });

    const savedObject = await this.objectRepository.save(object);
    this.wsGateway.broadcastObjectCreated(savedObject);
    return savedObject;
  }

  async findAll() {
    return this.objectRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const object = await this.objectRepository.findOne({ where: { id } });
    if (!object) {
      throw new NotFoundException(`Object with ID ${id} not found`);
    }
    return object;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.objectRepository.delete(id);
    this.wsGateway.broadcastObjectDeleted(id);
    return { message: 'Object deleted successfully', id };
  }
}
