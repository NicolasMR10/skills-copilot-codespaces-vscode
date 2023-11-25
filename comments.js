//Create web server
const express = require('express');
const app = express();
//Connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: String
});
//Create model
const Comment = mongoose.model('Comment', commentSchema);
//Create route
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Get all comments
app.get('/api/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.send(comments);
    });
});
//Post a comment
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    });
    comment.save((err, newComment) => {
        res.send(newComment);
    });
});
//Delete a comment
app.delete('/api/comments/:id', (req, res) => {
    Comment.deleteOne({_id: req.params.id}, (err) => {
        res.send('Deleted');
    });
});
//Listen to server
app.listen(3000, () => console.log('Listening on port 3000'));





