const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();
//set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// set middleware
mongoose
  .connect('mongodb://localhost:27017/blog')
  .catch((error) => console.log(error));
// create schema
const postSchema = mongoose.Schema({
  title: String,
  description: String,
});
// created model
const Post = mongoose.model('Post', postSchema);
const PORT = 8081;
app.get('/', (req, res) => {
  res.send('Hello Express');
});
app.post('/create', (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.get('/posts', (req, res) => {
  Post.find().then((items) => res.json(items));
});
app.delete('/delete/:id', (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((error) => console.log(error));
});
app.put('/update/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((error) => console.log(error));
});
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
