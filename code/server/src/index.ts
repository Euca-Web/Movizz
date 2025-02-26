import Server from "./core/server.js";

const PORT = process.env.PORT || 3000;
const server: Server = new Server();

server.createServer().listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('MySQL Host:', process.env.MYSQL_HOST);
    console.log('MongoDB Host:', process.env.MONGODB_HOST);
});
