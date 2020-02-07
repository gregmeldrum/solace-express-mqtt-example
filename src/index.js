import express from "express";
import http from "http";
import bodyParser from "body-parser";
import app from './App';

const port = 9001;

function initializeExpress() {
    const expressApp = express();

    expressApp.use(express.static('public'));

    // add & configure middleware
    expressApp.use(bodyParser.urlencoded({
        extended: false
    }))
    expressApp.use(bodyParser.json())

    // Subscription example
    expressApp.post('/subscribe', (req, res) => {
        app.subscribeToTopic("SomeTopic");
        res.status(200).send('{"result":"ok"}');
    });

    // Publish example
    expressApp.post('/publish', (req, res) => {
        let message = JSON.stringify({text: "Hello"});
        let topic = "SomeTopic";
        app.publishMessage(topic, message);
        res.status(200).send('{"result":"ok"}');
    });

    var server = http.createServer(expressApp);

    server.listen(port, () => {
        console.log("server starting on port : " + port)
    });

}

function initializeApplication(){
    app.initialize();
}

// initialize our application code 
initializeApplication();

// initialize the express server
initializeExpress();
