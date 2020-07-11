const express=require('express')
const router=express.Router({
    mergeParams: true    
})

const Story=require('../models/story')

router.post('/:_id/:user_id',function(req,res){
    Story.findOne({_id:req.params._id},(err,story)=>{
        if(err)
        {
            res.send({success:false,message:'Something went wrong in likeroute'})
        }
        else{
            var flag=0//variable to keep record if user has liked or disliked earlier
            story.persons.forEach(person=>{
                if(person===req.params.user_id)
                {
                    flag=1;
                    console.log('only one like per user')
                    res.send('One like and dislike per user')
                }
            })
            if(flag==0)
            {
                story.likes=story.likes+1
                console.log(story.likes)
                story.persons.push(req.params.user_id);
                console.log(story.persons)
                data1={
                    likes:story.likes,
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