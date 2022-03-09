const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();
const router = express.Router();

const port = 3000;


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

// Get cards
router.get('/cards', async (req, res) => {
  const cards = getCards();
  res.send({
      resultCode: '200',
      data: cards
  })
})

// Delete card
router.delete('/delete/:id', async (req, res) => {
  const cards = getCards();
  const id = +req.params.id;
  const index = cards.findIndex(card => card.id === id);
  if (index > -1) {
      cards.splice(index, 1);
      updateCards(cards);
      return res.send({
          resultCode: '200',
          resultMessage: 'Card deleted successfully'
      });
  }
  res.send({
      resultCode: '200',
      resultMessage: 'No card found!'
  });
})

// Add new card
router.post('/saveCard', async (req, res) => {
  const cards = getCards();
  const isCardExist = cards.some(ob => ob.number === req.body.number)
  if (isCardExist) {
      return res.send({
          resultCode: '200',
          resultMessage: 'Card is already exist!'
      });
  }
  cards.push(req.body);
  updateCards(cards);
  res.send({
      resultCode: '200',
      resultMessage: 'Card is saved successfully!'
  });
})

function updateCards(cards) {
  cards.map((card, index) => card.id = index+1);
  fs.writeFileSync('./cards.json', JSON.stringify(cards));
}



function getCards() {
  try {
      const dataBuffer = fs.readFileSync('./cards.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
  } catch(e) {
      return [];
  }
}

app.listen(port, () => {
    console.log('Server is listening on port ', port)
})
