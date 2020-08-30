import request from 'supertest'
import app from '../../index'
import Users from '../models/users'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


describe("/Blogs", ()=>{

    it("Should return 200", async(done)=>{
        const res= await request(app).get('/blogs')
        expect(res.status).toBe(200)
        done()
    })

    it("Should post a blog", async(done)=>{
        const password= await bcrypt.hash("hellorwanda", 10)
        
        await new Users({
            _id: mongoose.Types.ObjectId(),
            email: "jp.ivvv@gmail.com",
            password,
            username: "Jean Pierre",
            isAdmin: false        
        }).save()
        const user= await request(app).post('/users/login').send({
            email: "jp.ivvv@gmail.com",
            password: "hellorwanda"
        })
        console.log(user.body)
        const res= await request(app).post('/blogs').send({
            title: "req.body.title",
            author: "req.body.author",
            body: "req.body.body",
            date: "req.body.date"
        }).set("Authorization", `Bearer ${user.body.token}`)
        expect(res.status).toBe(200)
        done()
        
                    
    })
})
