-------------criando tabela user -----------------
CREATE TABLE "user" (
id_user SERIAL PRIMARY KEY NOT NULL,
nome varchar(60) NOT NULL,
login varchar(60) NOT NULL,
senha varchar(60) NOT NULL,
img_perfil varchar(200) DEFAULT NULL
);

-------------Criando tabela categoria---------------
CREATE TABLE "categoria" ( 
	id_categoria SERIAL PRIMARY KEY NOT NULL,
 	categoria varchar(50) NOT NULL,
 	id_user INTEGER NOT NULL,
 	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de categoria que
  -- possui o id_user do usuário 
);

-------------Criando tabela cartão de crédito---------------
CREATE TABLE cartao_credito (
	id_cartao_credito SERIAL PRIMARY KEY NOT NULL,
	num_cartao_credito bigint NOT NULL,
	data_fatura varchar(60) NOT NULL,
	limite float NOT NULL,
	anuidade float NOT NULL,
	fatura float NOT NULL,
	adicional_juro float default NULL,
	id_user INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de cartão de crédito que
  -- possui o id_user do usuário 
);

-------------Criando tabela cartão de débito---------------
CREATE TABLE cartao_debito (
	id_cartao_debito SERIAL PRIMARY KEY NOT NULL,
	num_cartao_debito bigint NOT NULL,
	cartao_principal bool NOT NULL,
	saldo float NOT NULL,
	id_user INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
  --caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de cartão de débito que
  -- possui o id_user do usuário 
);

-------------Criando tabela de receitas---------------
CREATE TABLE receitas (
	id_receita SERIAL PRIMARY KEY NOT NULL,
	fonte_receita INTEGER NOT NULL,
	data_receita varchar(60) NOT NULL,
	forma_de_alocacao varchar(60) NOT NULL,
	valor_receita float NOT NULL,
	se_repete boolean NOT NULL,
	id_user INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CATEGORIA FOREIGN kEY(fonte_receita) REFERENCES "categoria" ON DELETE CASCADE ON UPDATE CASCADE
  	--caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de receita que
  	-- possui o id_user do usuário 
	
	--caso seja alterado/deletado o valor do id_categoria, também será alterado/deletado a tupla de receita que
  	-- possui o id_categoria de categoria
);

-------------Criando tabela de despesa---------------

CREATE TABLE despesa (
	id_despesa SERIAL PRIMARY KEY NOT NULL,
	categoria_despesa INTEGER NOT NULL,
	data_despesa varchar(60) NOT NULL,
	tipo_despesa boolean NOT NULL,
	num_parcelas int NULL,
	status boolean NOT NULL,
	id_user INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CATEGORIA FOREIGN kEY(categoria_despesa) REFERENCES "categoria" ON DELETE CASCADE ON UPDATE CASCADE
  	--caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla da despesa que
  	-- possui o id_user do usuário 
	
	--caso seja alterado/deletado o valor do id_categoria, também será alterado/deletado a tupla da despesa que
  	-- possui o id_categoria de categoria
);

-------------Criando tabela de totais--------------
CREATE TABLE totais (
	id_total SERIAL PRIMARY KEY NOT NULL,
	total_receita float NOT NULL,
	total_despesa float NOT NULL,
	parcela_credito float NULL,
	id_user INTEGER NOT NULL,
	id_receita INTEGER NOT NULL,
	id_despesa INTEGER NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY(id_user) REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_RECEITA FOREIGN kEY(id_receita) REFERENCES "receitas" ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_DESPESA FOREIGN kEY(id_despesa) REFERENCES "despesa" ON DELETE CASCADE ON UPDATE CASCADE
  	--caso seja alterado/deletado o valor do id_user, também será alterado/deletado a tupla de totais que
  	-- possui o id_user do usuário 
	
	--caso seja alterado/deletado o valor do id_receita, também será alterado/deletado a tupla de totais que
  	-- possui o id_receita
	
	--caso seja alterado/deletado o valor do id_despesa, também será alterado/deletado a tupla de totais que
  	-- possui o id_despesa
);
