const express = require('express');
const cors = require('cors');
const monk = require('monk');


const app = express();
const db = monk('localhost/hotelmadeeasy');
const hotels = db.get('hotels');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    hotels
        .find()
        .then(hotels => {
            res.json(hotels);
        });
});

app.get('/hotel-name', (req,res) => {

});

app.get('/state', (req,res) => {

});

app.get('/hotel-type', (req,res) => {

});

app.get('/size', (req,res) => {

});

function isValidHotel(hotel){
    return hotel.name && hotel.name.toString().trim() !== '' &&
           hotel.address && hotel.address.toString().trim() !== '' &&
           hotel.state && hotel.state.toString().trim() !== '' &&
           hotel.phone && hotel.phone.toString().trim() !== '' &&
           hotel.fax && hotel.fax.toString().trim() !== '' &&
           hotel.email_id && hotel.email_id.toString().trim() !== '' &&
           hotel.website && hotel.website.toString().trim() !== '' &&
           hotel.type && hotel.type.toString().trim() !== '' &&
           hotel.rooms && hotel.rooms.toString().trim() !== '';
}

app.post('/add', (req,res) => {
    console.log(req.body);
    if(isValidHotel(req.body)){
        const hotel = {
            NAME: req.body.name.toString(),
            ADDRESS: req.body.address.toString(),
            STATE: req.body.state.toString(),
            PHONE: req.body.phone.toString(),
            FAX: req.body.fax.toString(),
            EMAIL_ID: req.body.email_id.toString(),
            WEBSITE: req.body.website.toString(),
            TYPE: req.body.type.toString(),
            ROOMS: req.body.rooms.toString()
        };
        console.log(hotel);
        hotels
            .insert(hotel)
            .then(createdHotel => {
                console.log(createdHotel);
                res.json(createdHotel)
            });

    }else{
        console.log('ERROR');
        res.status(422);
        res.json({
            message: 'You did not complete all the fields'
        });
    }
});

app.put('/update', (req,res) => {

});

/*
app.delete('/del', (req,res) =>{
    hotels.remove({});
    res.json({
        message: 'Deleted'
    });
});
*/

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});
