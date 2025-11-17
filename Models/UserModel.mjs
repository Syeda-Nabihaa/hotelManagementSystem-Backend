import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["admin", "staff", "guest"], 
        default: "guest" 
      },
      position: { 
        type: String, 
        enum: ["manager", "receptionist", "housekeeping"], 
        required: function() { return this.role === "staff"; } 
      },
      contact: { type: String },

}, { timestamps: true })

export default mongoose.model('user', UserSchema)