const express=require('express')
const router=express.Router({
    mergeParams: true    
})

const Story=require('../models/story')

router.post('/:_id/:user_id',function(req,res){
    Story.findOne({_id:req.params._id},(err,story)=>{
        console.log(story._id)
        if(err)
        {
            res.send({success:false,message:'Something went wrong in dislikeroute'})
        }
        else{
            var flag=0
            story.persons.forEach(person=>{
                if(person===req.params.user_id)
                {
                    flag=1;
                    console.log('only one like dislike per user')
                    res.send('One like and dislike per user')
                }
            })
            console.log(flag)
            if(flag==0)
            {
                story.dislikes=story.dislikes+1
                console.log(story.dislikes)
                story.persons.push(req.params.user_id);
                console.log(story.persons)
                data1={
                    dislikes:story.dislikes,
                    persons:story.persons
                }
                //And Update 
                Story.findOneAndUpdate({_id:req.params._id},{$set:data1},(err,STORY)=>{
                    if(err)
                    {
                        res.send('Something went wrong in likeroute.js')
                    }
                    else{
                        res.redirect('/story/show/'+req.params._id)
                    }
                })   
            }
        }
    }) 
})


module.exports=router;