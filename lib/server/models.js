import mongoose, { Schema } from "mongoose";

const UploadSchema = new Schema(
  {
    originalName: String,
    contentType: String,
    size: Number,
    secureUrl: String,
    storage: String,
  },
  { _id: false }
);

const EnquirySchema = new Schema(
  {
    reference: { type: String, index: true, unique: true },
    service: { type: String, index: true },
    fullName: String,
    companyName: String,
    phone: String,
    whatsapp: String,
    email: String,
    city: { type: String, index: true },
    preferredContact: String,
    message: String,
    details: Schema.Types.Mixed,
    upload: UploadSchema,
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "won", "closed"],
      default: "new",
      index: true,
    },
    internalNotes: [{ note: String, createdAt: Date }],
  },
  { timestamps: true }
);

const ContactSchema = new Schema(
  {
    reference: { type: String, index: true },
    intent: String,
    fullName: String,
    companyName: String,
    phone: String,
    email: String,
    city: String,
    message: String,
    urgent: Boolean,
    status: { type: String, default: "new", index: true },
  },
  { timestamps: true }
);

export const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

export const ContactRequest =
  mongoose.models.ContactRequest || mongoose.model("ContactRequest", ContactSchema);
