import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeyamaObject, ObjectDocument } from './schemas/object.schema';
import { CreateObjectDto } from './dto/create-object.dto';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(HeyamaObject.name)
    private objectModel: Model<ObjectDocument>,
    @Inject(WebSocketGateway) private wsGateway: WebSocketGateway,
  ) {}

  async create(createObjectDto: CreateObjectDto, file: Express.Multer.File) {
    const imageData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const createdObject = new this.objectModel({
      ...createObjectDto,
      imageData,
    });

    const savedObject = await createdObject.save();
    this.wsGateway.broadcastObjectCreated(savedObject);
    return savedObject;
  }

  async findAll() {
    return this.objectModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const object = await this.objectModel.findById(id).exec();
    if (!object) {
      throw new NotFoundException(`Object with ID ${id} not found`);
    }
    return object;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.objectModel.findByIdAndDelete(id).exec();
    this.wsGateway.broadcastObjectDeleted(id);
    return { message: 'Object deleted successfully', id };
  }
}
