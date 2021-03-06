import { RsaService } from "../../../../../libs/keyUtils";
import { UUIDHelper } from "../helpers/uuids";
const uuidHelper = new UUIDHelper();
const rsaService = new RsaService();
import { PersonModel } from "../../schemas/person.model";
import { Person, ChatMessage } from "../../../../../libs/models";
import { ChatModel } from "../../schemas/chat.model";
import { PRIVATE_SERVER_KEY } from "./../../../../../libs/key";

export class ChatController {
  /**
   * @description Creates a new entity.
   * @param {*} res - the response we give back after we tried to add the requested object
   */
  getChats = async function (req, res) {
    const roomChats = [];
    const chats = await ChatModel.find();
    for (const chat of chats) {
      if (chat.room == req.params.id) {
        roomChats.push(new ChatMessage(chat._id, chat.person, chat.room, chat.message, chat.dateTime));
      }
    };
    const signature = rsaService.encrypt(roomChats , PRIVATE_SERVER_KEY);
    res.status(200).send({ signature: signature, chats: roomChats });
  };

  /**
 * @description Creates a new chat entity.
 * @param {*} body - the body of the request
 * @param {*} res - the response we give back after we tried to add the requested object
 */
  create = async ({ body }, res, next): Promise<void> => {
    try {
      console.log("aaaaaaaaaaaaaaa - body", body);
      const personPromise = await PersonModel.findById(body.chatMessage.person._id);
      const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);
      console.log("bbbbbbbbbbbbbbb - person publickey", person.publicKey);
      
      const decryptedMessage = rsaService.decrypt(body.signature, person.publicKey, body.chatMessage );
      console.log("ccccccccccccccc - decryptedMessage", decryptedMessage);
      
      const uuidCheck = await uuidHelper.check(decryptedMessage);
      console.log("ddddddddddddddd - uuidCheck", uuidCheck);
      
      if (decryptedMessage && uuidCheck) {
        const chat = new ChatModel(body.chatMessage);
        await chat.save();
        const signature = rsaService.encrypt({ _id: chat.id }, PRIVATE_SERVER_KEY);
        res.status(201).send({ signature: signature, _id: chat.id });
      } else {
        res.status(418).send({ Message: "Object not integer" });
      }
    } catch (err) {
      next(err);
    }
  };
}
