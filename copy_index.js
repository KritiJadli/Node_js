const express = require('express');
const app = express();
const port = 9000;
const fs = require('fs');
const users = require('./copyMOCK_DATA.json');

app.use(express.urlencoded({extended:false}));

//get request
app.get('/api/users', (req, res) => {
    res.send(users);
});
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id == id);
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: 'pending' });
    })
    .delete((req,res)=>{
        return res.json({status:'pending'});
    })
    app.post('/api/users',(req,res)=>{
        const body=req.body;
        users.push({...body,id:users.length+1});
        fs.writeFile("./copyMOCK_DATA.json",JSON.stringify(users),(err,data)=>{
            return res.json({status:'success',id:users.length});

        })

    })
    app.listen(port,()=>{
        console.log(`server started at port${port}`);
    })


