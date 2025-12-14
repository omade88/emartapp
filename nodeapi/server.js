upstream app_server {
    server app:5000;
}

upstream java_api {
    server webapi:9000;
}

server {
    listen 80;

    # Angular frontend + Node backend (served by Node on port 5000)
    location / {
        proxy_pass http://app_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Java API
    location /webapi/ {
        proxy_pass http://java_api/;
        proxy_set_header Host $host;
    }
}



#const path = require("path");
#const express = require("express");
#const mongoose = require("mongoose");
#const bodyParser = require("body-parser");
#const cors = require("cors");
#const colors = require("colors");

#const mongooseURI = require("./config/keys").mongoURI;

#const userRoutes = require("./routes/user");
#const shopRoutes = require("./routes/shop");


#const app = express();

#app.use(cors());
#app.use(bodyParser.json());
#app.use(bodyParser.urlencoded({ extended: false }));
#app.use(express.json());
#app.use(express.urlencoded({ extended: false }));
#app.use("/images", express.static(path.join(__dirname, "images")));

#app.use(express.static(process.cwd()+"/client/dist/client/"));


#app.get('/', (req,res) => {
#  res.sendFile(process.cwd()+"/client/dist/client/index.html")
#})

#app.use("/api/user", userRoutes);
#app.use("/api/shop", shopRoutes);


#mongoose
#  .connect(mongooseURI)
#  .then(() => {
#    const port = process.env.PORT || 5000;
#    const server = app.listen(port, () => {
#      console.log("Server running on port".magenta, colors.yellow(port));
#    });
#    console.log("\nConnected to".magenta, "E-MART".cyan, "database".magenta);
#  })
#  .catch(err => console.log("Error connecting to database".cyan, err));
