//sport API

require('dotenv').config();
const sports = require('./sports.json')
const express = require("express");
const app = express()
const port = process.env.PORT

app.use(express.json())


app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  const welcomeText = `<h1>Hello Fruit API</h1><p><a href="/sports/all">List of all available sports</a><hr><a href="/sports/">JSON data</a></p><hr>
  <p><ol><li>Add a key/value to sport example: <a href="/sports/update/football">on click equipmentCount key added</a>
  <li>Delete sport example: <a href="/sports/delete/football">on click football will be deleted</a>
  <li>Show an existed sport data example: <a href="/sports/football">show a football data</a>
  <li>Error example: <a href="/sports/idontknow">error message</a></ol></p>`
  res.end(welcomeText)
})

app.get("/sports", (req, res) => {
  const name = req.body
  console.log(name)
  res.send(sports)
})



//add a sport (?)
app.post('/sports', (req, res) => {
  const sport = req.body
  console.log(sport)
  res.send("New Sport Created")

})

//delete a sport (NOTE: I've tried app.delete, but it works only on the server side)
app.get('/sports/delete/:name', (req, res) => {
  const name = req.params.name.toLowerCase(); //changing to lower case
  const index = sports.findIndex(sport => sport.name.toLowerCase() === name); // change to lower case
  if (index === -1) {
    res.status(404).send("You try to delete the sport that doesn't exist")
  } else {
    sports.splice(index, 1);  // Remove the sport from the array
    res.send(`Sport «${name}» Deleted`); // tells us its deleted;
    console.log(sports)
  }
});
app.get("/sports/:name", (req, res) => {
  //show all sports
  if (req.url == '/sports/all') {
    const allSports = sports.map(sport => sport.name);
    res.send(allSports)
  }
  //get a sport
  const name = req.params.name.toLowerCase();
  const sport = sports.find(sport => sport.name.toLowerCase() == name)
  if (sport == undefined) {
    res.status(404).send("The sport doesn't exist")
  } else {
    res.send(sport)
  }
})
//update a sport, added equipmentCount key and value (NOTE: I've tried app.put, but it works only on the server side)
app.get("/sports/update/:name", (req, res) => {
  const sport = sports.filter(el => el.name.toLowerCase() == req.params.name.toLowerCase());
  if (sport.length == 0) {
    res.status(404).send("The sport doesn't exist")
  } else {
    const equipmentCount = sport[0].equipment.length
    sport[0].equipmentCount = equipmentCount
    res.send(sport)
  }
})

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`)
})
