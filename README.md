# Sistema Inteligente na Saúde

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Design Centrado no Usuário`

`SEMESTRE: 3º`

Um Sistema de Prontuário Eletrônico na área da saúde consiste em um portal seguro e centralizado, que reúne todas as informações médicas relevantes de um paciente, como histórico de doenças, alergias, consultas já realizadas, consultas agendadas, além de registros de exames e procedimentos. Esse sistema possibilita que médicos e pacientes tenham acesso rápido e organizado aos dados, permitindo a marcação de exames de forma prática, melhorando a comunicação entre clínicas, hospitais e laboratórios, e reduzindo a fragmentação das informações médicas.

Com credenciais autorizadas, o médico consegue acessar de maneira segura os dados completos do paciente, independentemente do plano de saúde utilizado. Isso proporciona uma triagem mais rápida, diagnósticos mais precisos e um acompanhamento contínuo e eficiente da evolução clínica. Além disso, o sistema evita retrabalho, duplicidade de exames e falhas por falta de informações, garantindo maior agilidade no atendimento e fortalecendo a qualidade do cuidado em saúde.

### Integrantes

* Rafael Alves Faria
* Lucas Perlatto Lotti Garcia

### Orientador

* Maria Ines Lage de Paula

## Planejamento

| Etapa | Atividades |
| :---: | :--- |
| **ETAPA 1** | [Introdução](docs/introducao.md) <br> [Estado da Arte](docs/estado.md) <br> [Referências](docs/referencias.md) |
| **ETAPA 2** | [Especificação de Requisitos de Software](docs/especificacao.md) |
| **ETAPA 3** | [Design de Interação](docs/design.md) |
| **ETAPA 4** | [Testes de Software](docs/testes.md) |
| **ETAPA 5** | [Apresentação](docs/apresentacao.md) |

## 1. Introdução

A visualização de dados na área da saúde é um recurso essencial para modernizar o atendimento médico e garantir maior eficiência nos processos clínicos. A proposta de um portal seguro e centralizado permite reunir informações completas dos pacientes, como histórico de doenças, alergias, consultas já realizadas, consultas futuras e registros de exames. Com isso, tanto pacientes quanto médicos podem acessar dados de forma prática e organizada, facilitando agendamentos, acompanhamentos e o compartilhamento de informações entre diferentes instituições de saúde.

Esse sistema promove uma triagem mais rápida e eficaz, já que o médico autorizado, por meio de credenciais de acesso, pode visualizar o quadro clínico completo do paciente, independentemente do plano de saúde utilizado. Dessa forma, o profissional dispõe de subsídios mais precisos para interpretar o estado de saúde do indivíduo, agilizando diagnósticos e reduzindo falhas por falta de informação. Além de melhorar a qualidade do atendimento, a integração de dados contribui para a continuidade do cuidado, a redução de custos e o fortalecimento da relação entre pacientes e profissionais da saúde.

### 1.1. Problema

A ausência de um sistema de Prontuário Eletrônico na área da saúde gera um grande problema na qualidade do atendimento médico e na gestão das informações dos pacientes. Atualmente, os dados ficam dispersos em diferentes clínicas, hospitais e laboratórios, muitas vezes sem comunicação entre si, o que dificulta o acesso rápido ao histórico clínico. Isso pode resultar em falhas no diagnóstico, repetição de exames já realizados, atrasos em consultas e dificuldades na marcação de procedimentos, além de comprometer a eficiência no acompanhamento do paciente.

Sem um portal seguro e centralizado, médicos enfrentam limitações para obter informações essenciais, como histórico de doenças, alergias e registros de atendimentos, o que atrapalha uma triagem rápida e precisa. A falta de integração também prejudica a continuidade do cuidado, já que cada profissional acessa apenas fragmentos do histórico, aumentando o risco de erros e dificultando a interpretação completa do estado de saúde do paciente. Dessa forma, a inexistência desse sistema compromete a agilidade, a segurança e a eficácia do atendimento médico.

### 1.2. Objetivos do Trabalho

Os principais objetivos de um prontuário eletrônico na área da saúde estão voltados para centralizar e organizar as informações médicas dos pacientes em um portal seguro e de fácil acesso. Esse recurso busca reunir dados completos, como histórico de doenças, alergias, consultas realizadas, consultas futuras e exames, permitindo maior agilidade na marcação de procedimentos e no acompanhamento clínico. Além disso, o sistema visa reduzir a fragmentação das informações, evitando retrabalho e falhas ocasionadas pela falta de dados atualizados.

Outro objetivo fundamental é fornecer ao médico, por meio de credenciais autorizadas, acesso rápido e confiável ao histórico do paciente, independentemente do plano de saúde utilizado. Isso possibilita uma triagem mais eficiente, diagnósticos mais precisos e interpretações rápidas sobre o estado clínico, favorecendo a continuidade do cuidado e a qualidade do atendimento. Dessa forma, o sistema não apenas moderniza os processos de saúde, mas também fortalece a segurança, a eficiência e a integração entre profissionais, pacientes e instituições de saúde.

### 1.3. Justificativa

A implementação de um prontuário eletrônico na área da saúde está relacionada à necessidade de superar a fragmentação das informações médicas, que atualmente se encontram dispersas em diferentes instituições e sistemas. Essa falta de centralização compromete a qualidade do atendimento, gera retrabalho, atrasos em diagnósticos e dificulta o acompanhamento contínuo dos pacientes. Com um portal seguro e integrado, é possível reunir dados completos, como histórico de doenças, alergias, consultas e exames, garantindo maior praticidade no acesso e na gestão das informações.

Além disso, o sistema se justifica por oferecer aos médicos credenciados acesso rápido e confiável às informações essenciais, independentemente do plano de saúde. Isso favorece triagens mais eficientes, diagnósticos precisos e uma interpretação ágil do estado clínico do paciente. Ao reduzir erros, duplicidade de exames e falhas de comunicação entre profissionais de saúde, a solução contribui diretamente para a melhoria da qualidade do atendimento, promovendo eficiência, segurança e maior humanização nos cuidados médicos.

### 1.4. Público-Alvo

O público-alvo da aplicação do prontuário eletrônico na saúde é amplo e abrange pacientes, profissionais de saúde e gestores hospitalares.

* Para os **pacientes**, esse sistema facilita a marcação de exames, o acompanhamento médico personalizado, a atualização de dados e a adesão a tratamentos.
* Já os **profissionais**, como médicos e enfermeiros, se beneficiam com suporte em diagnósticos e triagem mais ágil, reduzindo a sobrecarga de trabalho.
* **Gestores** e **instituições de saúde** também encontram vantagens na otimização de recursos e na melhoria da qualidade do atendimento.

Assim, o prontuário eletrônico apoia diferentes perfis dentro do ecossistema da saúde, promovendo eficiência e cuidado centrado no paciente.

## 2. Estado da Arte

* O campo de pesquisa sobre sistemas de integração de dados na saúde, especialmente no contexto do prontuário eletrônico, é dinâmico e tem avançado na avaliação de sua implementação e impacto na saúde pública e privada no Brasil. Os estudos desenvolvidos analisam, por exemplo, a transição de sistemas de informação na Atenção Primária à Saúde (APS), como a mudança do SIAB para o SISAB, e o uso de ferramentas como o Prontuário Eletrônico do Cidadão (PEC). Outras pesquisas investigam a relação entre o uso do prontuário eletrônico e a melhoria no acesso e na qualidade dos serviços, além dos desafios da implantação em diferentes estados, como no Rio Grande do Sul. Há também revisões sistemáticas que comparam o cenário brasileiro com a União Europeia e os Estados Unidos, ressaltando questões de gestão e segurança de dados, bem como estudos de caso em instituições específicas, como a rede de saúde de Belo Horizonte e hospitais privados de grande porte.

* As pesquisas estão distribuídas em várias regiões do país e envolvem diferentes instituições. Em Belo Horizonte, estudos conduzidos pela Secretaria Municipal de Saúde avaliaram o impacto da implantação do prontuário eletrônico na rede pública. Em São Paulo, experiências em hospitais como o Hospital de Base de São José do Rio Preto e em instituições privadas mostram diferentes formas de utilização do sistema. Em nível nacional, há investigações que utilizam dados de programas como o PMAQ-AB e o SISAB, além de publicações em repositórios como SciELO e ResearchGate. Essas pesquisas concluíram que os prontuários eletrônicos trazem benefícios claros, como a melhoria na organização das tarefas, maior monitoramento dos pacientes e aumento da qualidade da assistência prestada, além de facilitar o acesso aos serviços de saúde. No entanto, os desafios permanecem, como a adaptação dos profissionais, a carência de treinamento em informática, a infraestrutura limitada em várias regiões e, principalmente, a dificuldade de interoperabilidade entre diferentes sistemas.

* Apesar dos avanços, há divergências importantes entre os pesquisadores. Um exemplo é a queda no número de registros de atendimentos após a migração para o SISAB: para alguns, isso reflete problemas de adaptação e resistência dos profissionais, enquanto outros interpretam como uma melhoria na qualidade dos dados, eliminando duplicidades e inconsistências. Além disso, embora muitos profissionais reconheçam os benefícios do sistema, alguns relatam aumento do tempo de atendimento e dificuldades na relação com os pacientes, o que gera diferentes percepções sobre a real eficácia dos prontuários eletrônicos.

* Por fim, as pesquisas apontam aspectos que ainda carecem de maior abordagem. Entre eles estão a necessidade de padronização dos dados clínicos, a melhoria da interoperabilidade entre sistemas e a garantia da privacidade das informações dos pacientes. Também é preciso aprofundar análises sobre o impacto da transição entre sistemas, ampliar estudos em áreas específicas, como a psicologia, e explorar o papel dos prontuários eletrônicos na segurança do paciente e no suporte à decisão clínica, superando resistências culturais e técnicas. Esses pontos mostram que, embora já haja avanços significativos, ainda existem lacunas a serem preenchidas para consolidar um sistema de integração de dados em saúde realmente eficiente, seguro e acessível.

[(ENANCIB, 2023)](https://enancib.ancib.org/index.php/enancib/xxxiiienancib/paper/view/1966/1350).
[(AEDb, 2007)](https://www.aedb.br/seget/arquivos/artigos07/56_SEGET.pdf).
[(AEDb, 2007)](https://www.aedb.br/seget/arquivos/artigos07/56_SEGET.pdf).
[(Senac, 2016)](https://www1.sp.senac.br/hotsites/blogs/revistainiciacao/wp-content/uploads/2016/01/Exp_imp_util_PEP-v10-ABNT.pdf).
[(ENANCIB, 2023)](https://enancib.ancib.org/index.php/enancib/xxxiiienancib/paper/view/1966/1350).
[(AEDb, 2007)](https://www.aedb.br/seget/arquivos/artigos07/56_SEGET.pdf).
[(ENANCIB, 2023)](https://enancib.ancib.org/index.php/enancib/xxxiiienancib/paper/view/1966/1350).
[(Faccat)](https://seer.faccat.br/index.php/psi/article/view/1292/1323).


---

## Código

* [Código Fonte](src/codigo.md)

## Apresentação

* [Apresentação da solução](docs/apresentacao.md)
