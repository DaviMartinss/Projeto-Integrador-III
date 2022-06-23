function confirmar(categoria){
    console.log("A categoria é "+categoria);
    var alert = window.confirm("Tem certeza que deseja Apagar " + categoria.Categoria +" da sua lista de Categorias?");
    if(alert){
        window.location.href = "http://localhost:3000/categoriaDEL?CategoriaId="+categoria.CategoriaId;
    }
}

function atualizar(categoriaDATA){

  var categoria = categoriaDATA;

  var div = document.getElementById("atualiza");
  var inputCategoria = document.getElementById("categoria");
  var inputCategoriaId = document.getElementById("categoriaId");
  var butaoAtualiza = document.getElementById("btAtualizar");

  if(div.style.display == "none")
  {
    div.style.display = 'block';
    butaoAtualiza.style.display = 'block';
    inputCategoria.value = categoria.Categoria;
    inputCategoriaId.value = categoria.CategoriaId;
  }
  else
  {
    div.style.display = 'none';
    butaoAtualiza.style.display = 'none';
    inputCategoria.value = "";
    inputCategoriaId.value = "";
  }

  function cadastrar(){

  var div = document.getElementById("cadastro");
  var butaoCadastrar = document.getElementById("btCadastrar");

  if(div.style.display == "none")
      div.style.display = 'block';
  {
    div.style.display = 'block';
    butaoCadastrar.style.display = 'block';
  }
  else
      div.style.display = 'none';
  {
    div.style.display = 'none';
    butaoCadastrar.style.display = 'none';
  }
}
