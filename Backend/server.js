const express = require('express')

let io = require('socket.io')
({
    path:'/webrtc'
})


const app = express()
const port = 8080

// app.get('/', (req,res) => res.send('Hello World!'))

let dirSlice = __dirname.slice(0,15)


app.use(express.static( dirSlice + '/Frontend/myapp/build'))
app.get('/', (req, res, next) => {
    res.sendFile( dirSlice + '/Frontend/myapp/build/index.html')
})

const server = app.listen(port, () => console.log(`App listening on ${port}`))

io.listen(server)

const peers = io.of('/webrtcPeer')

let connectedPeers = new Map()

peers.on('connection', socket => {
    socket.emit('connection-success', { success:socket.id})

    //send socket id to client
    connectedPeers.set(socket.id, socket)

    socket.on('disconnect', () => {
        console.log('disconnected')
        connectedPeers.delete(socket.id)
    })

    //when we recieve a offer or answer we
    //we send it to other peer
    socket.on('offerOrAnswer', (data) => {
        console.log('data from socket: ', data)
        //sending to other peers if there are any
        for(const [socketID, socket] of connectedPeers.entries()) {
            //avoid sending to self
            //we send the SDP to all other connected socket
            //except the sender
            if(socketID !== data.socketID) {
                console.log(socketID, data.payload.type)
                socket.emit('offerOrAnswer', data.payload)
            }
        }
    })

    socket.on('candidate', (data) => {
        console.log('data from socket: ', data)
        //sending to other peers if there are any
        for(const [socketID, socket] of connectedPeers.entries()) {
            //avoid sending to self
            //we send the SDP to all other connected socket
            //except the sender
            if(socketID !== data.socketID) {
                console.log(socketID, data.payload.type)
                socket.emit('candidate', data.payload)
            }
        }
    })


})