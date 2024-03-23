// Import required modules
const http = require('http');
const socketIo = require('socket.io');

// Define the IP address and port
const ip = '192.168.100.5'; // Replace 'YOUR_IP_ADDRESS' with your desired IP address
const port = 3000; // Or any other port you want to use

// Create an HTTP server with the specified IP address and port
const server = http.createServer().listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}`);
});

// Initialize Socket.IO with the server
const io = socketIo(server);

// Handle socket connections
io.on('connection', socket => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', msg => {
    console.log('Message received: ' + msg);
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
