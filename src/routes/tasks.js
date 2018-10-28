const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const mongojs = require('mongojs');
const db = mongojs('mongodb://raul:00025416ad712ecb@ds141633.mlab.com:41633/proyectofep', ['tasks']);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname.split(" ").join(""));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({storage: storage,limits: {fileSize: 1024 * 1024 * 5},fileFilter: fileFilter}).single('imagen');

//esta area crea, elimina, actualiza y busca usuarios
////
//muestra todos los usuarios
//api.get('/',Usercontroller.viewUser);
//muestra todos los usuarios
//api.get('/ver/usuario/:user',Usercontroller.view);
//crea un nuevo usuario
//api.post('/nuevo/usuario',Usercontroller.newUser);
//login de usuario
//api.post('/login/usuario',Usercontroller.loginUser);

//elimina usuario por medio del id que genera mongodb
//api.delete('/delete/usuario/:id',Usercontroller.deleteUser);

//actualiza los datos del usuario por medio de nombre de usuario
//
//api.put('/actualizar/usuario',auth,Usercontroller.updateUser);





////////////////////////////////////////////////////////////////////////////////////////////////////
//rutas para agregar, ver, actualizar objetos con mongodb
//
//ruta que devuelve todos los objetos de la base de datos
//api.get('/tasks',Objetocontroller.viewObject);
//ruta que agrega datos
//api.post('/tasks',auth,Objetocontroller.newObject);
//
//api.delete('/tasks/:id',Objetocontroller.deleteObjeto);





 //GET All tasks
api.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

/*// Single Task
api.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) return next(err);
        res.json(task);
    });
});

// Add a Task
api.post('/tasks', (req, res, next) => {
    const task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400).json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});

// Delete task
api.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err){ res.send(err); }
        res.json(task);
    });
})

// Update Task
api.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    //let updateTask = {$set:{title: req.body.title,isDone: req.body.isDone}};
    let updateTask = {};
    
    if(task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if(task.title) {
        updateTask.title = task.title;
    }
    if(!updateTask) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});*/


module.exports = api;