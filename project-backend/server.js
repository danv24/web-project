const express = require("express");
const mongoose = require("mongoose");
const app= express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(cookieParser())

//using cors to allow comunication with different origions, allowing requests from our front end thats on port 3000
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
// requiring the image Router
const imageRouter = require("./api/routes/images")
// requiring the calander Router

const calanderRouter = require("./api/routes/CalanderController")

//requiring the betuniform router
const betUniformRouter = require("./api/routes/BetUniformRoute")

//requiring the alefuniform router
const alefUniformRouter = require("./api/routes/AlefUniformRoute")

//requiring the shoes router
const OrderRouter = require("./api/routes/OrderRoute")

// requiring the beret router

const beretRouter = require("./api/routes/BeretRoute")

//requiring the SliderContent router

const sliderContentRouter = require("./api/routes/SliderContentRoute")

//requring users router
const userRoute = require("./api/routes/users");

//requiring the auth router
const authRoute = require("./api/routes/auth");

// requiring the message router
const messageRoute = require("./api/routes/messages");

// requiring the room router
const roomRouter = require('./api/routes/roomRoute')
// allows us parse thorugh data
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// connecting the server to our datbase projectDB
mongoose.connect('mongodb://localhost:27017/ProjectDB');


app.use(express.static('uploads'));

//app.use("/url", router) sends the client to the route files where they handle all ther requests

app.use("/images", imageRouter);

app.use("/event", calanderRouter);

app.use("/bet", betUniformRouter)

app.use("/alef", alefUniformRouter)

app.use("/order", OrderRouter)

app.use("/beret", beretRouter)

app.use("/slider", sliderContentRouter)

app.use("/auth", authRoute);

app.use("/users", userRoute);
// using the convesations and message route
// app.use("/api/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.use("/room", roomRouter)
// strating the server on port 3001
app.listen(3001,()=>console.log("the server is running on port 3001"))