import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  position: "Post Bearer" | "Creative" | "Technical" | "Management";
  image: string;
  imageTransform: {
    x: number;
    y: number;
    scale: number;
  };
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  year: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    position: {
      type: String,
      enum: ["Post Bearer", "Creative", "Technical", "Management"],
      required: true,
    },
    image: { type: String, default: "" },
    imageTransform: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      scale: { type: Number, default: 1 },
    },
    socialLinks: {
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    year: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
