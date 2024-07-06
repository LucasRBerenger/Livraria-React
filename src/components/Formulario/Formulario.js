import { useEffect, useState } from "react";
import "./Formulario.css";
import { postLivros, getTiposLivros } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {convertBase64} from '../../utilities/file'

export const Formulario = ({ setRefresh }) => {
  const valorPadraoImagem = { src: "", base64: "" };
  const [image, setImage] = useState(valorPadraoImagem);
  const [imageRequired, setImageRequired] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Literatura");
  const [tituloRequired, setTituloRequired] = useState("");
  const [categoriaRequired, setCategoriaRequired] = useState("");
  const [descricao, setDescricao] = useState("");
  const [descricaoRequired, setDescricaoRequired] = useState("");
  const [tiposLivros, setTiposLivros] = useState("");

  /* Um teste para verificar os atributos com o botão, no M3A4 ele simplesmente desapareceu com ela
  e com type="submit" onClick={handleClick} que estavam no botão lá de baixo. Fez isso pq a função
  do botão não seria mostrar isso, mas deixo aqui de registro:

  const handleClick = () => { 
    alert(
      "título do livro: " +
        titulo +
        "categoria: " +
        categoria +
        "descricao: " +
        descricao +
        "image: " +
        image
    );
  };*/

  useEffect(() => {
    getTiposLivrosApi().then((result) => {
      setTiposLivros(result);
      setCategoria(result[0].nome);
    });
  }, []);

  const getTiposLivrosApi = async () =>
    await getTiposLivros().then((result) => result);

  const handleChangeImage = async (event) => {
    const fileImage = event.target.files[0];
    const imagemBase64 = await convertBase64(fileImage);
    console.log(imagemBase64);
    setImage({ src: URL.createObjectURL(fileImage), base64: imagemBase64 });
  };

  const newLivro = () => {
    return {
    imagem: image.base64,
    titulo: titulo,
    categoria: categoria,
    descricao: descricao,
    };
  }
  

  const handleSubmitForm = async () => {
    if (InputIsValid()) {
      setRefresh(false);
      const novoLivro = newLivro();
      //console.log(novoLivro);

      await postLivros(novoLivro)
        //.then((result) => console.log("DEU CERTO, RESULTADO =>" + JSON.stringify(result)))
        /*.then((result) => {
          setRefresh(true);
          limparCampos();
        })
        .catch((error) => console.log("DEU ERRO =>" + JSON.stringify(error)));*/
        .then((result) => {
          setRefresh(true);
          limparCampos();
          toast.success("Operação realizada com sucesso!");
        })
        .catch((ern) =>
          toast.error("Não foi possível realizar a inclusão de um novo livro.")
        );
    }
  };

  const limparCampos = () => {
    setImage(valorPadraoImagem);
    setTitulo("");
    setCategoria("");
    setDescricao("");
  };

  const InputIsValid = () => {
    if (image.src === "" && image.base64 === "") {
      setImageRequired("Campo obrigatório");
      return false;
    }
    if (titulo === "") {
      setTituloRequired("Campo obrigatório");
      return false;
    }
    if (categoria === "") {
      setCategoriaRequired("Campo obrigatório");
      return false;
    }
    if (descricao === "") {
      setDescricaoRequired("Campo obrigatório");
      return false;
    }
    return true;
  };

  return (
    <div className="container-formulario">
      <h2>Cadastro de livros</h2>
      <form className="formulario">
        <div className="image-input">
          <div>
            <label>imagem da capa</label>
            <img
              src={image.src}
              alt={"Imagem de capa do livro " + titulo ? titulo : ""}
              className="box-image"
            />
            <div className="box-input">
              <label className="file-upload">
                <input
                  type="file"
                  name="img"
                  id="img"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
                Upload de imagem
              </label>
            </div>
          </div>
          {imageRequired && (
            <label className="campo-obrigatorio">{imageRequired}</label>
          )}
        </div>
        <div className="text-input">
          <div>
            <label>Título do livro</label>
            <input
              placeholder="Título do livro"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
            {tituloRequired && (
              <label className="campo-obrigatorio">{tituloRequired}</label>
            )}
          </div>
          <div>
            <label>Tipo do livro</label>
            <select onChange={(event) => setCategoria(event.target.value)}>
              {tiposLivros &&
                tiposLivros.map((value, index) => {
                  return (
                    <option key={index} value={value.nome}>
                      {value.nome}
                    </option>
                  );
                })}
            </select>
            {categoriaRequired && (
              <label className="campo-obrigatorio">{categoriaRequired}</label>
            )}
          </div>
          <div>
            <label>Descrição</label>
            <textarea
              rows={5}
              placeholder="Descrição"
              onChange={(event) => setDescricao(event.target.value)}
              value={descricao}
            />
            {descricaoRequired && (
              <label className="campo-obrigatorio">{descricaoRequired}</label>
            )}
          </div>
        </div>
      </form>
      <div className="input-button">
        <button
          className="button-form"
          type="submit"
          onClick={handleSubmitForm}
        >
          Cadastrar
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
