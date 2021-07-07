const express = require("express")
const server = express()
const port = 8000
const welcomeRoutes = require('./routes/welcomeRouter')
const projectRoutes = require('./routes/projectRoutes')
const actionRoutes = require('./routes/actionRoutes')

server.use(express.json())
server.use('/', welcomeRoutes)
server.use('/projects', projectRoutes)
server.use('/actions', actionRoutes)
server.use((req, res) => res.status(404).json({message: "Route was not found"}))
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({errorMessage: 'Something went wrong'})
})

server.listen(port, () => {
    console.log(`magic is happening on port ${port}`)
})