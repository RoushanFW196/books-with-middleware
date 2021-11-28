const express=require('express');
const app = express();
const books=require('./Books.json');
console.log(books)

app.use(express.json());
 // get("/books")=>return all of the books
//  app.get("/books",(req, res) => {
//     res.send(books)
// })

 const authorise = (permission)=>{
    return (req, res, next)=>{
    const originalSendFunc = res.send.bind(res);
    res.send = function(body){
        body.api_requested_by = "Roushan";
        return originalSendFunc(body);
    }
    next();
    }
    }

  // app.post("/books")=>append a new item in the last  but not in actual list
app.post("/books",(req, res) => {
    const newbook=[...books,req.body];
    res.send(newbook)
    console.log(newbook)
})

//app.get("/books/:id")=>return a single book of particular id
// app.get("/books/:id",(req, res) => {
//     const bookid=books.filter((el)=>el.id==req.params.id);
//     res.send(bookid)
    
// })


   
app.patch("/books/:id", (req, res)=>{
    const newbook = books.map((book)=>{
    if(book.id == +req.params.id){
       
   
   if(req?.body?.id) book.id = req.body.id 
   if(req?.body?.author) book.author = req.body.author
   if(req?.body?.bookname) book.bookname = req.body.bookname   
   if(req?.body?.pages) book.pages = req.body.pages 
   if(req?.body?.publishedyear) book.publishedyear = req.body.publishedyear 
  // replacing the found book with request body
}
return books;        
});

   


 res.send(newbook)
});


// delete book by id
// app.delete("/books/:id", (req, res)=>{
//     const deleteBook = books.filter((b)=> b.id !== +req.params.id)
//     res.send(deleteBook);
// })

// delete book by author name
app.delete("/books/:author", (req, res)=>{
    const deleteBook = books.filter((b)=> b.author !== req.params.author)
    res.send(deleteBook);
})



 
    

    //all book with middleware
    app.get("/books", authorise("Roushan"), (req, res)=>{
     // console.log(body.Name)
      res.send({api_requested_by: "roushan", books});
    });
    

    // //single book 
    app.get("/books/:author", authorise("roushan"), (req, res)=>{
        const authorBook = books.filter((b)=> b.author === req.params.author)

        res.send({api_requested_by: "roushan", authorBook});
    });









app.listen(1300, function(){
    console.log("listening on port 1300")
})