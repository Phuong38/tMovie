const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const genreRoute = require('./routes/genre.route');
const movieRoute = require('./routes/movie.route');
const creditRoute = require('./routes/credit.route');
const videoRoute = require('./routes/video.route');


const genreTvRoute = require('./routes/genre.tv.route');
const tvRoute = require('./routes/tv.route');
const creditTvRoute = require('./routes/credit.tv.route');
const videoTvRoute = require('./routes/video.tv.route');
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
).then(() => console.log('DBConnection successfull!'))
.catch((err) => {
    console.error(err);
});

app.use(express.json());
app.use(cors());
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/genre', genreRoute);
app.use('/api/movie', movieRoute);
app.use('/api/credit', creditRoute);
app.use('/api/video', videoRoute);


app.use('/api/tv/genre', genreTvRoute);
app.use('/api/tv/credit', creditTvRoute);
app.use('/api/tv/video', videoTvRoute);
app.use('/api/tv', tvRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log('server is listening on port 5000');
});