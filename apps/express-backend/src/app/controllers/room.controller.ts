import { RsaService } from "../../../../../libs/keyUtils";
const rsaService = new RsaService();
import { PUBLIC_SERVER_KEY, PRIVATE_SERVER_KEY } from "./../../../../../libs/key"; 
import { RoomModel } from "../../schemas/room.model";
import { PersonModel } from "../../schemas/person.model";
import { Person, Room } from "../../../../../libs/models";
export class RoomController {

    getById = async ({ params }: any, res, next): Promise<void> => {
        try {
          const roomPromise = await RoomModel.findById(params.id);
          const room = new Room(roomPromise._id,roomPromise.streamer,roomPromise.title,roomPromise.isLive,roomPromise.viewers);
          const signature = rsaService.encrypt({ room: room },PRIVATE_SERVER_KEY);
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
          const signature = rsaService.encrypt({ rooms: rooms}, PUBLIC_SERVER_KEY);
          res.status(201).send({ signature: signature, rooms: rooms });
        } catch (err) {
          next(err);
        }
      };

      update = async ({ body, params }: any, res, next): Promise<void> => {
        try {



          // const personPromise = await PersonModel.findById(body.person._id);
          // const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);
  
          // const decryptedMessage = rsaService.decrypt(body.signature,person.publicKey,{body});;
          // if (decryptedMessage) {
          //   const chat = new ChatModel(body);
          //   await chat.save();
          //   const signature = rsaService.encrypt({ _id: chat.id },process.env.PRIVATEKEY_SERVER);
          //   res.status(201).send({ signature: signature, _id: chat.id });
          // } else {
          //   res.status(418).send({ Message: "Object not integer"});
          // }



          await RoomModel.findByIdAndUpdate({ _id: params.id }, body);
          res.send({
            message: "updated",
            object: await RoomModel.findById(params.id),
          });
        } catch (err) {
          next(err);
        }
      };

}
