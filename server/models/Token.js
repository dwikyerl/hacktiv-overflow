const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true, 
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
      expires: 43200
    }
  },
);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
