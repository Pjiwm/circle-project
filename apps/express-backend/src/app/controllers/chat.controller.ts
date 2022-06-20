import { RsaService } from "../../../../../libs/keyUtils";
const rsaService = new RsaService();
import { PersonModel } from "../../schemas/person.model";
import { Person, ChatMessage } from "../../../../../libs/models";
import { ChatModel } from "../../schemas/chat.model";

export class ChatController {
  /**
   * @description Creates a new entity.
   * @param {*} res - the response we give back after we tried to add the requested object
   */
  getChats = async function (req, res) {
    const roomChats = [];
    const chats = await ChatModel.find();
    for(const chat of chats) {
      if (chat.room == req.params.id) {

        roomChats.push(new ChatMessage(chat._id, chat.person, chat.room, chat.message, chat.dateTime,chat.signature));
      }
    };
    const signature = rsaService.encrypt({ roomChats },process.env.PRIVATEKEY_SERVER);
    res.status(200).send({ signature: signature, chats: roomChats });
  };

    /**
   * @description Creates a new chat entity.
   * @param {*} body - the body of the request
   * @param {*} res - the response we give back after we tried to add the requested object
   */
     create = async ({ body }, res, next): Promise<void> => {
      try {
        const personPromise = await PersonModel.findById(body.person._id);
        const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);

        const decryptedMessage = rsaService.decrypt(body.signature,person.publicKey,{body});;
        if (decryptedMessage) {
          const chat = new ChatModel(body);
          await chat.save();
          const signature = rsaService.encrypt({ _id: chat.id },process.env.PRIVATEKEY_SERVER);
          res.status(201).send({ signature: signature, _id: chat.id });
        } else {
          res.status(418).send({ Message: "Object not integer"});
        }
      } catch (err) {
        next(err);
      }
    };
}
