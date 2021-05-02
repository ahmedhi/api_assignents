let User = require('../model/user');


// AVEC PAGINATION
function getUsers(req, res) {
    var aggregateQuery = User.aggregate();

    User.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, users) => {
        if (err) {
          res.send(err);
        }
  
        res.send(users);
      }
    );
  }
// Récupérer un utilisateur par son id (GET)
function getUser(req, res){
    let userId = req.params.id;

    User.findOne({id: userId}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

// Ajout d'un utilisateur (POST)
function postUser(req, res){
    let user = new User();
    user.id = req.body.id;
    user.login = req.body.login;
    user.password = req.body.password;
    user.role = req.body.role;

    console.log("POST user reçu :");
    console.log(user)

    user.save( (err) => {
        if(err){
            res.send('cant post user ', err);
        }
        res.json({ message: `${user.login} saved!`})
    })
}

// Update d'un utilisateur (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu user : ");
    console.log(req.body);
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

    });

}

// suppression d'un assignment (DELETE)
function deleteUser(req, res) {

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${user.login} deleted`});
    })
}



module.exports = { getUsers, postUser, getUser, updateUser, deleteUser};
