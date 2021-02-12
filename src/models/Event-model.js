import { model, Schema } from 'mongoose';

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },

    // Referencia o relacion
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function() {
    const { __v,_id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

export default model('Event', EventSchema);