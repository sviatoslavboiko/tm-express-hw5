const express = require('express');
const router = express.Router();

router.use(logger)

// add author
router.post('/', (req, res) => {
  const ids = [];
  for(let author of authors){
    ids.push(author.id)
  }
  if(ids.includes(req.body.id)){
    res.status(400).json({err: 'Author exists!'})
  }else{
    authors.push({id: req.body.id, name: req.body.name, posts: req.body.posts});
    res.json({authors}) 
  }
})

// remove author
router.delete('/:id', (req, res) => {
  const ids = [];
  for(let author of authors){
    ids.push(author.id)
  }
  if(!ids.includes(req.params.id)){
    res.status(400).json({err: 'Author doesn\'t exists!'})
  }else{
    const updatedAuthors = authors.filter(item => item.id !== req.params.id);
    authors = updatedAuthors;
    res.json({authors}) 
  }
})

// get authors
router.get('/', (req, res, next) => {
  res.json({ authors })
})

// rename author
router.put('/:id/:name', (req, res) => {
    const ids = []
    for(let author of authors){
      ids.push(author.id)
    }
    if(!ids.includes(req.params.id)){
      res.status(400).json({err: 'Author doesn\'t exists!'})
    }else{
      const updatedAuthors = authors.find(item => item.id === req.params.id);
      updatedAuthors.name = req.params.name 
      res.json({authors}) 
    }
  }
)

// get posts by author
router.get('/:id/posts', (req, res) => {
  const ids = [];
  for(let author of authors){
    ids.push(author.id)
  }
  if(!ids.includes(req.params.id)){
    res.status(400).json({err: 'Author doesn\'t exists!'})
  }else{
    const authorsPosts = authors.find(item => item.id === req.params.id);
    const { posts } = authorsPosts;
    res.json({posts})
  }  
})

// get one post by author
router.get('/:id/posts/:postId', (req, res) => {
  const ids = [];
  for(let author of authors){
    ids.push(author.id)
  }
  if(!ids.includes(req.params.id)){
    res.status(400).json({err: 'Author doesn\'t exists!'})
  }else{
    const authorsPosts = authors.find(item => item.id === req.params.id);
    const { posts } = authorsPosts;
    const post = posts.find(item => item.id === req.params.postId);
    if (!post){
      res.status(400).json({err: 'Post doesn\'t exists!'})
    }else{
      res.json({post})
    }
  }  
})

let authors = [
  {id: '1', name: 'John Doe', posts: [{id: '1', text: 'Hello world'}, {id: '2', text: 'Post number 2'}]},
  {id: '2', name: 'John Doe', posts: [{id: '1', text: 'Hello world'}]},
  {id: '3', name: 'John Doe', posts: [{id: '1', text: 'Hello world'}, {id: '2', text: 'Post number 2'}, {id: '2', text: 'Post number 2'}, {id: '2', text: 'Post number 2'}]},
  {id: '4', name: 'John Doe', posts: [{id: '1', text: 'Hello world'}, {id: '2', text: 'Post number 2'}]},
  {id: '5', name: 'John Doe', posts: [{id: '1', text: 'Hello world'}, {id: '2', text: 'Post number 2'}, {id: '2', text: 'Post number 2'}]},
]

router.param('id',(req, res, next, id) => {
  req.author = authors[id];
  next()
})

function logger (req, res, next){
  console.log(req.originalUrl);
  next()
}

module.exports = router;