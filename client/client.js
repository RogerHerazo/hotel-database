console.log("Hello World!");
const form  = document.querySelector('form');
const API_URL = 'http://localhost:5000';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const address = formData.get('adress');
    const state = formData.get('state');
    const phone = formData.get('phone');
    const fax = formData.get('fax');
    const email_id = formData.get('email');
    const website = formData.get('website');
    const type = formData.get('type');
    const rooms = formData.get('rooms');
    
    const hotel = {
        name,
        address,
        state,
        phone,
        fax,
        email_id,
        website,
        type,
        rooms
    };

    fetch(API_URL+'/add', {
        method: 'POST',
        body: JSON.stringify(hotel),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdHotel => {
          console.log(createdHotel);
      });
});

const del = document.getElementById('delete');

/*
del.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Database Cleared");
    fetch(API_URL+'/del', {
        method: 'DELETE'
    });
});
*/

