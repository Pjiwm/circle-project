import { RsaService } from "../../../../../libs/keyUtils";
const rsaService = new RsaService();

import { RoomModel } from "../../schemas/room.model";
import { Person, Room } from "../../../../../libs/models";
export class RoomController {

    getById = async ({ params }: any, res, next): Promise<void> => {
        try {
          const roomPromise = await RoomModel.findById(params.id);
          const room = new Room(roomPromise._id,roomPromise.streamer,roomPromise.title,roomPromise.isLive,roomPromise.viewers);
          const signature = rsaService.encrypt({ room: room },process.env.PRIVATEKEY_SERVER);
          res.status(201).send({ signature: signature, room: room });
        } catch (err) {
          next(err);
        }
      };
      
      getAll = async (req, res, next): Promise<void> => {
        const rooms = [];
        try {
          const roomsPromise = await RoomModel.find();
          for(const roomPromise of roomsPromise) {
              rooms.push(new Room(roomPromise._id,roomPromise.streamer,roomPromise.title,roomPromise.isLive,roomPromise.viewers));
          };
          const signature = rsaService.encrypt({ rooms: rooms },process.env.PRIVATEKEY_SERVER);
          res.status(201).send({ signature: signature, rooms: rooms });
        } catch (err) {
          next(err);
        }
      };
}
