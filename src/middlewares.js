import { growdevers } from "./dados.js";

export const logHelloMiddleware = (req, res, next) => {
    console.log("Hello Growdever")
    next();
}

export const logRequestMiddleware = (req, res, next) => {
    try{
        const body = req.body;
        console.log(req.body)
        next();
    }catch(error){
        return res.status(500).send({
            ok: false,
            mensagem: error.toString()
        })
    }
}

export const validateMiddleware = (req, res, next) =>  {
    try{
        const body = req.body;
        if (!body.nome) {
            return res.status(400).send({
            ok: false,
            mensagem: `O campo nome precisa ser informado!`,
            });
        }
        if (!body.email) {
            return res.status(400).send({
            ok: false,
            mensagem: `O campo email precisa ser informado!`,
            });
        }
        if (!body.idade) {
            return res.status(400).send({
            ok: false,
            mensagem: `O campo idade precisa ser informado!`,
            });
        }
        if (Number(body.idade) < 18) {
            return res.status(400).send({
            ok: false,
            mensagem: `A idade do growdever precisa igual ou maior que 18 anos`,
            });
        }

        if (!body.matriculado) {
            return res.status(400).send({
            ok: false,
            mensagem: `O campo matriculado precisa ser informado com true ou false!`,
            });
        }
        next();

    }catch(error){
        return res.status(500).send({
            ok: false,
            mensagem: error.toString()
        })
    }
}

export const blockUnenrolledUser = (req, res, next) => {
    try{
        const { id } = req.params;
        const growdever = growdevers.find((item) => item.id === id);
        if(!growdever){
            return next();
        }
        if(!growdever.matriculado){
            return res.status(400).send({
                ok: false,
                mensagem: `Growdevers com matricula cancelada nao podem ser atualizados`
            })
        }
        next();
    }catch(error){
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        })
    }
}