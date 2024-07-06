import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Formulario } from "../../components/Formulario/Formulario";
import { Header } from "../../components/Header/Header";
import { getLivros } from "../../services/api";
import "./Home.css";

function Home() {
  const [livros, setLivros] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getLivrosApi();
    setRefresh(false);
  }, []);

  useEffect(() => {
    if (refresh) {
      getLivrosApi().then((result) => {
        if (result) {
          setLivros(separaLivroPorCategoria(result));
        } else {
          setLivros([]);
        }
      });
    }
  }, [refresh]);

  const getLivrosApi = async () => {
    const result = await getLivros();
    return result;
  };

  const separaLivroPorCategoria = (livros) => {
    if (!livros || !Array.isArray(livros)) {
      return [];
    }

    const categoriaa = {};

    for (const livro of livros) {
      const tipoNome = livro.categoria;

      if (!categoriaa.hasOwnProperty(tipoNome)) {
        categoriaa[tipoNome] = [];
      }

      categoriaa[tipoNome].push(livro);
    }

    const resultado = [];

    for (const categoria in categoriaa) {
      resultado.push({
        tipo: categoria,
        livros: categoriaa[categoria],
      });
    }

    return resultado;
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="div-formulario">
        <Formulario setRefresh={setRefresh} />
      </div>
      <div className="div-card">
        {livros &&
          livros.map((value, index) => (
            <Card key={index} categoria={value.tipo} livros={value.livros} />
          ))}
      </div>
    </div>
  );
}

export default Home;
