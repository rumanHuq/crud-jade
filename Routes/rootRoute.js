module.exports = function (express, rootRouter, Film, assert) {
    rootRouter.route('/')
        .get(function (req, res) {
            res.render('index');
        })

        ;
    rootRouter.route('/list')
        .get(function (req, res) {

            Film.find(function (err, movies) {
                assert.equal(null, err);
                //res.render('movies', { movies });
                res.json(movies)
            });
        })
        .post(function (req, res) {
            var film = new Film(req.body);
            film.save(function (err, result) {
                assert.equal(null, err);
                res.redirect('/list');

            });
        })
        ;

    //middleware to handle repeatative DB access request
    rootRouter.use('/list/:id',function (req, res, next) {
        Film.findById(req.params.id, function (err, result) {
                assert.equal(null, err)
                req.result = result;
                next()
            })
    });
    rootRouter.route('/list/:id')
        .get(function (req, res) {
            res.json(req.result)
        })
        .patch(function (req, res) {
            for(var i in req.body){
                req.result[i] = req.body[i]
            };
            req.result.save(function(){res.json({success:true})})
        })
        .delete(function(req,res){
            req.result.remove(function(){res.json({remove:true})})
        })
    rootRouter.route('/data/edit/:name')
        .get(function (req, res) {
            Film.findOne({title: req.params.name}, function (err, movie) {
                assert.equal(null, err);
                res.render('updatemovies', { movie });
            });
        })
    rootRouter.route('/updatemovie/:id')
        .post(function (req, res) {
            Film.findOneAndUpdate({_id: req.params.id},{title: req.body.title, imdb: req.body.imdb, year: req.body.year}, function (err, movie) {
                assert.equal(null, err);
                res.redirect('/data/edit/'+req.body.title);
            });
        })
};