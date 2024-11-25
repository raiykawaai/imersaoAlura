import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

/**
 * Lista todos os posts existentes.
 *
 * 1. Chama a função `getTodosPosts` do modelo para buscar todos os posts.
 * 2. Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON.
 */
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

/**
 * Cria um novo post.
 *
 * 1. Extrai os dados do novo post do corpo da requisição.
 * 2. Chama a função `criarPost` do modelo para criar o novo post.
 * 3. Em caso de sucesso, envia uma resposta HTTP com status 200 e o post criado.
 * 4. Em caso de erro, registra o erro no console e envia uma resposta HTTP com status 500 e uma mensagem de erro genérica.
 */
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

/**
 * Cria um novo post com upload de imagem.
 *
 * 1. Cria um objeto com os dados do novo post, incluindo o nome original da imagem.
 * 2. Chama a função `criarPost` do modelo para criar o novo post.
 * 3. Renomeia o arquivo da imagem para um nome único baseado no ID do post criado.
 * 4. Move o arquivo da imagem para a pasta de uploads.
 * 5. Em caso de sucesso, envia uma resposta HTTP com status 200 e o post criado.
 * 6. Em caso de erro, registra o erro no console e envia uma resposta HTTP com status 500 e uma mensagem de erro genérica.
 */
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}