import { RsaService } from "../../../../../libs/keyUtils";
import { UUIDHelper } from "../helpers/uuids";
const uuidHelper = new UUIDHelper();
const rsaService = new RsaService();
import { PRIVATE_SERVER_KEY } from "./../../../../../libs/key"; 
import { RoomModel } from "../../schemas/room.model";
import { PersonModel } from "../../schemas/person.model";
import { Person, Room } from "../../../../../libs/models";
export class RoomController {

    getById = async ({ params }: any, res, next): Promise<void> => {
        try {
          const roomPromise = await RoomModel.findById(params.id);
          const room = new Room(roomPromise._id,roomPromise.streamer,roomPromise.title,roomPromise.isLive,roomPromise.viewers);
          const signature = rsaService.encrypt({ room: room },PRIVATE_SERVER_KEY);
          res.status(200).send({ signature: signature, room: room });
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
          const signature = rsaService.encrypt({ rooms: rooms}, PRIVATE_SERVER_KEY);
          res.status(200).send({ signature: signature, rooms: rooms });
        } catch (err) {
          next(err);
        }
      };

      update = async ({ body, params }: any, res, next): Promise<void> => {
        try {
          const personPromise = await PersonModel.findById(body.streamer._id);
          const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);
  
          const decryptedMessage = rsaService.decrypt(body.signature,person.publicKey,{room : body.room});;
          const uuidCheck = await uuidHelper.check(decryptedMessage);
          if (decryptedMessage && uuidCheck) {
            await RoomModel.findByIdAndUpdate({ _id: params.id }, body.room);
            const signature = rsaService.encrypt({ room: body.room },PRIVATE_SERVER_KEY);
            res.status(200).send({ signature: signature, room: body.room });
          } else {
            res.status(418).send({ Message: "Object not integer"});
          }
        } catch (err) {
          next(err);
        }
      };
}
