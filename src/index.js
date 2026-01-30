import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js'
import { randomUUID } from 'crypto';
dotenv.config();

const app = express();
app.use(express.json());

app.get("/growdevers", (req, res) => {
    const { idade, nome, email, email_includes } = req.query;
    console.log(req.query)
    let dados = growdevers
    if(email){
        dados = dados.filter((item) => item.email === email);
    }
    if(idade){
        dados = dados.filter((item) => item.idade >= Number(idade))
    }
    if(nome){
        dados = dados.filter((item) => item.nome.includes(nome.toLowerCase()));
    }
    if(email_includes){
        dados = dados.filter((item) => item.email.includes(email_includes));
    }

    res.status(200).send({
        ok: false,
        mensagem: "Growdevers listados com sucesso",
        dados
    })
})


app.post("/growdevers", (req, res) => {
    const body = req.body;
    const novoGrowdever = {
        id: randomUUID(),
        nome: body.nome,
        email: body.email,
        idade: body.idade,
        matriculado: body.matriculado,
      };
    growdevers.push(novoGrowdever);

    res.status(201).send({
        ok: true,
        mensagem: "Growdever criado com sucesso",
        novoGrowdever: novoGrowdever,
        data: growdevers 
    })
})


app.get("/growdevers/:id", (req, res) => {
    const { id } = req.params;

    const growdever = growdevers.find((item) => item.id === id);
    if(!growdever){
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever nao encontrado"
        })
    }

    res.status(200).send({
        ok: true,
        mensagem: "Growdever listado com sucesso",
        dados
    })
});


const port = process.env.PORT
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}.`);
})