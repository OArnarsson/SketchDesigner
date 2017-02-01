# SketchDesigner

###Stack used: [MEAN](http://mean.io)

###About
SketchDesigner started out as a simple school assignment but ended up being something more.  
The requirements were to make a canvas element that you could draw basic shapes on.
We began studying the canvas element and how to manipulate it with angular. After making a basic drawing application we saw that we could do a lot better. The drawing objects were quite sloppy and the application wasn't of much use as a drawing app.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After rethinking the whole project we started from scratch, using the previous version as a guide as to what worked well, and what needed improvement. Restructuring the class implementations was just what the project needed.
Multiple canvas support was added, database connection was made so you can come back to your artworks, more drawing options and multi-select/editing was added.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All in all this project gave a good insight in how important it is to structure the project well from the start and draw out a class diagram to see where the challenges are.  

You can click [this link](http://sketchdesigner.herokuapp.com/) to see the current build in action.

### Setup/Usage
- Navigate to <code>SketchDesigner/FrontEnd</code> and run <code>npm install</code>.  
- To run the application as is, run the <code>ng build</code> command.
- When the CLI has finished building the <code>dist</code> folder, go to the <code>SketchDesigner/BackEnd</code> folder.  
- From there you can run <code>node app.js</code> to start the express server.
- You should now see <code>API running on localhost:3000</code> in your terminal.
- Now simply go to [localhost:3000](http://localhost:3000) and go nuts!
