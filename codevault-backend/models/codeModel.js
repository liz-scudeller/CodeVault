const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
        language:{
        type:String,
        enum: ['js', 'python', 'csharp', 'html', 'css', 'node', 'react'],
        required:true
    },
        code:{
        type:String,
        required:true,
    },
        tags:{
        type:[String],
    },
        owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model("Snippet", snippetSchema);