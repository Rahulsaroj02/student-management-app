const express=require("express");
const cors=require('cors');
const port=5000;

const app=express();

app.use(express.json());
app.use(cors());

const students=[];
let idcounter=1;

app.get("/students",(req,res)=>{
  res.json(students);
});

app.post("/students",(req,res)=>{
  const {id, name}=req.body;
  const fid=students.find(s=>s.id===id);
  if(fid){
    return res.status(400).json({ error: 'id already exists' });
  }
  if(!name || !id){
    return res.status(400).json({ error: 'Name is required' });
  }
  const newstud={id,name};
  students.push(newstud);
  res.status(200).json({message:"successfull",students})
});

app.put("/students/:id",(req,res)=>{
  const id=req.params.id;
  const {name}=req.body;
  
  const upstud=students.find(s=>s.id===id);
  if(!upstud){
    return res.status(400).json({error:"id not found"});
  }else{
    upstud.name=name;
    res.json(upstud);
  }
});

app.delete("/students/:id",(req,res)=>{
  const id=req.params.id;
  const index=students.findIndex(s=>s.id===id);
  if(index===-1){
    return res.status(200).json({message:'not found'});
  }
  
  const delstud=students.splice(index,1)[0];
  res.status(200).json({message:"del",student:delstud});
});



app.listen(port,()=>console.log(`server running on http://localhost:${port}`));