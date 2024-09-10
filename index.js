const express=require('express');
const app=express();
var users=[{
    name:"john",
    kidney:[{
        healthy:false
    }]
}];
app.use(express.json());
app.get('/',function(req,res){
    const kidneys=users[0].kidney;
    const totalkidneys=kidneys.length;
    let healthykidneys=0;
    for(let i=0;i<totalkidneys;i++)
    {
        if(kidneys[i].healthy)
        {
            healthykidneys++;
        }
    }
    let nothealthykidneys=totalkidneys-healthykidneys;
    res.json({
        totalkidneys,
        healthykidneys,
        nothealthykidneys
    })
})
app.post('/',function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidney.push({
        healthy: ishealthy
    })
    res.json({
        msg:"done"
    })
})

app.put('/',function(req,res){
    const atleastone =atleastoneunhealthykidney();
    if(atleastone)
    {
        for(let i=0;i<users[0].kidney.length;i++)
            {
                users[0].kidney[i].healthy=true;
            }
            res.json()
    }
    else{
        res.status(411).json({
            msg:"there is no bad kidney to replace it with a good kidney"
        })
    }
    
})
function atleastoneunhealthykidney()
{
    let atleastone =false;
    for(let i=0;i<users[0].kidney.length;i++)
    {
        if(users[0].kidney[i].healthy==false)
        {
            atleastone=true;
        }
    }
    return atleastone;
}

app.delete('/',function(req,res){

    const atleastoneunhealthy=atleastoneunhealthykidney();
    if(atleastoneunhealthy)
    {
        let newkidneys=[];
    for(let i=0;i<users[0].kidney.length;i++)
    {
        if(users[0].kidney[i].healthy)
        {
            newkidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidney=newkidneys;
    res.json({ msg : "done"})

    }
    else{
        res.status(411).json({
            msg:"you have no bad kidneys"
        });
    }
    
})
app.listen(3000);