# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta seção, serão detalhados os requisitos funcionais e não funcionais do Sistema de Prontuário Eletrônico, considerando o cenário atual das pesquisas sobre o tema, os desafios identificados e as necessidades de profissionais e pacientes. O objetivo é definir de forma clara as funcionalidades e as condições necessárias para que o sistema atenda às demandas de segurança, acessibilidade e eficiência no registro e acompanhamento de informações médicas.


## 3.1 Objetivos deste documento

### 3.1.1. Requisitos Funcionais

Os requisitos funcionais descrevem as funções que o sistema deve executar. Entre eles, destacam-se:

* Cadastro de Usuários: possibilitar o registro de pacientes, médicos e administradores, com níveis de permissão distintos.

* Autenticação Segura: acesso ao sistema somente por login e senha, garantindo segurança das informações.

* Acesso Restrito:

Pacientes podem visualizar apenas seus próprios dados (consultas, exames, diagnósticos).

Médicos têm acesso apenas aos prontuários dos pacientes previamente agendados.

Administradores (desenvolvedores/gestores do sistema) gerenciam cadastros, permissões e manutenção.

* Registro de Consultas e Exames: inserção, edição e atualização de informações sobre atendimentos médicos.

* Histórico de Saúde: manter o histórico completo do paciente, incluindo alergias, doenças pré-existentes, exames e tratamentos realizados.

* Agendamento de Consultas: permitir que pacientes solicitem consultas e médicos visualizem sua agenda.

* Relatórios Médicos: geração de relatórios para auxiliar no diagnóstico e acompanhamento da saúde do paciente.

### 3.1.2. Requisitos Não Funcionais

Os requisitos não funcionais estabelecem características de qualidade e restrições do sistema:

* Segurança: utilização de protocolos de criptografia para proteger dados sensíveis.

* Usabilidade: interface amigável, de fácil navegação para diferentes perfis de usuários.

* Disponibilidade: sistema acessível online 24/7, garantindo continuidade no atendimento.

* Escalabilidade: capacidade de suportar crescimento no número de usuários e registros sem perda de desempenho.

* Interoperabilidade: possibilidade de integração futura com outros sistemas de saúde e bases de dados governamentais.

* Privacidade: cumprimento da LGPD (Lei Geral de Proteção de Dados) para proteger informações pessoais dos pacientes.

### 3.1.3. Requisitos de Negócio

* Melhorar a organização e a eficiência dos serviços de saúde por meio da digitalização de informações.

* Reduzir falhas no atendimento decorrentes da ausência ou duplicidade de registros médicos.

* Aumentar a confiança dos profissionais e pacientes em relação ao armazenamento e compartilhamento seguro dos dados.

* Disponibilizar dados confiáveis para apoiar a tomada de decisão clínica e a formulação de políticas públicas de saúde.


## 3.2 Escopo do produto

O desenvolvimento de um sistema de Prontuário Eletrônico, com acesso protegido por login e senha, destinado a três perfis principais de usuários: pacientes, médicos e administradores. O sistema será estruturado para garantir a segurança e a confidencialidade das informações, respeitando o nível de acesso de cada usuário.

O paciente terá acesso restrito apenas aos seus próprios dados, incluindo histórico de consultas, exames e diagnósticos.
Já os médicos terão acesso exclusivo aos dados dos pacientes que forem previamente autorizados e agendados, possibilitando consultas mais rápidas e diagnósticos mais precisos.
Por fim, os administradores, representados pelos desenvolvedores do software, terão acesso total ao sistema com a responsabilidade de gerenciar, manter e garantir o bom funcionamento da plataforma.
O sistema será projetado com base nos avanços e desafios apontados em pesquisas sobre prontuários eletrônicos no Brasil, considerando questões como padronização de dados, interoperabilidade, privacidade e usabilidade.

Busca-se desenvolver uma ferramenta que, além de oferecer maior eficiência no registro e monitoramento das informações de saúde, contribua para superar obstáculos identificados em outras implementações, como dificuldades de adaptação dos profissionais e limitações de infraestrutura.
Integração de medidas de segurança, suporte a processos de triagem mais eficientes e a criação de relatórios que auxiliem gestores e profissionais na tomada de decisão, visando melhorar a qualidade do atendimento em saúde de forma prática, acessível e confiável.

### 3.2.1 Missão do produto
Centralizar e organizar o histórico de saúde dos pacientes em um portal seguro, promovendo a continuidade do cuidado, agilidade na triagem, precisão nos diagnósticos e a interoperabilidade das informações entre diferentes instituições de saúde.

### 3.2.2 Limites do produto
O Sistema de Prontuário Eletrônico não fornece:
- Processamento de cobrança ou faturamento de procedimentos (integração com sistemas financeiros é um requisito não funcional).
- Monitoramento remoto de dispositivos médicos (IoT).
- Avaliação de desempenho ou remuneração de profissionais de saúde.
- Serviços de telemedicina nativa (integração com plataformas de vídeo será considerada um requisito não funcional).

### 3.2.3 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Acesso centralizado e rápido ao histórico completo do paciente |	Essencial |
|2 | Redução de erros e duplicidade de exames | Essencial | 
|3 | Interface de usuário intuitiva (DCU) | Essencial | 
|4	| Lembretes de consultas	| Recomendável | 

## 3.3 Descrição geral do produto

O desenvolvimento de um sistema de Prontuário Eletrônico, com acesso protegido por login e senha, destinado a três perfis principais de usuários: pacientes, médicos e administradores. O sistema será estruturado para garantir a segurança e a confidencialidade das informações, respeitando o nível de acesso de cada usuário.

O paciente terá acesso restrito apenas aos seus próprios dados, incluindo histórico de consultas, exames e diagnósticos.
Já os médicos terão acesso exclusivo aos dados dos pacientes que forem previamente agendados, possibilitando consultas mais rápidas e diagnósticos mais precisos.
Por fim, os administradores, representados pelos desenvolvedores do software, terão acesso total ao sistema com a responsabilidade de gerenciar, manter e garantir o bom funcionamento da plataforma.
O sistema será projetado com base nos avanços e desafios apontados em pesquisas sobre prontuários eletrônicos no Brasil, considerando questões como padronização de dados, interoperabilidade, privacidade e usabilidade.

Busca-se desenvolver uma ferramenta que, além de oferecer maior eficiência no registro e monitoramento das informações de saúde, contribua para superar obstáculos identificados em outras implementações, como dificuldades de adaptação dos profissionais e limitações de infraestrutura.
Integração de medidas de segurança, suporte a processos de triagem mais eficientes e a criação de relatórios que auxiliem gestores e profissionais na tomada de decisão, visando melhorar a qualidade do atendimento em saúde de forma prática, acessível e confiável.

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|---|---|---|
| RF1 | Gerenciar Acesso e Perfil | Processamento de Login, Logout e manutenção de dados cadastrais para os perfis Médico, Paciente, Secretaria e Administrador. |
| RF2 | Gerenciar Prontuário | Inclusão, alteração e consulta do histórico clínico, incluindo histórico de doenças, alergias e medicamentos em uso. |
| RF3 | Visualizar Resultados de Exames | Permite ao Paciente e ao Médico acessar e baixar laudos e imagens (PDF/DICOM) associados ao prontuário. |
| RF4 | Assinatura Digital | Implementar a assinatura digital do profissional no registro do atendimento, conferindo validade legal. |

### 3.3.2 Requisitos Não Funcionais

| Código | Categoria | Requisito Não Funcional (Restrição) |
|---|---|---|
| RNF1 | Segurança/Legal | O sistema deve cumprir integralmente com a LGPD, com criptografia de ponta-a-ponta e controle de acesso baseado no Princípio do Mínimo Privilégio. |
| RNF02 | Usabilidade (DCU) | O tempo para realizar o registro completo de um atendimento de rotina (evolução) não deve ultrapassar 2 minutos, a fim de combater a resistência profissional. |
| RNF03 | Desempenho | Qualquer tela ou relatório deve ser carregado em no máximo 2 segundos. |
| RNF04 | Ambiente | A interface do usuário deve ser responsiva, funcionando corretamente em desktops, tablets e smartphones. |

### 3.3.3 Usuários 

| Ator | Descrição | Nível de Acesso no PEP |
|---|---|---|
| **Paciente** | Usuário que utiliza o sistema para acessar seu próprio histórico, resultados e gerenciar agendamentos. | Leitura do Próprio Prontuário, Escrita em Agendamento. |
| **Médico** | Profissional de saúde autorizado a registrar e alterar o histórico clínico, emitir diagnósticos e prescrições. | Leitura/Escrita de Prontuários (Apenas pacientes sob seu cuidado). |
| **Administrador** | Usuário gerente do sistema, responsável pela gestão de usuários (Médicos/Secretaria) e pela auditoria de logs de acesso. | Acesso Geral ao Sistema e Módulo de Auditoria. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
A Figura 1 ilustra as interações primárias entre os atores e o Sistema de Prontuário Eletrônico.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="440" height="657" alt="image" src="https://github.com/user-attachments/assets/82dc170a-766f-45c8-aa6a-0201da68174f" />



### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

**Gerenciar Prontuário (CSU01)**
* **Sumário:** O Paciente ou Médico realiza a gestão (inclusão, alteração, consulta) do histórico clínico, evolução, diagnóstico e prescrições do paciente.
* **Ator Primário:** Paciente, Médico.
* **Ator Secundário:** N/A.
* **Pré-condições:** O Usuário deve ser validado pelo Sistema.
* **Fluxo Principal:**
    1. O Usuário logado acessa a seção de Prontuário.
    2. O Sistema apresenta o Prontuário Eletrônico.
    3. O Usuário seleciona a operação desejada (visualização, inclusão de dado histórico, etc.) e o caso de uso termina.
* **Pós-condições:** O prontuário do paciente foi acessado/atualizado.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
<img width="397" height="318" alt="image" src="https://github.com/user-attachments/assets/2582cb5e-d19c-4319-b392-e39033cdf226" />




### 3.4.4 Descrições das Classes

| # | Nome | Descrição | Atributos Chave (Exemplos) |
|---|---|---|---|
| 1 | **Pessoa** | Entidade genérica para todos os usuários (Paciente, Médico, Administrador). | `idPessoa`, `nome`, `cpf`, **`tipoPerfil`**, `senha`. |
| 2 | **Prontuario** | Agrega todo o histórico clínico do paciente. **Relaciona-se 1:1 com Pessoa (Paciente).** | `idProntuario`, `dataCriacao`, **`idPessoa(FK)` (Paciente)**. |
| 3 | **Exame** | Registro e armazenamento de resultados de exames. **Cadastrado pela Pessoa (Paciente) e lido pela Pessoa (Médico).** | `idExame`, `tipoExame`, `resultado`, `anexo(caminho)`, `dataRealizacao`, **`idProntuario(FK)`**. |
| 4 | **Auditoria** | Registro de logs e operações críticas no sistema. **Acessado pelo Administrador.** | `idLog`, `dataHora`, `operacao`, **`idPessoa(FK)` (Usuário da ação)**. |
