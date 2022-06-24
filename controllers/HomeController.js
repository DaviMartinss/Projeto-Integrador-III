import { userController } from "./UserController.js";
import { categoriaController } from "./CategoriaController.js";
import { cartaoController} from "./CartaoController.js";
import { cartaoCreditoController } from "./CartaoCreditoController.js";
import { cartaoDebitoController } from "./CartaoDebitoController.js";
import { receitaController } from "./ReceitaController.js";
import { despesaController} from "./DespesaController.js"


class HomeController {
  constructor() {

  }

  //Pega o valor de todas as receitas
  async GetTotalReceitas(user){

    let totalReceitas = 0;

    var listaReceita = await receitaController.GetReceitaList(user);

    if(listaReceita !=  undefined)
    {
      listaReceita.forEach(receita => {

        totalReceitas += receita.Valor

      });
    }

    return totalReceitas;
  }

  //Pega o valor de todas as despesas NÃO PAGAS
  async GetTotalDespesas(user)
  {
    let totalDespesas = 0;

    var listaDespesa = await despesaController.GetDespesaList(user);

    if(listaDespesa !=  undefined)
    {
      listaDespesa.forEach(despesa => {

        if(!(despesa.Status))
            totalDespesas += despesa.Valor
      });
    }

    return totalDespesas;
  }


}


export const homeController = new HomeController();
