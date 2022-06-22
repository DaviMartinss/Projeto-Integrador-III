function confirmar(categoria){
    console.log("A categoria é "+categoria);   
    var alert = window.confirm("Tem certeza que deseja Apagar " + categoria.Categoria +" da sua lista de Categorias?");
    if(alert){
        window.location.href = "http://localhost:3000/categoriaDEL?CategoriaId="+categoria.CategoriaId;
    }
}