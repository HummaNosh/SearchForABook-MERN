const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});
      return user;
    },
    addUser: async (parent, args) => {
        const user = await User.create(args);
        return user;
      },
    //   COME BACK TO THESE 2 BELOW
      saveBook: async (parent,args ) => {
        const updated = await User.findOneAndUpdate(
          { _id },
          { new: true }
        );
        return updated;
      },
      removeBook: async (parent, args) => {
        const updated = await User.findOneAndUpdate(
          { _id },
          { new: true }
        );
        return updated;
      },
  },
  
};

module.exports = resolvers;
