import mongoose, { Document, Schema } from 'mongoose';

interface ILayout extends Document {
  pageId: string;
  layouts: any;
  items: any;
}

const LayoutSchema: Schema = new Schema({
  pageId: { type: String, required: true, unique: true },
  layouts: { type: Object, required: true },
  items: { type: Object, required: true },
});

export default mongoose.models.Layout || mongoose.model<ILayout>('Layout', LayoutSchema);
