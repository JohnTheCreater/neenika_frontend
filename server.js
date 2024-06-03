const express = require('express');
const path = require('path');
const { Message } = require('semantic-ui-react');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api',(req,res)=>{
  res.json({message:"hello from server"});
})

  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});