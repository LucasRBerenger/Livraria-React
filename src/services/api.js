//const urlBase = 'http://localhost:3002';
const urlBase = 'https://quixotic-valiant-factory.glitch.me';
export const postLivros = async (livro) => {
  var Header = new Headers();
  Header.append("Content-Type", "application/json");

  const livroJSON = JSON.stringify(livro);

  var request = {
    method: "POST",
    headers: Header,
    body: livroJSON,
    redirect: "follow",
  };

  const response = await fetch(`${urlBase}/livros`, request);
  const responseJson = await JSON.stringify(response);
  return responseJson;
};

export const getLivros = async () => {
  const response = await fetch(`${urlBase}/livros`);
  const responseJson = await response.json();
  return responseJson;
};

export const getTiposLivros = async () => {
  const response = await fetch(`${urlBase}/categorias`)
  const responseJson = await response.json();
  return responseJson;
}
