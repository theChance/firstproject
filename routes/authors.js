const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//all authors route
router.get('/', async (req,res)=>{
    let searchOptions ={}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{ 
            authors: authors,
            searchOptions: req.query 
        })
        console.log(req.query )
    }catch{
        res.redirect('/')
    }
    console.log(searchOptions)
})
//new author router
router.get('/new',(req, res)=>{
    res.render('authors/new', { author: new Author()})
})

//create author 
router.post('/', async(req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        // res.redirect(`authurs/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error Creating Author'
        })
    }
})

module.exports = router