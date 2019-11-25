const express = require("express");
const Bible = require("./NKJV.bible.json");
const app = express();
const bodyparser = require("body-parser");
const writeJsonFile = require('write-json-file');
const port = process.env.PORT || 3200;

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
let vText = []
let BibleVerses = [];
app.get("/get", (req, res) => { 
    let books = Bible.books 
    let chapiter_id =0
    let id =0
    let book_id , book_name , chapiter_number
     
    for ( var i=0; i < books.length ; i++ ){

        book_id = i+1
        book_name = books[i].name
        let chapiters = books[i].chapters
        
        for (var j=0; j< chapiters.length; j++){
            chapiter_number = j+1 
            verses = chapiters[j].verses; 
            chapiter_id= chapiter_id +1  
            for (var v= 0; v < verses.length; v++){
                
                let verse = {}
                id = id + 1
                verse.id = id;
                verse.book_id = book_id
                verse.book_name = book_name
                verse.chapiter_number = chapiter_number;
                verse.chapiter_id = chapiter_id;
                
                verse.verse_id = verses[v].num;
                verse.verse_text= verses[v].text
                  
                vText.push(verses[v].text)
                BibleVerses.push(verse)
            }

        }

        

    }
   
    writeBible(BibleVerses) 
    res.status(200).send(BibleVerses);
  });
  
   let writeBible =(book )=>{
       
    (async () => {
        await writeJsonFile('nkjBible.json', book);
    })();
   }

   function getUnique(arr, comp) {
    if (arr.length===0){
      return arr;
    }
    
    else {
      const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
    }
    
  }

// app.post("/add", (req, res) => {
//     const order = req.body;
  
//     if (order.food_name && order.customer_name && order.food_qty) {
//       orders.push({
//         ...order,
  
//         id: `${orders.length + 1}`,
  
//         date: Date.now().toString()
//       });
  
//       res.status(200).json({
//         message: "Order created successfully"
//       });
//     } else {
//       res.status(401).json({
//         message: "Invalid Order creation"
//       });
//     }
//   });

  