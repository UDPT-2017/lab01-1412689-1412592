// app/routes.js
module.exports = function(app, passport) {

var express  = require('express');

app.use(express.static('views'));
app.set("view engine", "ejs")
app.use('/components',express.static('bower_components'));

app.get('/', function(req, res) {

	// render the page and pass in any flash data if it exists
	res.render("index",{
		user: req.user,
	});
});
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	/*app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});*/


	//albums
	app.get('/albums', function(req, res) {
		res.render('albums',{
			user: req.user,
		});

	});
	app.get('/albums1', function(req, res) {
		res.render('albums1',{
			user: req.user,
		}); // load the index.ejs file
	});
	app.get('/albums2', function(req, res) {
		res.render('albums3',{
			user: req.user,
		}); // load the index.ejs file
	});
	app.get('/albums3', function(req, res) {
		res.render('albums3',{
			user: req.user,
		}); // load the index.ejs file
	});
	app.get('/albums4', function(req, res) {
		res.render('albums4',{
			user: req.user,
		}); // load the index.ejs file
	});
	app.get('/albums5', function(req, res) {
		res.render('albums5',{
			user: req.user,
		}); // load the index.ejs file
	});
	app.get('/albums6', function(req, res) {
		res.render('albums6',{
			user: req.user,
		}); // load the index.ejs file
	});
	//albums
	app.get('/about', function(req, res) {
		res.render('about',{
			user: req.user,
		}); // load the index.ejs file
	});
	//albums
	app.get('/blogs', function(req, res) {
		res.render('blogs',{
			user: req.user,
		}); // load the index.ejs file
	});
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render("login", { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', //nếu thành công thì chuyển về link nào đó.
            failureRedirect : '/login', // ko thì nó sẽ tự reload
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/',{
					user: req.user //truyền biến thông tin user vừa đăng ký về trang chủ
					// phần này là gửi thông tin qua file ejs, cần phải chia thông tin rak
					//lag quá
					//các app.get khác nếu đều sử dụng  thì nhớ gửi lại tương tự ở đây
				});
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
