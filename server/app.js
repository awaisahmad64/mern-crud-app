const express = require('express');
const app = express();
const PORT = 8081;
app.get('/',(req, res)=>{
    res.send("Hello Express")
})
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
