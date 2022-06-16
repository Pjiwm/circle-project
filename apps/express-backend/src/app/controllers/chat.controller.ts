import { ChatModel } from "../../schemas/chat.model";
export class ChatController {
  /**
   * @description Creates a new entity.
   * @param {*} body - the body of the request
   * @param {*} res - the response we give back after we tried to add the requested object
   */
  getChats = async function (req, res) {
    const roomChats = [];
    const chats = await ChatModel.find();
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].Room == req.params.id) {
        roomChats.push(chats[i]);
      }
    }
    res.status(201).send(roomChats);
  };
}
