function confirmar(categoria){
    console.log("A categoria é "+categoria);   
    var alert = window.confirm("Tem certeza que deseja Apagar " + categoria.Categoria +" da sua lista de Categorias?");
    if(alert){
        window.location.href = "http://localhost:3000/categoriaDEL?CategoriaId="+categoria.CategoriaId;
    }
}

//código do alan
{/* <div id="atualiza" style="display:none">
<form action="/categoriaUP" method="post">
   <input type="text" id="categoriaId" name="CategoriaId" hidden/>
   <label>Categoria:</label>
   <input type="text" id="categoria" name="Categoria" />
   <button type="submit" id="btAtualizar" class="btn app-btn-secondary" style="display:none">
   Atualizar
   </button>
</form>
</div> */}