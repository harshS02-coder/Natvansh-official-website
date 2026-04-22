import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  message: string;
  status: "new" | "reviewed" | "contacted";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    year: { type: String, default: "" },
    branch: { type: String, default: "" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted"],
      default: "new",
    },
  },
  { timestamps: true }
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
