const express = require('express');
const cors = require('cors');
const monk = require('monk');


const app = express();
const db = monk('localhost/hotelmadeeasy');
const hotels = db.get('hotels');
const reservations = db.get('reservations');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    hotels
        .find()
        .then(hotels => {
            res.json(hotels);
        });
});

app.get('/id', (req,res) => {
    hotels.find({
        _id: req.param("id")
    }).then(hotels => {
        res.json(hotels);
    });
});
 
app.get('/name', (req,res) => {
    hotels.find({
        NAME: req.query.name
    }).then(hotels => {
        res.json(hotels);
    });
});

app.get('/state', (req,res) => {
    hotels.find({
        STATE: req.param("state")
    }).then(hotels => {
        res.json(hotels);
    });
});

app.get('/hotel-type', (req,res) => {
    var filter = {
        "$and": req.body
    };
    //filter["$and"] = req.body;
    hotels.find(filter).then(hotels => {
        res.json(hotels);
    });
});

app.get('/rooms', (req,res) => {
    hotels.find({
        ROOMS: req.param("rooms")
    }).then(hotels => {
        res.json(hotels);
    });
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

function isValidUser(user){
    console.log(user);
    return true;
}

function isValidHotel(hotel){
    console.log(hotel);
    return true;
}

function isValidDate(date){
    console.log(date);
    return true;
}

function isValidReservation(reservation){
    //console.log(JSON.parse(reservation));
    if( reservation.userID && reservation.userID.toString().trim() !== '' &&
        reservation.hotelID && reservation.hotelID.toString().trim() !== '' &&
        reservation.start && reservation.start.toString().trim() !== '' &&
        reservation.end && reservation.end.toString().trim() !== ''){
        if(isValidUser(reservation.userID)){
            if(isValidHotel(reservation.hotelID)){
                if(isValidDate(reservation.start) && isValidDate(reservation.end)){
                    return respond = {
                        status: '400',
                        message: 'All Good'
                    }
                }else{
                    return respond = {
                        status: '411',
                        message: 'Not valid start or end dates'
                    }
                }
            }else{
                return respond = {
                    status: '422',
                    message: 'Not valid HotelID'
                }
            }     
        }else{
            return respond = {
                status: '433',
                message: 'Not valid UserID'
            }
        }
    }else{
        return respond = {
            status: '444',
            message: 'You missed fields'
        }
    }
    


}

function availableRoom(reservation){
    return true;
}

app.post('/reservation', (req,res) => {
    //console.log(req.body);
    if(isValidReservation(req.body).status === '400'){
        const reservation = {
            userID: req.body.userID.toString(),
            hotelID: req.body.hotelID.toString(),
            start: req.body.start.toString(),
            end: req.body.end.toString(),
        };
        if(availableRoom(reservation)){
            res.status(respond.status);
            res.json(respond.message);
            /*
            reservations
                .insert(reservation)
                .then(createdReservation => {
                    console.log(createdReservation);
                    res.json(createdReservation)
                });
             */   
        }else{
            console.log('ERROR');
            res.status('466');
            res.json({message: 'No rooms available'});
        }
    }else{
        console.log('ERROR');
        res.status(respond.status);
        res.json(respond.message);
    }
});

app.get('/reservations', (req, res) => {
    reservations
        .find()
        .then(reservations => {
            res.json(reservations);
        });
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
