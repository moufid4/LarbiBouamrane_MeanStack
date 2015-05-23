/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Confirmation email
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'larbibouamrane2@gmail.com',
        pass: 'Anissa95'
    }
});

app.post('/email', function(req, res) {
	var nom = req.body.nom;
	var date = req.body.date;
	var telephone = req.body.telephone;
	var email = req.body.email;
	var user_choice = req.body.endroit;

	var mailOptions = {
	    from: 'الأستاذ العربي بوعمران <info@larbibouamrane.com>',
	    to: email,
	    subject: 'تأكيد: موعد مع الأستاذ العربي بوعمران',
	    html: '<p style="direction:rtl">السلام عليكم '+ nom + '،' +'<br />هذه الرسلاة لتأكيد موعدكم مع الأستاذ العربي بوعمران الذي سيكون يوم ' + '<span style="color:red">' + date + '</span>' + '.</p>' + '<p style="direction:rtl">بانتظار لقاؤكم.</p>' + '<p style="direction:rtl">الأستاذ العربي بوعمران العربي<br />10، نهج طالب عبد الرحمان، باب الوادي | الجزائر<br />' + 'الهاتف: 021-96-21-77<br />' + '<a direction="rtl" href="http://larbibouamrane.com">larbibouamrane.com</a></p>'
	};

		var mailLarbi = {
	    from: 'Site Web <info@larbibouamrane.com>',
	    to: 'moufid4@gmail.com',
	    subject: 'Nouveau rendez-vous avec ' + nom,
	    html: '<p>Bonjour Larbi,' +'<br />Ceci est pour vous informer que vous avez un rendez-vous avec ' + nom + ' le ' + '<span style="color:red">' + date + '.</span><br />' + '<br />Nom: ' + nom + '<br />Endroit: ' + user_choice + '<br />' + 'Téléphone: ' + telephone + '<br />' + 'Email: ' + email
	};


		transporter.sendMail(mailOptions, function(error, info){
			if(error){
			    console.log(error);
			} else {
			    console.log('Message sent: ' + info.response);
			}

				transporter.sendMail(mailLarbi, function(error, info){
			if(error){
			    console.log(error);
			} else {
			    console.log('Message sent: ' + info.response);
			}
		});
		});

});

app.post('/fr/email', function(req, res) {
	var nom = req.body.nom;
	var date = req.body.date;
	var telephone = req.body.telephone;
	var email = req.body.email;
	var user_choice = req.body.endroit;

	var mailOptions = {
	    from: 'Me Larbi Bouamrane <info@larbibouamrane.com>',	
	    to: email,
	    subject: 'Confirmation: Rendez-vous avec Me Larbi Bouamrane', // Subject line
	    html: '<p>Bonjour '+ nom + ',' +'<br />Ceci est une confirmation de votre rendez-vous avec Me Larbi Bouamrane le ' + '<span style="color:red">' + date + '</span>' + '.</p>' + '<p>Au plaisir de vous rencontrer.</p>' + '<p>Me Larbi Bouamrane<br />10, Bd Taleb Abderrahmane, Bab-El-Oued - Alger | Algérie<br />' + 'Tel: 021-96-21-77<br />' + '<a href="http://larbibouamrane.com">larbibouamrane.com</a></p>'
	};

		var mailLarbi = {
	    from: 'Site Web <info@larbibouamrane.com>',
	    to: 'moufid4@gmail.com',
	    subject: 'Nouveau rendez-vous avec ' + nom,
	    html: '<p>Bonjour Larbi,' +'<br />Ceci est pour vous informer que vous avez un rendez-vous avec ' + nom + ' le ' + '<span style="color:red">' + date + '.</span><br />' + '<br />Nom: ' + nom + '<br />Endroit: ' + user_choice + '<br />' + 'Téléphone: ' + telephone + '<br />' + 'Email: ' + email
	};


		transporter.sendMail(mailOptions, function(error, info){
			if(error){
			    console.log(error);
			} else {
			    console.log('Message sent: ' + info.response);
			}

				transporter.sendMail(mailLarbi, function(error, info){
			if(error){
			    console.log(error);
			} else {
			    console.log('Message sent: ' + info.response);
			}
		});
		});

});


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;