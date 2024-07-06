import { Card } from "../../components/Card/Card";
import { Formulario } from "../../components/Formulario/Formulario";
import { Header } from "../../components/Header/Header";
import "./Home.css";

/*import image1 from "../../assets/";
import image2 from "../../assets/";
import image3 from "../../assets/";*/

import { useEffect, useState } from "react";
import { getLivros } from "../../services/api";

function Home() {
  const [livros, setLivros] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //getLivrosApi();
    //console.log(livros)
    setRefresh(true);
  }, []);

  useEffect(() => {
    if (refresh)
      getLivrosApi().then((result) =>
        setLivros(separaLivroPorCategoria(result))
      );
  }, [refresh]);

  const getLivrosApi = async () => {
    await getLivros().then((result) => result);
    //console.log("abc");
  };

  const separaLivroPorCategoria = (livros) => {
    const categoriaa = [];
    for (const livro of livros) {
      const tipoNome = livro.categoria;

      if (!categoriaa.hasOwnProperty(tipoNome)) categoriaa[tipoNome] = [];

      categoriaa[tipoNome].push(livro);
    }

    const resultado = [];

    for (const categoria in categoriaa) {
      resultado.push({
        tipo: categoria, // <-------- tipo é o correto e não categoria lá no card
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
        {refresh &&
          livros &&
          livros.map((value, index) => {
            return (
              <Card
                key={index}
                categoria={value.tipo} // As categorias não estavam aparecendo, foi pq eu coloquei categoria ao invés de tipo
                livros={value.livros}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
