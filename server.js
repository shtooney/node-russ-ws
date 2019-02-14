const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to the server.log.');
        }
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
       welcomeMessage: 'Welcome to the website!',
       pageTitle: 'Root Page',
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });    
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'does not work'
    });
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});


