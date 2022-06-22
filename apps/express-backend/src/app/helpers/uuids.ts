import { uuidModel } from "../../schemas/uuid.model";

export class UUIDHelper {
  check = async (uuid: string | boolean): Promise<boolean> => {
    try {
      const exists = new uuidModel({ uuid: uuid });
      await exists.save();
      return true;
    } catch (err) {
        return false;
    }
  };
}
