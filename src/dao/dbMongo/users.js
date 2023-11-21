import { Router } from "express";
import { userModel } from "../models/user.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await userModel.paginate({}, options);
    const parsedDocs = result.docs.map(doc => doc.toObject());

    res.render('user', { docs: parsedDocs, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, nextPage: result.nextPage, prevPage: result.prevPage });
  } catch (error) {
    console.log("Error en la operación GET de usuarios en MongoDB:", error);
    res.status(500).send({ status: 'error', error: 'Error en el servidor' });
  }
});

router.post('/', async (req,res) =>{
  try {
    let {nombre, apellido, email} = req.body;
    if(!nombre || !apellido || !email) return res.status(400).send({status:'error', error:'Datos incompletos'});
    
    let result = await userModel.create({
      nombre,
      apellido,
      email
    });
  
    res.send({status:'Usuario creado', payload:result});
  } catch (error) {
    console.log("Error en la operación POST de usuarios en MongoDB:", error);
    res.status(500).send({ status: 'error', error: 'Error en el servidor' });
  }
});

router.put('/:uid', async(req,res)=>{
  let {uid} = req.params;
  let userToReplace = req.body;
  if(!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email)
    return res.send({status:'error', error:'Datos incompletos'})

  let result = await userModel.updateOne({_id:uid}, userToReplace)
  res.send({status: 'se actualizo el usuario', payload:result})
})

router.delete('/:uid', async(req,res)=>{
  let {uid} = req.params;
  let result = await userModel.deleteOne({_id:uid})
  res.send({status:"se borro correctamente", payload: result})
})
export default router;