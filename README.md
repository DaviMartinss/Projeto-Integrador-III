
<h1 align="center">PI - Ped1/2</h1>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./PED12/src/Imagens/icon-280x200.png" />
</h1>

Sobre
=========
<p align="center">O controle de gastos é uma atividade importante para o controle financeiro de uma pessoa, família ou empresa, sobretudo para ajudar na educação financeira. Além de proporcionar uma abstração para o usuário em termos financeiros, tem também a tarefa de facilitar o que para muitos é tedioso e complicado, contrinuindo para a facilitação do controle ou gerenciamento de gastos dos atores. Tendo em mãos todas as informações dos gastos, bem como, entradas, saídas, parcelas, etc. Tornar-se-á muito fácil para os atores, encontrar as principais despesas, e assim equilibrar melhor suas finanças.</p>

<p align="center">Com esse pensamento, foi que nossa equipe desenvolveu essa aplicação de gerenciamento e controle de finanças. A equipe formada por: Alan Lopes, Davi Martins, Dirlia Vieira e Marlon Duarte. Desenvolve essa aplicação em Java como uso de SQL para banco de dados. Esse projeto faz parte da Disciplina de Projeto Integrador (I e II) do curso de Ciência da Computação ministrada pelo professor Me. Italo Ribeiro com orientações dos demais professores de áreas diretamente correlatas ao trabalho desenvolvido.</p>

<p align="center">ESTE TRABALHO AINDA ESTÁ EM DESENVOLVIMENTO E PODE CONTER INCONSISTÊNCIA NO FLUXO DE USO ! ! !</p>

Mapa
====
<!--ts-->
   * [Sobre](#Sobre)
   * [Mapa](#Mapa)
   * [Instalacao](#Instalacao)
<!--   * [Dicas](#Dicas)
      * [Pre Requisitos](#pre-requisitos)
      * [Local files](#local-files)
      * [Remote files](#remote-files)
      * [Multiple files](#multiple-files)
      * [Combo](#combo) -->
   * [Prints](#Prints)
   * [Diagramas](#Diagramas) 
   * [Features](#Features)
<!--te-->

Instalacao
==========

<p align="center">Para executar a aplicação será necessário possuir em sua máquina um gerenciador de banco de dados do tipo SQL, usamos o MySQL, mas pode ser outro desde que saida modificar o conector dentro da classe 'moduloConexao.java'. Após isso, qualquer IDE que possa trabalhar com java será capaz de executar o projeto. Recomendamos para isso o NetBeans.</p>

Dicas
=====

<p align="center">Como o software ainda esta em produção e em fase muito prematura, recomendamos que comunique suas observações em -> eletromarlon@gmail.com <-. Para execução, se faz necessário uma boa velocidade de leitura e escrita, o que nos leva a dizer que o SSD no sistema ajuda para evitar ocorrência de engasgos na hora de produção de dados. </p>

Prints
======
[Inicio](#Sobre)


<h2 align="center">Efetuando cadastro no sistema</h2><br></br>

<p align="left">O sistema de avatars ainda não está terminando, então o usuário precisa desconsiderar essa parte.</p><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Screenshot_Others/cadastro_exemplo.gif" />
</h1><br></br>

<h2 align="center">Efetuando Login no Sistema</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Screenshot_Others/login_exemplo.gif" />
</h1><br></br>

<h2 align="center">Efetuando Login no Sistema</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Screenshot_Others/alterar-cadastro_exemplo.gif" />
</h1><br></br>

Diagramas
=========
[Inicio](#Sobre)


<h2 align="center">Diagramas ER do banco de dados.</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ER_Diagrams_DB/ER_all.gif" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote Controllers</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_Controllers.png" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote DAO</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_DAO.png" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote Model</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_Model.png" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote Utilities</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_Utilities.png" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote Ordenação</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_Ordenacao.png" />
</h1><br></br>

<h2 align="center">Diagrama de Classe do pacote Views</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/ClassDiagram_Views.png" />
</h1><br></br>

<h2 align="center">Diagrama de Caso de Uso</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/UML_UseCase_ped12.png" />
</h1><br></br>

<h2 align="center">Diagrama de Estado (StateMachine) para situação de login</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/StateMachine_LOGIN.png" />
</h1><br></br>

<h2 align="center">Diagrama de Sequência para caso de Login e consulta de Despesas</h2><br></br>

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./Diagram/SequenceDiagram_LOGIN.png" />
</h1><br></br>

Features
========
[Inicio](#Sobre)

- [x] Bando de Dados
- [x] Tela de Login
- [x] Tela de Cadastro
- [x] Tela de Cartao de Credito
- [x] Tela de Cartao de Debito
- [x] Tela de Despesas
- [x] Tela de Receitas
- [ ] Tabela de Consulta
- [x] Categorias
- [x] Cadastro de usuário
- [x] Cadastro de cliente
- [ ] Cadastro de produtos
- [ ] ...
