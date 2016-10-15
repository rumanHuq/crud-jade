module.exports = function(express,rootRouter,Film,assert){
    rootRouter.route('/')
        .get(function(req,res){
            res.render('index');
        })
        
        ;
    rootRouter.route('/list')
        .get(function(req,res){
            
            Film.find(function(err,movies){
                assert.equal(null,err);
                res.render('movies',{movies});
            });
        })
        .post(function(req,res){
            var film = new Film(req.body);
            film.save(function(err,result){
                assert.equal(null,err);
                res.redirect('/list');
                
            });
        })
        ;
        
    rootRouter.route('/list/:id')
        .get(function(req,res){
            Film.findById(req.params.id, function(err,result){
                assert.equal(null,err)
                res.json(result)
            })
        })
        .put(function(req,res){
            Film.findById(req.params.id, function(err,result){
                result.title = req.body.title;
                result.year = req.body.year;
                result.imdb = req.body.imdb;
                result.save(function(){res.redirect('/list')})
            })
        })
};