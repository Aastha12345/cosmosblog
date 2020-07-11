var mongoose=require('mongoose');

var StorySchema = new mongoose.Schema({
    title:{
        type:String
    },
    photo:{
        type:String
    },
    author:{
        username:{
            type:String
        },
        _id:{
            type:String
        }
    },
    description:{
        type:String
    },
    likes:{
            type:Number,
            default:0
    },
    dislikes:{
            type:Number,
            default:0
    },
    persons:{
        //stores the _id of persons who liked or disliked
        type:[String],
        default:"0"
    },
    comments:
    [{
        text:{
            type:String
            },
        username:{
            type:String
        },
        commenttime:{
            type:Date
        }
    }]
})

module.exports=mongoose.model('Story',StorySchema)