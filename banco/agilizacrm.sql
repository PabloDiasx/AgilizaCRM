-- ============================================================
-- AgilizaCRM - Banco de Dados v2.0 (InnoDB + Foreign Keys)
-- ============================================================
-- Migrado de MyISAM para InnoDB para suporte a:
--   ✅ Foreign Keys (integridade referencial)
--   ✅ Transações ACID
--   ✅ Row-level locking (melhor concorrência)
--   ✅ Crash recovery automático
-- ============================================================
-- Host: 127.0.0.1:3306
-- Versão do servidor: 9.1.0
-- Data da migração: 07/12/2025
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;  -- Desativa temporariamente para permitir DROP/CREATE
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ============================================================
-- CRIAÇÃO DO BANCO DE DADOS
-- ============================================================
CREATE DATABASE IF NOT EXISTS `agilizacrm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `agilizacrm`;

-- ============================================================
-- TABELAS "PAI" (sem dependências)
-- Estas tabelas são referenciadas por outras, então criamos primeiro
-- ============================================================

-- --------------------------------------------------------
-- Tabela: cargos
-- Propósito: Define os papéis/permissões dos usuários
-- Referenciada por: usuarios
-- --------------------------------------------------------
DROP TABLE IF EXISTS `cargos`;
CREATE TABLE `cargos` (
  `id_cargo` int NOT NULL AUTO_INCREMENT,
  `nome_cargo` varchar(50) NOT NULL,
  `permissoes` text,
  PRIMARY KEY (`id_cargo`),
  UNIQUE KEY `nome_cargo` (`nome_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Cargos e permissões do sistema';

INSERT INTO `cargos` (`id_cargo`, `nome_cargo`, `permissoes`) VALUES
(1, 'Admin', 'all'),
(2, 'Vendedor', 'standard'),
(3, 'Gerente', 'standard'),
(4, 'Suporte', 'standard');

-- --------------------------------------------------------
-- Tabela: contas
-- Propósito: Empresas/clientes cadastrados
-- Referenciada por: contatos
-- --------------------------------------------------------
DROP TABLE IF EXISTS `contas`;
CREATE TABLE `contas` (
  `id_conta` int NOT NULL AUTO_INCREMENT,
  `nome_empresa` varchar(150) NOT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `setor` varchar(50) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_conta`),
  UNIQUE KEY `cnpj` (`cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Empresas e contas de clientes';

INSERT INTO `contas` (`id_conta`, `nome_empresa`, `cnpj`, `setor`, `endereco`, `cidade`) VALUES
(1, 'Tech Solutions Ltda', NULL, 'Tecnologia', NULL, 'São Paulo'),
(2, 'Varejo Express', NULL, 'Varejo', NULL, 'Rio de Janeiro'),
(3, 'Consultoria Alpha', NULL, 'Serviços', NULL, 'Belo Horizonte'),
(4, 'Mega Corp', NULL, 'Educação', 'Rua Exemplo, 123', 'Belo Horizonte'),
(5, 'Padaria do João', NULL, 'Indústria', 'Rua Exemplo, 123', 'São Paulo'),
(6, 'Startup Innovation', NULL, 'Serviços', 'Rua Exemplo, 123', 'Rio de Janeiro'),
(7, 'Logística Veloz', NULL, 'Serviços', 'Rua Exemplo, 123', 'Curitiba'),
(8, 'Safe Bank', NULL, 'Educação', 'Rua Exemplo, 123', 'Curitiba'),
(9, 'Hospital Central', NULL, 'Varejo', 'Rua Exemplo, 123', 'Porto Alegre'),
(10, 'Escola Futuro', NULL, 'Indústria', 'Rua Exemplo, 123', 'Rio de Janeiro');

-- --------------------------------------------------------
-- Tabela: funisdevenda
-- Propósito: Funis de venda (pipelines)
-- Referenciada por: estagiosdefunil
-- --------------------------------------------------------
DROP TABLE IF EXISTS `funisdevenda`;
CREATE TABLE `funisdevenda` (
  `id_funil` int NOT NULL AUTO_INCREMENT,
  `nome_funil` varchar(100) NOT NULL,
  PRIMARY KEY (`id_funil`),
  UNIQUE KEY `nome_funil` (`nome_funil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Funis de venda configuráveis';

INSERT INTO `funisdevenda` (`id_funil`, `nome_funil`) VALUES
(1, 'Vendas Padrão');

-- --------------------------------------------------------
-- Tabela: campanhas
-- Propósito: Campanhas de marketing
-- Referenciada por: ninguém
-- --------------------------------------------------------
DROP TABLE IF EXISTS `campanhas`;
CREATE TABLE `campanhas` (
  `id_campanha` int NOT NULL AUTO_INCREMENT,
  `nome_campanha` varchar(150) NOT NULL,
  `canal` varchar(50) NOT NULL,
  `status` enum('Ativa','Pausada','Finalizada') NOT NULL DEFAULT 'Ativa',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_campanha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Campanhas de marketing';

-- ============================================================
-- TABELAS "FILHAS" NÍVEL 1 (dependem das tabelas pai)
-- ============================================================

-- --------------------------------------------------------
-- Tabela: usuarios
-- Propósito: Usuários do sistema
-- Depende de: cargos
-- Referenciada por: contatos, oportunidades, atividades, logsdeauditoria
-- --------------------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `id_cargo` int NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_usuarios_cargo` (`id_cargo`),
  
  -- 🔑 FOREIGN KEY: Garante que o cargo existe
  -- ON DELETE RESTRICT: Impede deletar cargo se houver usuários vinculados
  -- ON UPDATE CASCADE: Se o id_cargo mudar, atualiza aqui também
  CONSTRAINT `fk_usuarios_cargo` 
    FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Usuários do sistema CRM';

INSERT INTO `usuarios` (`id_usuario`, `nome`, `email`, `senha_hash`, `id_cargo`, `ativo`) VALUES
(1, 'Administrador', 'admin@agilizacrm.com', '$argon2id$v=19$m=65536,t=3,p=4$7d07R8g55zwnZExpDQEAoA$DJO5SXrBrxMGAla1QEzjUuLaNxQPMgKzTWyX165AUbQ', 1, 1),
(2, 'João Vendedor', 'vendedor@agilizacrm.com', '$argon2id$v=19$m=65536,t=3,p=4$UWpNSSlFSGltDeE8p7S2tg$NARlAEwtjpp15oyO+efkgq+8TtCp6ua0I8tkpHX4D2k', 2, 1);

-- --------------------------------------------------------
-- Tabela: estagiosdefunil
-- Propósito: Estágios dentro de cada funil
-- Depende de: funisdevenda
-- Referenciada por: oportunidades
-- --------------------------------------------------------
DROP TABLE IF EXISTS `estagiosdefunil`;
CREATE TABLE `estagiosdefunil` (
  `id_estagio` int NOT NULL AUTO_INCREMENT,
  `id_funil` int NOT NULL,
  `nome_estagio` varchar(100) NOT NULL,
  `ordem` int NOT NULL,
  PRIMARY KEY (`id_estagio`),
  UNIQUE KEY `uk_funil_estagio` (`id_funil`, `nome_estagio`),
  KEY `idx_estagios_funil` (`id_funil`),
  
  -- 🔑 FOREIGN KEY: Garante que o funil existe
  -- ON DELETE CASCADE: Se deletar o funil, deleta os estágios também
  CONSTRAINT `fk_estagios_funil` 
    FOREIGN KEY (`id_funil`) REFERENCES `funisdevenda` (`id_funil`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Estágios do funil de vendas';

INSERT INTO `estagiosdefunil` (`id_estagio`, `id_funil`, `nome_estagio`, `ordem`) VALUES
(1, 1, 'Prospecção', 1),
(2, 1, 'Qualificação', 2),
(3, 1, 'Proposta', 3),
(4, 1, 'Negociação', 4),
(5, 1, 'Fechamento', 5);

-- ============================================================
-- TABELAS "FILHAS" NÍVEL 2 (dependem das tabelas nível 1)
-- ============================================================

-- --------------------------------------------------------
-- Tabela: contatos
-- Propósito: Pessoas de contato (leads/clientes)
-- Depende de: contas, usuarios
-- Referenciada por: oportunidades, atividades, historicodemensagens
-- --------------------------------------------------------
DROP TABLE IF EXISTS `contatos`;
CREATE TABLE `contatos` (
  `id_contato` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `id_conta` int DEFAULT NULL,
  `id_proprietario` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contato`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`),
  KEY `idx_contatos_conta` (`id_conta`),
  KEY `idx_contatos_proprietario` (`id_proprietario`),
  
  -- 🔑 FOREIGN KEY: Conta pode ser NULL (contato sem empresa)
  -- ON DELETE SET NULL: Se deletar a conta, o contato continua existindo
  CONSTRAINT `fk_contatos_conta` 
    FOREIGN KEY (`id_conta`) REFERENCES `contas` (`id_conta`)
    ON DELETE SET NULL 
    ON UPDATE CASCADE,
    
  -- 🔑 FOREIGN KEY: Proprietário é obrigatório
  -- ON DELETE RESTRICT: Não pode deletar usuário se tiver contatos
  CONSTRAINT `fk_contatos_proprietario` 
    FOREIGN KEY (`id_proprietario`) REFERENCES `usuarios` (`id_usuario`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Contatos e leads do CRM';

INSERT INTO `contatos` (`id_contato`, `nome`, `email`, `telefone`, `id_conta`, `id_proprietario`, `data_criacao`) VALUES
(1, 'Carlos Silva', 'carlos@techsolutions.com', '11999990001', 1, 1, '2025-12-07 00:07:07'),
(2, 'Ana Souza', 'ana@varejoexpress.com', '21999990002', 2, 1, '2025-12-07 00:07:07'),
(3, 'Roberto Mendes', 'roberto@consultoriaalpha.com', '31999990003', 3, 1, '2025-12-07 00:07:07'),
(4, 'Julia Pereira', 'julia@techsolutions.com', '11999990004', 1, 1, '2025-12-07 00:07:07'),
(5, 'Ana Oliveira', 'ana.oliveira0@exemplo.com', '11999990000', 2, 1, '2025-12-07 00:12:56'),
(6, 'Bruno Santos', 'bruno.santos100@exemplo.com', '11999990100', 3, 1, '2025-12-07 00:13:21'),
(7, 'Ana Santos', 'ana.santos101@exemplo.com', '11999990101', 2, 2, '2025-12-07 00:13:21'),
(8, 'Patricia Oliveira', 'patricia.oliveira102@exemplo.com', '11999990102', 10, 1, '2025-12-07 00:13:21'),
(9, 'Ana Oliveira', 'ana.oliveira103@exemplo.com', '11999990103', 6, 2, '2025-12-07 00:13:21'),
(10, 'Ana Souza', 'ana.souza104@exemplo.com', '11999990104', 3, 1, '2025-12-07 00:13:21'),
(11, 'Bruno Souza', 'bruno.souza105@exemplo.com', '11999990105', 9, 2, '2025-12-07 00:13:21'),
(12, 'Ana Rodrigues', 'ana.rodrigues106@exemplo.com', '11999990106', 4, 1, '2025-12-07 00:13:21'),
(13, 'Carlos Souza', 'carlos.souza107@exemplo.com', '11999990107', 3, 1, '2025-12-07 00:13:21'),
(14, 'Fernanda Santos', 'fernanda.santos108@exemplo.com', '11999990108', 5, 1, '2025-12-07 00:13:21'),
(15, 'Bruno Santos', 'bruno.santos109@exemplo.com', '11999990109', 7, 2, '2025-12-07 00:13:21'),
(16, 'Ana Oliveira', 'ana.oliveira110@exemplo.com', '11999990110', 10, 1, '2025-12-07 00:13:21'),
(17, 'Julia Almeida', 'julia.almeida111@exemplo.com', '11999990111', 3, 2, '2025-12-07 00:13:21'),
(18, 'Ana Santos', 'ana.santos112@exemplo.com', '11999990112', 8, 2, '2025-12-07 00:13:21'),
(19, 'Julia Almeida', 'julia.almeida113@exemplo.com', '11999990113', 2, 1, '2025-12-07 00:13:21'),
(20, 'Patricia Oliveira', 'patricia.oliveira114@exemplo.com', '11999990114', 5, 1, '2025-12-07 00:13:21'),
(21, 'Pedro Silva', 'pedro.silva115@exemplo.com', '11999990115', 1, 1, '2025-12-07 00:13:21'),
(22, 'Roberto Lima', 'roberto.lima116@exemplo.com', '11999990116', 7, 1, '2025-12-07 00:13:21'),
(23, 'Carlos Mendes', 'carlos.mendes117@exemplo.com', '11999990117', 8, 2, '2025-12-07 00:13:21'),
(24, 'Larissa Oliveira', 'larissa.oliveira118@exemplo.com', '11999990118', 6, 1, '2025-12-07 00:13:21'),
(25, 'Pedro Silva', 'pedro.silva119@exemplo.com', '11999990119', 9, 2, '2025-12-07 00:13:21'),
(26, 'Ana Oliveira', 'ana.oliveira120@exemplo.com', '11999990120', 3, 2, '2025-12-07 00:13:21'),
(27, 'Fernanda Santos', 'fernanda.santos121@exemplo.com', '11999990121', 5, 2, '2025-12-07 00:13:21'),
(28, 'Roberto Lima', 'roberto.lima122@exemplo.com', '11999990122', 6, 1, '2025-12-07 00:13:21'),
(29, 'Bruno Pereira', 'bruno.pereira123@exemplo.com', '11999990123', 6, 2, '2025-12-07 00:13:21'),
(30, 'Larissa Pereira', 'larissa.pereira124@exemplo.com', '11999990124', 7, 1, '2025-12-07 00:13:21');

-- ============================================================
-- TABELAS "FILHAS" NÍVEL 3 (dependem das tabelas nível 2)
-- ============================================================

-- --------------------------------------------------------
-- Tabela: oportunidades
-- Propósito: Negócios/deals em andamento
-- Depende de: contatos, estagiosdefunil, usuarios
-- Referenciada por: atividades
-- --------------------------------------------------------
DROP TABLE IF EXISTS `oportunidades`;
CREATE TABLE `oportunidades` (
  `id_oportunidade` int NOT NULL AUTO_INCREMENT,
  `nome_oportunidade` varchar(255) NOT NULL,
  `valor_estimado` decimal(10,2) NOT NULL DEFAULT '0.00',
  `id_contato_principal` int NOT NULL,
  `id_estagio_atual` int NOT NULL,
  `id_usuario_responsavel` int NOT NULL,
  `data_fechamento_prevista` date DEFAULT NULL,
  `status` enum('Aberta','Ganha','Perdida') NOT NULL DEFAULT 'Aberta',
  PRIMARY KEY (`id_oportunidade`),
  KEY `idx_oport_contato` (`id_contato_principal`),
  KEY `idx_oport_estagio` (`id_estagio_atual`),
  KEY `idx_oport_responsavel` (`id_usuario_responsavel`),
  
  -- 🔑 FOREIGN KEY: Contato principal é obrigatório
  -- ON DELETE RESTRICT: Não pode deletar contato se tiver oportunidades
  CONSTRAINT `fk_oport_contato` 
    FOREIGN KEY (`id_contato_principal`) REFERENCES `contatos` (`id_contato`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    
  -- 🔑 FOREIGN KEY: Estágio do funil
  -- ON DELETE RESTRICT: Não pode deletar estágio se tiver oportunidades nele
  CONSTRAINT `fk_oport_estagio` 
    FOREIGN KEY (`id_estagio_atual`) REFERENCES `estagiosdefunil` (`id_estagio`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    
  -- 🔑 FOREIGN KEY: Vendedor responsável
  -- ON DELETE RESTRICT: Não pode deletar vendedor se tiver oportunidades
  CONSTRAINT `fk_oport_responsavel` 
    FOREIGN KEY (`id_usuario_responsavel`) REFERENCES `usuarios` (`id_usuario`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Oportunidades de venda (deals)';

INSERT INTO `oportunidades` (`id_oportunidade`, `nome_oportunidade`, `valor_estimado`, `id_contato_principal`, `id_estagio_atual`, `id_usuario_responsavel`, `data_fechamento_prevista`, `status`) VALUES
(1, 'Licença Software Anual', 12000.00, 1, 3, 1, '2026-01-05', 'Aberta'),
(2, 'Consultoria Implantação', 5000.00, 2, 2, 1, '2026-01-05', 'Aberta'),
(3, 'Renovação Contrato', 8500.00, 3, 4, 1, '2026-01-05', 'Aberta'),
(4, 'Upgrade Plano Enterprise', 25000.00, 1, 1, 1, '2026-01-05', 'Aberta'),
(5, 'Consultoria Mensal - 1', 27720.00, 15, 5, 2, '2026-01-29', 'Aberta'),
(6, 'Projeto Web - 2', 24834.00, 24, 3, 2, '2025-12-15', 'Perdida'),
(7, 'Projeto Web - 3', 12224.00, 10, 5, 2, '2025-12-21', 'Aberta'),
(8, 'Treinamento Equipe - 4', 23820.00, 12, 5, 2, '2026-01-07', 'Aberta'),
(9, 'Manutenção Servidor - 5', 40211.00, 30, 5, 1, '2025-12-31', 'Ganha'),
(10, 'Licença Anual - 6', 15631.00, 23, 4, 2, '2026-01-26', 'Aberta'),
(11, 'Manutenção Servidor - 7', 39206.00, 12, 5, 2, '2025-12-21', 'Ganha'),
(12, 'Licença Anual - 8', 10811.00, 8, 4, 1, '2025-11-28', 'Aberta'),
(13, 'App Mobile - 9', 12156.00, 13, 1, 2, '2026-01-31', 'Aberta'),
(14, 'App Mobile - 10', 8885.00, 13, 3, 1, '2025-12-28', 'Aberta'),
(15, 'App Mobile - 11', 31382.00, 30, 4, 2, '2026-01-30', 'Aberta'),
(16, 'App Mobile - 12', 1027.00, 23, 5, 1, '2025-12-16', 'Ganha'),
(17, 'Treinamento Equipe - 13', 10445.00, 22, 3, 1, '2025-12-07', 'Aberta'),
(18, 'Treinamento Equipe - 14', 35208.00, 20, 5, 2, '2026-01-14', 'Ganha'),
(19, 'App Mobile - 15', 8479.00, 17, 4, 2, '2026-01-25', 'Aberta'),
(20, 'Projeto Web - 16', 15998.00, 22, 3, 2, '2025-12-28', 'Aberta'),
(21, 'Manutenção Servidor - 17', 19054.00, 19, 2, 2, '2026-01-14', 'Aberta'),
(22, 'Manutenção Servidor - 18', 5288.00, 22, 2, 2, '2026-01-06', 'Aberta'),
(23, 'Consultoria Mensal - 19', 7773.00, 18, 2, 1, '2026-01-04', 'Aberta'),
(24, 'App Mobile - 20', 21012.00, 30, 5, 2, '2025-12-09', 'Ganha');

-- --------------------------------------------------------
-- Tabela: atividades
-- Propósito: Tarefas e atividades agendadas
-- Depende de: oportunidades (opcional), contatos, usuarios
-- --------------------------------------------------------
DROP TABLE IF EXISTS `atividades`;
CREATE TABLE `atividades` (
  `id_atividade` int NOT NULL AUTO_INCREMENT,
  `id_oportunidade` int DEFAULT NULL,
  `id_contato` int NOT NULL,
  `id_usuario_criador` int NOT NULL,
  `tipo` enum('Ligacao','Reuniao','Email','Tarefa','Lembrete') NOT NULL,
  `descricao` text,
  `data_hora_agendada` timestamp NULL DEFAULT NULL,
  `concluida` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_atividade`),
  KEY `idx_ativ_oportunidade` (`id_oportunidade`),
  KEY `idx_ativ_contato` (`id_contato`),
  KEY `idx_ativ_criador` (`id_usuario_criador`),
  
  -- 🔑 FOREIGN KEY: Oportunidade é opcional
  -- ON DELETE SET NULL: Se deletar a oportunidade, atividade continua
  CONSTRAINT `fk_ativ_oportunidade` 
    FOREIGN KEY (`id_oportunidade`) REFERENCES `oportunidades` (`id_oportunidade`)
    ON DELETE SET NULL 
    ON UPDATE CASCADE,
    
  -- 🔑 FOREIGN KEY: Contato é obrigatório
  CONSTRAINT `fk_ativ_contato` 
    FOREIGN KEY (`id_contato`) REFERENCES `contatos` (`id_contato`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    
  -- 🔑 FOREIGN KEY: Criador da atividade
  CONSTRAINT `fk_ativ_criador` 
    FOREIGN KEY (`id_usuario_criador`) REFERENCES `usuarios` (`id_usuario`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Atividades e tarefas do CRM';

-- --------------------------------------------------------
-- Tabela: historicodemensagens
-- Propósito: Histórico de comunicação com contatos
-- Depende de: contatos
-- --------------------------------------------------------
DROP TABLE IF EXISTS `historicodemensagens`;
CREATE TABLE `historicodemensagens` (
  `id_mensagem` int NOT NULL AUTO_INCREMENT,
  `id_contato` int NOT NULL,
  `tipo_canal` enum('WhatsApp','Email','Chatbot') NOT NULL,
  `texto_original` text NOT NULL,
  `sentimento_ia` varchar(10) DEFAULT NULL,
  `direcao` enum('Entrada','Saida') NOT NULL,
  `data_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mensagem`),
  KEY `idx_msg_contato` (`id_contato`),
  
  -- 🔑 FOREIGN KEY: Contato é obrigatório
  -- ON DELETE CASCADE: Se deletar contato, deleta o histórico também
  CONSTRAINT `fk_msg_contato` 
    FOREIGN KEY (`id_contato`) REFERENCES `contatos` (`id_contato`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Histórico de mensagens com contatos';

-- --------------------------------------------------------
-- Tabela: logsdeauditoria
-- Propósito: Registro de ações para auditoria
-- Depende de: usuarios (opcional)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `logsdeauditoria`;
CREATE TABLE `logsdeauditoria` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `data_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acao` varchar(255) NOT NULL,
  `detalhes` text,
  PRIMARY KEY (`id_log`),
  KEY `idx_log_usuario` (`id_usuario`),
  
  -- 🔑 FOREIGN KEY: Usuário pode ser NULL (ações do sistema)
  -- ON DELETE SET NULL: Se deletar usuário, mantém o log
  CONSTRAINT `fk_log_usuario` 
    FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
    ON DELETE SET NULL 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
COMMENT='Logs de auditoria do sistema';

-- ============================================================
-- REATIVA FOREIGN KEYS E FINALIZA
-- ============================================================
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
-- Para verificar se a migração funcionou, execute:
-- SHOW TABLE STATUS WHERE Engine = 'InnoDB';
-- 
-- Para ver as Foreign Keys criadas:
-- SELECT TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME 
-- FROM information_schema.KEY_COLUMN_USAGE 
-- WHERE TABLE_SCHEMA = 'agilizacrm' AND REFERENCED_TABLE_NAME IS NOT NULL;
-- ============================================================
