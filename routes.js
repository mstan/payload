/* On initial load, we get redirected to this page. 
   This is necessary for the first database page load.
   We redirect to this page to handle the function, but
   then immediately redirect back so the database sets
   up with the user none the wiser */
var databaseSetup = function (req,res) {
    res.redirect('/');
};

/* Index */
var index = function (req,res) {
    res.render('base/index.ejs');
};
/* Redirect to Index */
var redirToIndex = function (req,res) {
    res.redirect('/');
};

/* Profile */
var myProfile = function(req,res) {
  user = req.user;
  res.render('profile/profile.ejs');
};



module.exports = {
    index: index,
    databaseSetup: databaseSetup,
    redirToIndex: redirToIndex,
    myProfile: myProfile
}