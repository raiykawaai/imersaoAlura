import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar todos os posts
    const posts = await getTodosPosts();    
    // Envia uma resposta com status 200 (sucesso) e os posts no formato JSON
    res.status(200).json(posts);
}
