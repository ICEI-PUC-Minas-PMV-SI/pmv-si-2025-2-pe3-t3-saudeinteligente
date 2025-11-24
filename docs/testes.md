# 5. PLANO DE TESTES DE SOFTWARE
   
Nesta etapa devem ser realizados dois tipos de avaliação: por observação de sessão de uso (teste com usuários) e por inspeção (avaliação heurística, realizada pelos especialistas em usabilidade). Foram disponibilizados em "Material de Apoio" modelos para o registro dos testes que deverão ser realizados da seguinte maneira:
•	Na avaliação heurística, cada integrante do grupo deverá preencher a planilha correspondente ao teste (arquivo Avaliação_Heurística.xlsx). Ao final, os resultados deverão ser compilados em arquivo único de mesmo formato.
•	Na avaliação por observação de sessão de uso, deverão ser definidas tarefas em quantidade igual ao número de integrantes do grupo (ex.: grupo com 5 integrantes, 5 tarefas) e documentadas no relatório de testes com usuário (arquivo Relatório_de_Testes_com_Usuário.docx). Cada integrante do grupo deverá realizar o teste com um usuário distinto (ex.: grupo com 5 integrantes, 5 usuários deverão ser escolhidos, um por cada membro, para a realização dos testes).

Ao final, os relatórios gerados por cada membro deverão ser disponibilizados aqui, juntamente com a planilha consolidada da avaliação heurística.
____________________________________________________________________________________________________________________

## Avaliação Heurística (Inspeção por Especialistas)

Cada integrante do grupo deve preencher uma planilha individual (Avaliação_Heurística.xlsx). Essa avaliação usa heurísticas de usabilidade (como as de Nielsen, por exemplo: visibilidade do status do sistema, correspondência entre sistema e mundo real, controle e liberdade do usuário, etc.) para identificar problemas no sistema sem usuários reais.

* Como Compilar em Arquivo Único:

Cada integrante envia sua planilha preenchida.
Um membro (ou o grupo) consolida em uma única planilha, adicionando uma coluna "Integrante" para identificar quem identificou cada problema. Por exemplo, combine as linhas de todos e calcule uma severidade média se houver conflitos. Salve como "Avaliação_Heurística_Consolidada.xlsx".

Avaliação por Observação de Sessão de Uso (Testes com Usuários)
Defina tarefas iguais ao número de integrantes (ex.: 3 tarefas para 3 membros). Cada integrante testa com um usuário distinto (ex.: 3 usuários). Documente no Relatório_de_Testes_com_Usuário.docx, incluindo: descrição das tarefas, perfil do usuário, observações, problemas encontrados, sugestões e métricas (ex.: tempo para completar tarefa, taxa de sucesso).

* Tarefas Definidas (para Grupo de 3):
 ***
Tarefa | Proficional | Discriçao 
  --- | --- | ---
  Tarefa 1 | Paciente | Faça login no sistema e visualize seu histórico de consultas e exames
  Tarefa 2 | Médico | Faça login, autorize acesso a um paciente específico e registre um diagnóstico
  Tarefa 3 | Administrador | Faça login, adicione um novo usuário médico e gere um relatório de uso do sistema


## Conteúdo do Relatório (Relatório_de_Testes_com_Usuário.docx, Preenchido por Integrante 1):

* Relatório de Testes com Usuário:
***

Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  |Integrante Responsável | Integrante 1 |  |
|  |Usuário Testado | João Silva (Perfil: Paciente, Idade: 45 anos, Experiência com Tecnologia: Básica) |  |
|  |Data do Teste | 15/10/2023 |  |
|  |Ambiente | Computador desktop em laboratório, sem distrações |  |
|  |Descrição da Tarefa | Faça login no sistema e visualize seu histórico de consultas e exames |  |

* Passos Observados:

Usuário inseriu login e senha corretos.
Navegou para a aba "Histórico".
Visualizou lista de consultas e clicou em um exame para detalhes.

***
* Problemas Identificados:

Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  |Tempo para completar | 3 minutos (meta: 2 minutos)|  |
|  |Usuário hesitou na navegação, dizendo| "Onde está o histórico? É confuso." (Problema de usabilidade: menus não intuitivos)|  |
|  |Taxa de sucesso| 100% (concluiu, mas com frustração)|  |

* Sugestões de Melhoria:

Reorganizar menu principal com ícones maiores e labels claros.
Adicionar tutorial inicial para pacientes.
Outras Observações: Usuário elogiou a segurança (login rápido), mas sugeriu notificações por e-mail para novos exames.

 ***
* Métricas:
  
Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  | Tempo Médio | 3 min |  |
|  | Erros | 0 |  |
|  | Satisfação (escala 1-5) | 4 (bom, mas pode melhorar) |  |

***
* Relatório de Testes com Usuário:
  
Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  |Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  |Integrante Responsável| Integrante 2|  |
|  |Usuário Testado|Dra. Maria Oliveira (Perfil: Médico, Idade: 38 anos, Experiência: Avançada)|  |
|  |Data do Teste|16/10/2023|  |
|  |Ambiente|Tablet em ambiente clínico simulado|  |
|  |Descrição da Tarefa|Faça login, autorize acesso a um paciente específico e registre um diagnóstico|  |

* Passos Observados:

Login bem-sucedido.
Buscou paciente por nome e autorizou acesso.
Registrou diagnóstico em formulário.

 ***
* Problemas Identificados:
 
Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  |Tempo|4 minutos (meta: 3 minutos)|  |
|  |Usuária comentou|"A autorização é lenta; precisa de confirmação rápida." (Problema: fluxo de autorização complexo)|  |
|  |Taxa de sucesso|100%|  |
|  |Sugestões|Simplificar autorização com um botão "Autorizar e Acessar"|  |
|  |Outras Observações|Elogiou interoperabilidade com exames externos|  |

  ***
* Métricas:

Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | ---
|Tempo Médio|4 min|  |
|Erros|0|  |
|Satisfação|4|  |

  ***
* Relatório de Testes com Usuário:

Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
--- | --- | --- | ---
|  |Integrante Responsável|Integrante 3|  |
|  |Usuário Testado|Carlos Admin (Perfil: Administrador, Idade: 50 anos, Experiência: Intermediária)|  |
|  |Data do Teste|17/10/2023|  |
|  |Ambiente|Computador desktop|  |
|  |Descrição da Tarefa|Faça login, adicione um novo usuário médico e gere um relatório de uso do sistema|  |

* Passos Observados:

Login.
Adicionou usuário via painel.
Gerou relatório.

 ***
* Problemas Identificados:
 
Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

Caminhos |  | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
 --- | --- | --- | ---
|  |Tempo | 5 minutos (meta: 4 minutos)|  |
|  |Usuário disse | "Relatório demora a carregar; precisa de filtros melhores." (Problema: performance e usabilidade)|  |
|  |Taxa de sucesso | 100%|  |
|  |Sugestões | Otimizar geração de relatórios e adicionar filtros pré-definidos|  |
|  |Outras Observações |Preocupação com privacidade em relatórios|  |

 ***
* Métricas:
 
Projeto (Nome do Sistema):
Equipe:
					
Nome do Avaliador:
Data:            				
Participante Nº:

 Caminhos | | Sucesso na execuçao da tarefa | Anotaçoes/Observaçoes |
 --- | --- | --- | ---
|  |Tempo Médio|5 min|  |
|  |Erros|0|  |
|  |Satisfação|3|  |


 ***
 ## Questionario de apresentaçao geral do sistema:
 ***
Você já ouviu falar desse tipo de sistema?
- [ ] Sim
- [ ] Nao 
Caso sim, diga-me o que você sabe sobre:

Qual foi a sua ipressao sobre as atividades propostas?
- [ ] Facil
- [ ] Medio
- [ ] Dificil

Você acha que este sistema é atual?
- [ ] Sim
- [ ] Nao 
Caso sim, diga-me por quê:

O que voce gostou mais do sistema?
- [ ] Facil interaçao
- [ ] Compativel com qualquer idade
- [ ] Outros:

O que voce menos gostou do sistema?
- [ ] Dificil interaçao
- [ ] Imompativel com algumas idade
- [ ] Outros:

Ha alguma coisa que voce acha que esta faltando no sisstema?
- [ ] Funçao
- [ ] INteraçao
- [ ] Conteudo
- [ ] Outros:

Voce recomendaria esse sistema para um amigo ou parente?
- [ ] Sim
- [ ] Nao
- [ ] Talvez


 ***
Como Compilar e Submeter:

Cada integrante envia seu relatório individual.
Consolide em um documento único (ex.: "Relatórios_Testes_Consolidados.docx"), adicionando uma seção de síntese com problemas comuns (ex.: navegação confusa em todos os perfis) e recomendações gerais (ex.: melhorar menus e adicionar tutoriais).
Submeta aqui: os 3 relatórios individuais + o consolidado + a planilha heurística consolidada.
Material de apoio para esta etapa:
 ***


# Avaliação Heurística
Cada integrante do grupo deve preencher uma planilha individual (Avaliação_Heurística.xlsx), avaliando o sistema protótipo com base nas 10 heurísticas de Nielsen (visibilidade do status do sistema, correspondência entre sistema e mundo real, controle e liberdade do usuário, consistência e padrões, prevenção de erros, reconhecimento em vez de lembrança, flexibilidade e eficiência de uso, design estético e minimalista, ajuda aos usuários a reconhecer, diagnosticar e recuperar erros, e ajuda e documentação).


## Preenchimento Individual (para o Integrante 1, focando na Persona 1 - Dra. Ana Beatriz Costa):


  ***
* Heurística 1: Visibilidade do status do sistema

1. Problema identificado: Durante o acesso ao histórico de pacientes, não há feedback visual claro sobre o carregamento de dados (ex.: spinner ou barra de progresso).
2. Severidade (escala 1-4, onde 4 é alta): 3 (pode causar frustração em consultas rápidas).
3. Sugestão: Adicionar indicadores de carregamento para melhorar a percepção de rapidez.


 ***
* Heurística 2: Correspondência entre sistema e mundo real

1. Problema identificado: Terminologia médica não é explicada, o que pode confundir médicos com menos experiência.
2. Severidade: 2.
3. Sugestão: Incluir glossários integrados.


 ***
* Heurística 3: Controle e liberdade do usuário

1. Problema identificado: Não há botão de "cancelar" fácil durante o registro de diagnósticos.
2. Severidade: 3.
3. Sugestão: Adicionar atalhos de undo/redo.


***
* Heurística 4: Consistência e padrões

1. Problema identificado: Ícones para "salvar" variam entre telas.
2. Severidade: 2.
3. Sugestão: Padronizar ícones conforme guidelines de UI.

***
* Heurística 5: Prevenção de erros

1. Problema identificado: Falta validação em tempo real para prescrições (ex.: alertas para dosagens incorretas).
2. Severidade: 4 (risco de erros médicos).
3. Sugestão: Implementar validações automáticas.

***
* Heurística 6: Reconhecimento em vez de lembrança

1. Problema identificado: Menus de navegação exigem memorização de caminhos.
2. Severidade: 3.
3. Sugestão: Usar breadcrumbs e menus visíveis.

 ***
* Heurística 7: Flexibilidade e eficiência de uso
 
1. Problema identificado: Interface não se adapta a usuários experientes (ex.: atalhos de teclado ausentes).
2. Severidade: 2.
3. Sugestão: Adicionar personalização para médicos.


***
* Heurística 8: Design estético e minimalista

1. Problema identificado: Telas sobrecarregadas com informações desnecessárias.
2. Severidade: 3.
3. Sugestão: Simplificar layouts focando no essencial.

  ***
* Heurística 9: Ajuda a reconhecer, diagnosticar e recuperar erros

1. Problema identificado: Mensagens de erro são vagas (ex.: "Erro 404" sem explicação).
2. Severidade: 4.
3. Sugestão: Fornecer mensagens claras e ações de recuperação.

  ***
* Heurística 10: Ajuda e documentação

1. Problema identificado: Falta tutorial integrado para novos usuários.
2. Severidade: 2.
3. Sugestão: Incluir tooltips e FAQs.


## Compilação Consolidada (Arquivo Único Avaliação_Heurística.xlsx): 
Após cada integrante preencher sua planilha, compile em uma única tabela.(linhas por heurística, colunas por integrante):
 ***
Heurística|Integrante 1 (Persona 1)|Integrante 2 (Persona 2)|Integrante 3 (Persona 3)|Integrante 4 (Persona 4)|Problemas Comuns|Sugestões Consolidadas|
--- | --- | --- | --- | --- | --- | ---
|Visibilidade|Severidade 3: Feedback ausente|Severidade 2: Status confuso|Severidade 3: Carregamento lento|Severidade 2: Indicadores vagos|Carregamento sem feedback|Adicionar spinners e barras|
|Correspondência|Severidade 2: Terminologia|Severidade 4: Linguagem técnica|Severidade 2: Siglas não explicadas|Severidade 3: Jargão administrativo||Linguagem inacessível|Glossários e explicações|
|... (continuar para as 10 heurísticas)|...|...|...|...|...|...|

Essa compilação destaca padrões (ex.: foco em acessibilidade para pacientes e eficiência para médicos/administradores).

## Avaliação por Observação de Sessão de Uso (Teste com Usuários)
Defina 4 tarefas (uma por integrante, correspondendo às personas). Cada integrante testa com um usuário real (ex.: recrutado via clínica ou simulado), observando a sessão e registrando em Relatório_de_Testes_com_Usuário.docx. Inclua: descrição da tarefa, perfil do usuário, observações, métricas (tempo, erros, satisfação) e recomendações.


 ***
* Tarefas Definidas (para Grupo de 4):

 
|Tarefa 1 (Integrante 1, Persona 1 - Dra. Ana Beatriz Costa)| "Acesse o histórico de um paciente autorizado, registre um diagnóstico e prescrição, e encaminhe para outra especialidade."|
--- | ---
|Tarefa 2 (Integrante 2, Persona 2 - João Henrique da Silva)| "Visualize seus resultados de exames, histórico médico e próximas consultas; receba uma notificação simulada."|
|Tarefa 3 (Integrante 3, Persona 3 - Marcos Vinícius Oliveira)| "Receba alertas de consulta, controle exames e acesse um painel administrativo para gerenciar permissões."|
|Tarefa 4 (Integrante 4, Persona 4 - Carla Mendes Rocha)| "Acesse dashboards para relatórios de produtividade, controle permissões e cadastre um novo médico."|


 ***
* Relatório Individual (para Integrante 1, Tarefa 1):

 
|Perfil do Usuário Testado|Médica de 40 anos, familiarizada com tecnologia, recrutada de uma unidade pública|  |
--- | --- | ---
|Descrição da Sessão|O usuário logou com sucesso, mas demorou 2 minutos para localizar o histórico devido a navegação confusa. Registrou diagnóstico rapidamente, mas relatou frustração com integração de dados|X|
|Métricas|Tempo total|5 minutos; Erros: 1 (clique errado); Satisfação (escala 1-5): 4|
|Observações|Interface intuitiva, mas precisa de integração melhor entre especialidades|X|
|Sugestão|Adicionar filtros por data/especialidade|X|
|Recomendações|Melhorar usabilidade para consultas rápidas, alinhando com objetivos da persona|X|


  ***
* Compilação dos Relatórios: Ao final, cada integrante submete seu relatório aqui:

Tarefa |   |
--- | ---
|Tarefa 1:|Médicos precisam de rapidez; foco em integração de dados|
|Tarefa 2:|Pacientes com baixa familiaridade precisam simplicidade e notificações|
|Tarefa 3:|Usuários tech-savvy querem controle e explicações|
|Tarefa 4:|Administradores precisam dashboards eficientes|

Esses exemplos ajudam a identificar problemas como usabilidade para médicos (rapidez), acessibilidade para pacientes (simplicidade) e eficiência para administradores (relatórios). 

[Avaliação_Heurística.xlsx](https://github.com/user-attachments/files/16501461/Avaliacao_Heuristica.xlsx) 

[Relatório_de_Testes_com_Usuário.docx](https://github.com/user-attachments/files/16501456/Relatorio_de_Testes_com_Usuario.docx)

[Relatório_de_Testes_com_Usuário_exemplo.docx](https://github.com/user-attachments/files/16501459/Relatorio_de_Testes_com_Usuario_exemplo.docx)
