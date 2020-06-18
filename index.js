const express = require('express');

const server = express();

server.use(express.json());


const users = [];

function verifyData(req,res,next) {
    const {name, email, age, phone} = req.body;

    if(!name) {
        return res.json({
            error: 'nome é obrigatório'
        });
    } else if (!age) {
        return res.json({
            error: 'idade é obrigatório'
        });
    } else if (!phone) {
        return res.json({
            error: 'telefone é obrigatório'
        });
    }

    next();
};

server.get('/', (req,res) => {
    return res.json({
        result:'Bem vindo ao cadastro de usuários da Growdev'
    });
});

server.get('/users', (req,res) => {

    return res.json({users});
});

//rota para pegar um único usuário
server.get('/users/:id', (req,res) => {
    const {id} = req.params;

    return res.json({
        result: 'usuário encontrado com sucesso',
        user:users[id]
    });
});

//para atualizar dados

server.put('/users/:id', (req,res) => {
   
    const {name, email, age, phone} = req.body;
    const {id} = req.params;

    const user = {
        email,
        name, 
        age,
        phone
    };

    users[id] = user;

    return res.json({
        resul: 'dados atualizados com sucesso',
        user: user
    });

});


server.post('/users', verifyData, (req,res) => {

    const {name, email, age, phone} = req.body;

    const user = {name, email, age, phone};

    users.push(user);

    return res.json({user});
});






server.listen(3000); 