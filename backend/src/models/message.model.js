import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "text is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: String,
      default: "general",
    },
  },
  {
    timestamps: true,
  },
);
const Message = model("Message", messageSchema);
export default Message;
