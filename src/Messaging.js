import mqtt from 'mqtt';
import options from './messaging-options';

function messaging() {
    let client;

    // Connect to the message broker
    function connectWithPromise() {
        return new Promise((resolve, reject) => {
            try {
                client = mqtt.connect(options.host, options);
            } catch (err) {
                console.log("error connecting!");
                reject(err);
            }
            
            client.on('connect', function () {
                console.log("Connected to broker!");
                resolve("Connected!");
            });
        });
    }

    // Subscribe to a topic on to the broker
    function subscribe(topicName) {
        client.subscribe(topicName, function (err) {
            if (err) {
                console.error("Error subscribing to", topicName, err);
            }
        });
    }

    // Publish a message to the broker
    function publish(topicName, message) {
        client.publish(topicName, message, function (err) {
            if (err) {
                console.error("Error subscribing to", topicName, err);
            }
        });
    }

    // Register a function to handle received messages
    function registerMessageHandler(handler) {
        client.on('message', function (topic, message) {
            handler(topic.toString(), message.toString());
        });
    }

    return {
        connectWithPromise: connectWithPromise,
        subscribe: subscribe,
        publish: publish,
        registerMessageHandler: registerMessageHandler
    }
}

let messagingClient = messaging();
export default messagingClient;