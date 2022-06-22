const roomSchema = require("../schemas/room");
const personSchema = require("../schemas/person");

/**
 * Private method to get userId from mongo based on username
 * @param username
 */
const privateGetUserIdFromUsername = async (username) => {
  const personPromise = await personSchema
    .findOne({
      name: username,
    })
    .exec();
    
  return personPromise._id.toString();
};

const getRoomIdFromUsername = async (username) => {
  const roomPromise = await roomSchema
    .findOne({
      streamer: await privateGetUserIdFromUsername(username), // this is going to error out because it's a promise
    })
    .exec();

  return roomPromise._id;
};


module.exports = getRoomIdFromUsername;
