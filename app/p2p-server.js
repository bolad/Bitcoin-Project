//To start up this file we'll need access to he websocket module by requiring ws
const Websocket = require('ws');

//Define a default port for this peer-to-peer server
const P2P_PORT = process.env.P2P_PORT || 5001;

/*
Check if a peers environment variable has been declared. If it does we set it to the result
of calling the process.env.PEERS.split(','). This will return an array of all the websocket
addresses displayed earlier, if not, set it to a empty array
*/
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// $HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001, ws://localhost:5002 npm run dev

class P2pServer {
  constructor(blockchain) {

    // give each P2P server a blockchain so that they can share their invidual chain objects with each other
    this.blockchain = blockchain;

    //create an array called sockets which will contain a list of the connected websocket servers
    this.sockets = [];
  }

  //create and start the servers
  listen() {

    //use a server class that is contained in the websocket module and share it statically
    const server = new Websocket.Server({port: P2P_PORT});

    /*
     Setup an event listener to a function on the server called on, that can listen to different
    //types of messages sent to the websocket. The first argument is a string that specifies the environment
    we're looking for. The second is a callback function with a socket object created as a result of
    this connection
    */
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
  }

  //handle later instances of the application that wil connect to peers that are specified when started
  connectToPeers() {
    peers.forEach(peer => {
      // example of a peer addres: ws://localhost:5001
      const socket = new Websocket(peer);

      //open another event listener for the 'open' event for this socket
      socket.on('open', () => this.connectSocket(socket));
    })
  }

  //push socket into our array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");
    this.meassageHandler(socket);
    this.sendChain(socket);
  }

  //send message events to sockets
  meassageHandler(socket) {
    socket.on('message', message => {

      //transform the stringified json into a javascript object stored in data variable
      const data = JSON.parse(message);

      this.blockchain.replaceChain(data);
    });
  }

  //send stringified blockchoin object
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  //send the updated blockchain of the current instance to all the socket peers
  syncChains() {
    this.sockets.forEach(socket => {this.sendChain(socket)});
  }
}

module.exports = P2pServer;
