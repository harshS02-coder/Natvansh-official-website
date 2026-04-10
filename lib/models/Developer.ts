import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeveloper extends Document {
  name: string;
  role: string;
  image: string;
  imageTransform: {
    x: number;
    y: number;
    scale: number;
  };
  github: string;
  linkedin: string;
  portfolio: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperSchema = new Schema<IDeveloper>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "" },
    imageTransform: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      scale: { type: Number, default: 1 },
    },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Developer: Model<IDeveloper> =
  mongoose.models.Developer || mongoose.model<IDeveloper>("Developer", DeveloperSchema);

export default Developer;
