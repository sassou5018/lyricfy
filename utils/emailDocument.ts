import { Schema, model, models } from "mongoose";
const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

export default models.Email || model("Email", emailSchema);