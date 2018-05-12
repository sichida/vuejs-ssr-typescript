import * as express from 'express';
import * as path from 'path';
import * as VueRender from 'vue-server-renderer';
import * as fs from 'fs-extra';
import app from './assets/App';

declare var __dirname;

// Get the HTML layout
const layout = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Create a renderer
const renderer = VueRender.createRenderer();

let server = express();

server.get('/hello', function (req, res) {
    res.send('Hello World!');
});

server.use('/assets', express.static(path.join(__dirname, 'assets')));

// Handle all GET requests
server.get('*', function (request, response) {
    // Render our Vue app to a string
    renderer.renderToString(
        // Create an app instance
        app(),
        // Handle the rendered result
        function (error, html) {
            console.log(html);
            // If an error occurred while rendering...
            if (error) {
                // Log the error in the console
                console.error(error);
                // Tell the client something went wrong
                return response
                    .status(500)
                    .send('Server Error')
            }
            // Send the layout with the rendered app's HTML
            response.send(layout.replace('<div id="app"></div>', html))
        }
    )
});

let port = 4500;
server.listen(port, () => {
    console.log(`App listening on ${port}`);
});
