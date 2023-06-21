const express = require('express')
const {ApolloServer, gql}= require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const cors = require('cors')

const url = "mongodb://localhost/Userlogin"



async function startServer(){
    const app = express()
    const appolloServer =  new ApolloServer({
        typeDefs,
        resolvers
    })

    await appolloServer.start()

    appolloServer.applyMiddleware({app: app})

    app.use(cors({credentials: true, origin: true}))

    app.use((req, res)=>{
        res.send('Hello from express appolo server')
    })

    mongoose.connect(url, {})
    const Con = mongoose.connection
    Con.on('open', ()=>{
        console.log("The mongodb has been connected successfully")
    })

    app.listen(4000, ()=>{
        console.log('Server in running on port 4000')
    })
}

startServer()