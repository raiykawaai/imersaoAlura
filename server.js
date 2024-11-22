import express from "express";

const posts = [
    {
        id: 1,
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Paisagem de um pôr do sol",
        imagem: "https://picsum.photos/seed/picsum/200/300"
    },
    {
        id: 3,
        descricao: "Cachorro brincando no parque",
        imagem: "https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/QEQZK3IFXNGHLNWFEU4NEIOGHA.jpg"
    },
    {
        id: 4,
        descricao: "Montanha nevando",
        imagem: "https://portaldeinverno.com.br/wp-content/uploads/2015/01/alpes-japao-1.jpg"
    },
    {
        id: 5,
        descricao: "Comida deliciosa",
        imagem: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/06/17/84749228-feijoada-vegana-portal.jpeg"
    },
];

const app = express();
app.use(express.json());


app.listen(3000, ()=> {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res)=> {
    res.status(200).json(posts);
});

function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res)=> {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});
//teste commit2
