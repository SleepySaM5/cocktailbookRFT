import express from "express";

// Create Express server
const app = express();

/**
 * Start Express server.
 */
const server = app.listen(8000, () => {
    console.log('Server started!');
});


export default app;