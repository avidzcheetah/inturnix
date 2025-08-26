import { Schema, model } from "mongoose";

const EweekLoginSchema = new Schema({
 Email:String,
 Password:String
});

export default model("EweekLoginSchema", EweekLoginSchema);
