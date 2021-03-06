-------------Criando tabela User---------------

CREATE TABLE "User" (
	"UserId" SERIAL PRIMARY KEY NOT NULL,
	"NickName" VARCHAR(60) NOT NULL,
	"Email" VARCHAR(60) NOT NULL,
	"PassWord" VARCHAR(60) NOT NULL,
	"Avatar" VARCHAR(200) DEFAULT NULL
);

-------------Criando tabela categoria---------------

CREATE TABLE "Categoria" (
	"CategoriaId" SERIAL PRIMARY KEY NOT NULL,
 	"Categoria" VARCHAR(50) NOT NULL,
    "UserId" INTEGER NOT NULL,
 	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE

  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de categoria que
  -- possui o UserId do usuário
);

-------------Criando tabela cartão de crédito---------------

CREATE TABLE "CartaoCredito" (
	"CartaoCreditoId" SERIAL PRIMARY KEY NOT NULL,
	"NumCC" BIGINT NOT NULL,
	"DataFatura" DATE NOT NULL,
	"Limite" FLOAT NOT NULL,
  "Credito" FLOAT NOT NULL,
	"Anuidade" FLOAT NOT NULL,
	"Fatura" FLOAT NOT NULL,
	"JurosAdicional" FLOAT default NULL,
	"Bandeira" VARCHAR(30) NOT NULL,
	"UserId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE

  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de cartão de crédito que
  -- possui o id_user do usuário
);


-------------Criando tabela cartão de débito---------------
CREATE TABLE "CartaoDebito" (
	"CartaoDebitoId" SERIAL PRIMARY KEY NOT NULL,
	"NumCD" BIGINT NOT NULL,
	"CartaoPrincipal" BOOLEAN NOT NULL,
	"Saldo" FLOAT NOT NULL,
	"Bandeira" VARCHAR(30) NOT NULL,
	"UserId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE

  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de cartão de débito que
  -- possui o id_user do usuário
);

-------------Criando tabela de receitas---------------
CREATE TABLE "Receita" (
	"ReceitaId" SERIAL PRIMARY KEY NOT NULL,
	"CategoriaId" INTEGER NOT NULL,
	"Data" DATE NOT NULL,
	"FormaAlocacao" VARCHAR(60) NOT NULL,
	"Valor" FLOAT NOT NULL,
	"SeRepete" BOOLEAN DEFAULT NULL,
	"UserId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CATEGORIA FOREIGN kEY("CategoriaId") REFERENCES "Categoria" ON DELETE CASCADE ON UPDATE CASCADE

  	--caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de receita que
  	-- possui o id_user do usuário

	--caso seja alterado/deletado o valor do id_categoria, também será alterado/deletado a tupla de receita que
  	-- possui o id_categoria de categoria
);


CREATE TABLE "Despesa" (
	"DespesaId" SERIAL PRIMARY KEY NOT NULL,
	"Valor" FLOAT NOT NULL,
	"Data" DATE NOT NULL,
	"Descricao" VARCHAR(60) NOT NULL,
	"FormaPagamento" SMALLINT NOT NULL,
	"NumParcelas" INT DEFAULT NULL,
	"Status" BOOLEAN NOT NULL,
	"NumCC" BIGINT DEFAULT NULL,
	"NumCD" BIGINT DEFAULT NULL,
	"CategoriaId" INTEGER NOT NULL,
	"UserId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CATEGORIA FOREIGN kEY("CategoriaId") REFERENCES "Categoria" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Total" (
	"TotalId" SERIAL PRIMARY KEY NOT NULL,
	"TotalReceita" FLOAT NOT NULL,
	"TotalDespesa" FLOAT NOT NULL,
	"ParcelaCredito" FLOAT NULL,
	"UserId" INTEGER NOT NULL,
	"ReceitaId" INTEGER NOT NULL,
	"DespesaId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_RECEITA FOREIGN kEY("ReceitaId") REFERENCES "Receita" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_DESPESA FOREIGN kEY("DespesaId") REFERENCES "Despesa" ON DELETE CASCADE ON UPDATE CASCADE

  	--caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de totais que
  	-- possui o id_user do usuário

	--caso seja alterado/deletado o valor do id_receita, também será alterado/deletado a tupla de totais que
  	-- possui o id_receita

	--caso seja alterado/deletado o valor do id_despesa, também será alterado/deletado a tupla de totais que
  	-- possui o id_despesa
);

CREATE TABLE "SendEmail" (
	"SendEmailId" SERIAL PRIMARY KEY NOT NULL,
	"Password" VARCHAR(60) NOT NULL,
	"UserId" INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User"
);


--Adicionando poupança em total
alter table "Total" add column "Poupanca" FLOAT DEFAULT NULL
