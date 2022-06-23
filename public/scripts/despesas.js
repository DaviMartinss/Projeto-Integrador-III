

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
            div.innerHTML= '<label>Nº do Cartão</label> <br>' +
                           '<select id="NumCC" name="NumCC" required>';

                           var selectCC = document.getElementById("NumCC");

                           listaCC.forEach(cartao => {

                              selectCC.innerHTML += '<option value="'+ cartao.NumCC +'"> ' + cartao.NumCC + '</option>'
                           });

            div.innerHTML +='</select> <br><br>' +
                            '<label>Nº Parcelas</label>' +
                            '<input type="number" name="NumParcelas" required/> <br><br>';
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

                           listaCC.forEach(cartao => {

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
