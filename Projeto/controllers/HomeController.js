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

  //AQUI ADICIONE AS INFOS PASSADAS NO HOME
  async GetInfosHome(user){

    let totalReceitas =  await this.GetTotalReceitas(user);
		let totalDespesas =  await this.GetTotalDespesas(user);
    let totalReceitaMes = await receitaController.GetReceitaTotalMes(user);
    let totalDespesaMes = await despesaController.GetDespesaTotalMes(user);
    
		let lucro = (totalReceitas - totalDespesas) > 0 ? (totalReceitas - totalDespesas) : 0 ;
		let divida = lucro < 0 ? lucro : 0 ;

		//Adicione mais propriedades nesse OBJ caso tenha mais informações para repassar ao HOME
		var home = {
								 TotalReceitas: totalReceitas,
								 TotalDespesas: totalDespesas,
								 Lucro: lucro ,
								 Divida: divida,
                 TotalReceitaMes: totalReceitaMes,
                 TotalDespesaMes: totalDespesaMes,
							 }

              
    return home;
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

            totalDespesas += despesa.Valor
      });
    }

    return totalDespesas;
  }


}


export const homeController = new HomeController();
