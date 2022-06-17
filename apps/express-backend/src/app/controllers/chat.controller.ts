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
      if (chat.Room == req.params.id) {
        roomChats.push(chat);
      }
    };
    res.status(201).send(roomChats);
  };
}
