import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json"


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Defining your routes
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


// All movies
app.get("/titles", (req, res) => {
  res.json(netflixData)
})


//One movie based on ID
app.get("/titles/:showId", (req, res) => {
  const { showId } = req.params

  const show = netflixData.find(show => show.id === +showId)
  console.log('showId', showId, typeof showId)

  if (show) {
    res.json(show)
  } else {
    res.status(404).send("No show was found!")
  }

})






// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// app.get('/nominations', (req, res) => {
//   console.log('Request to /nominations received');
//   res.json(data);
//   console.log('Data length:', data.length);
// });

// app.get('/year/:year', (req, res) => {
//   const year = req.params.year;
//   const showWon = req.query.won;
//   let nominationsFromYear = data.filter((item) => item.year_award === +year);

//   if (showWon) {
//     nominationsFromYear = nominationsFromYear.filter((item) => item.win);
//   }

//   res.json(nominationsFromYear);
// });
