import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function init() {
    const app = express();

    const PORT = Number(process.env.PORT) || 8000

    app.use(express.json());

    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
        hello:String
        say(name:String):String
        }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there I am graph Ql`,
                say: (_, {name}:{name:String})=> `Hey ${name} how are you ?`
            }
        },
    });

    await gqlServer.start()

    app.use('/graphql', expressMiddleware(gqlServer))
    app.get('/', (req, res) => {
        res.json({ message: "Server is running " })
    })

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

init();