const express = require('express');
const app = express();
const port = 3005;
const path = require('path');
const chAuth = require('../../lib/server/checkAuthentication.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve index.html
app.use(express.static(path.join(__dirname, "../../..")));

let user = null; // username
let pass = null; // password

app.post("/", (req, res) => {
  user = req.body.username;
  pass = req.body.password;
  if (chAuth.chAuth(user, pass)) {
    res.send(
      `<script>location.href = './html/dashboard.html'</script>`
    );
  }
  else {
    res.send(
      `<script>alert("Incorrect USERNAME or PASSWORD")</script>
        <script>location.href = 'index.html'</script>`
    )
  }

});

app.get("/html/actors.html", (req, res) => {
    const actor = require("./actor.js");
    const html = actor.actor(user, pass);
    // res.send(html[0]);
    setTimeout( () => {
    res.send(html[0]);
    }, 5000);
  });



app.listen(port, () => {
  console.log(`server is on localhost:${port}`)
})
