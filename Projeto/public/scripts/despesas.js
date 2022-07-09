

//MOSTRAS OS INPUTS DEPENDENDO DA FORMA DE PAGAMENTO
function showINPUT(listaCartaoCC, listaCartaoCD){

  var div = document.getElementById("FormaPagamento");
  var select = document.getElementById("FormaDePagamento");

  var listaCC = listaCartaoCC;
  var listaCD = listaCartaoCD;

  let valorSELECTED = select.options[select.selectedIndex].value

    //div.innerText = "";

    switch (parseInt(valorSELECTED)) {

      //CARTAO CREDITO
      case 1:

          if(listaCC != undefined)
          {
            div.innerHTML =  '<div class="item border-bottom py-3">' +
                           ' <div class="row justify-content-between align-items-center">' +
                              '<div class="col-auto">' +
                                '<div class="item-label">' +
                                  '<i class="fab me-2"></i><strong>N° do Cartão</strong>' +
                               ' </div>' +
                             ' </div>' +
                           ' </div>' +

                           '<div class="col text-end">' +
                           '<select id="NumCC" name="NumCC">';

                           var selectCC = document.getElementById("NumCC");

                           listaCC.forEach(cartao => {

                              selectCC.innerHTML += '<option value="'+ cartao.NumCC +'"> ' + cartao.NumCC + '</option>'
                           });

            div.innerHTML +='</select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="item border-bottom py-3">' +
                            '<div class="row justify-content-between align-items-center">' +
                            '<div class="col-auto">' +
                            '<div class="item-label">' +
                                '<i class="fab me-2"></i><strong>N° de parcelas</strong>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col text-end">' +
                                '<input name="NumParcelas" type="number" id="NumParcelas" class="form-control" placeholder="Informe o N° de parcela" />'
                            '</div>' +
                            '</div>';
          }
          else {
            alert("Nenhum cartão cadastrado!")
            div.innerText = "";
          }

        break

      //CARTAO DEBITO
      case 2:
          if(listaCD != undefined)
          {
            div.innerHTML= '<label>Nº do Cartão</label> <br>' +
                           '<select id="NumCD" name="NumCD" required>';

                           var selectCD = document.getElementById("NumCD");

                           listaCD.forEach(cartao => {

                              selectCD.innerHTML += '<option value="'+ cartao.NumCD +'"> ' + cartao.NumCD + '</option>'
                           });

            div.innerHTML +='</select> <br><br>';
          }
          else
          {
            alert("Nenhum cartão cadastrado!")
            div.innerText = "";
          }
        break;

      //DINHEIRO
      case 3:
        div.innerText = "";
        break

      default:
        console.log('Tipo invalido de Forma de Pagamento ou desconhecido');
  }

}

function confirmDespesa(despesaData){

  let id = despesaData.DespesaId;

  Swal.fire({
    title: 'Você tem certeza que deseja apagar essa Despesa?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/despesaDEL?DespesaId=${id}`;
    }
  })
}
