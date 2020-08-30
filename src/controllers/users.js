import Users from '../models/users'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = (req, res, next)=>{
    Users.find({email:req.body.email}).exec().then(user=>{
        if(user.length>=1){
            return res.status(422).json({
                message: "Email already in use"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    const user= new Users({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        username: req.body.username,
                        isAdmin: false        
                    })
                    user.save().then(result=>{
                        console.log(result)
                        res.status(201).json({
                            message: "User Created Successfully",
                            email: result.email,
                            username: result.username
                        })
                    }).catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}


export const getUsers= (req, res, next)=>{
    Users.find().select('_id email').exec().then(docs=>{
        console.log(docs)
        res.status(200).json(docs)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

export const getUserById= (req, res, next)=>{
    const id= req.params.userId;
    Users.findById(id).exec().then(doc=>{
        console.log("From DB", doc)
        res.status(200).json(doc)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}


export const logUserIn= (req,res,next)=>{
    Users.find({email: req.body.email}).exec().then(user=>{
        if(user.length<1){
            return res.status(404).json({
                message: "Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(result){
                const token= jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY,{
                    expiresIn: "3h"
                })
                return res.status(200).json({
                    message: "Auth successful",
                    token
                })
            }else{
                res.status(401).json({
                    message: "Auth failed"
                })
            }
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

export const deleteUser= (req, res, next)=>{
    const id= req.params.userId
    console.log(id)
Users.remove({_id: id}).exec().then(results=>{
    console.log(results)
    res.status(200).json(results)
}).catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
})
}

export const updateProfileInfo=  async (req, res, next)=>{
    const _id= req.params.userId
    const selectedUser= await Users.findById({_id})
    selectedUser.set({
        email: req.body.email || selectedUser.email,
        username: req.body.username || selectedUser.username,
        isAdmin: false
    })
    const updatedUser= await selectedUser.save()

    return res.status(200).json({
        "message": "Updated Successfully",
        updatedUser
     })
}

export const resetPassword=  async (req, res, next)=>{
    const _id= req.params.userId
    const selectedUser= await Users.findById({_id})
    selectedUser.set({
        password: req.body.password
    })
    const updatedUser= await selectedUser.save()

    return res.status(200).json({
        "message": "Updated Successfully",
        updatedUser
     })
}