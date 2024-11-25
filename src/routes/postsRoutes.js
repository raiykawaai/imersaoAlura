import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem} from "../controllers/postsController.js";

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
  // Cria uma instância do middleware Multer
  const upload = multer({ storage: storage });
 //linux ou no mac
 //const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    // Permite que o Express entenda requisições com corpo no formato JSON
app.use(express.json());

// Rota GET para a URL '/posts'
app.get("/posts", listarPosts);
// Rota para criar um post
app.post("/posts", postarNovoPost);

app.post("/upload", upload.single("imagem"), uploadImagem);
   
}
export default routes;

   