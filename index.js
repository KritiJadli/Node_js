const express = require('express');
const app = express();
const port = 8000;
const users = require('./MOCK_DATA(1).json');
const fs=require('fs');
const { json } = require('stream/consumers');
//routes
//middleware-pluggin
app.use(express.urlencoded({extended:false}));
app.get("/api/users",(req,res)=>{//retur js format
    res.send(users);
})
app.get('/users', (req, res) => {//return html format
   const html = `
   <ul>
      ${users.map(user => `<li>${user.first_name}</li>`).join('')}
   </ul>
   `;
   res.send(html);
});
app.route('/api/users/:id')
    .get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id==id);
    return res.json(user);
})
.patch((req,res)=>{
    const id=Number(req.params.id);
    fs.readFile('./MOCK_DATA(1).json','utf-8',(err,data)=>{
        if(err)return res.status(500);
    })
        const user=users.find((user=>{
        user.id==id;
    }))
    if(!user)return res.status(404);
     Object.assign(user,body);
     fs.writeFile('./MOCK_DATA(1).json',JSON.stringify(users),(err,data)=>{
        if(err)return res.status(500);
            res.json({status:'success',updatedUser:user});

     })

})
.delete((req,res)=>{
  const id = Number(req.params.id);

  fs.readFile('./MOCK_DATA(1).json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    const users = JSON.parse(data);
    const filteredUsers = users.filter(u => u.id !== id);

    if (filteredUsers.length === users.length)
      return res.status(404).json({ error: 'User not found' });

    fs.writeFile('./MOCK_DATA(1).json', JSON.stringify(filteredUsers, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete user' });
      res.json({ status: 'success', message: `User with id ${id} deleted` });
    });
  });
})

app.post('/api/users',(req,res)=>{
    const body=req.body;
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA(1).json',JSON.stringify(users),(err,data)=>{
            return res.json({status:'success', id:users.length});


    })
})
app.listen(port, () => { console.log(`server started at port ${port}`); });
