import app from '../app'
import express from 'express'
import http from 'http'

const port= process.env.PORT || 5000

//const server= express()

app.listen(port,()=>{
    console.log("I am running naaa", port)
})