function enviarEmail() {
    try {
      
    var planilhaId = "16SdXvJ3oIoZdjlZC2xbCXzF7fCiM68f7WMCEzyzaXIE";
    var planilha = SpreadsheetApp.openById(planilhaId); // Abre a planilha pelo ID
    var abapasseios = planilha.getSheetByName("PASSEIOS"); // acessa a aba PASSEIIOS
    var abatotal = planilha.getSheetByName("TOTAL"); // acessa a aba TOTAL
    var abaemail = planilha.getSheetByName("VENDEDORES"); //acessa a aba VENDEDORES
    var abagrafico = planilha.getSheetByName("Grafico"); // acessa a aba Grafico
  
    planilha.getSheetByName("VENDEDORES").hideSheet(); // OCULTAR A ABA VENDEDORES
    planilha.getSheetByName("PENDENTES").hideSheet(); // OCULTAR A ABA EMAILS
    planilha.getSheetByName("AGENCIAS/PARCEIROS").hideSheet();
    planilha.getSheetByName("HOME").hideSheet();
    planilha.getSheetByName("RECEBIDOS").hideSheet();
    planilha.getSheetByName("PARCEIROS AVULSOS").hideSheet();
    
  
  
    var lista = abaemail.getLastRow() - 1;
  
  
    for (var i = 0; i < lista; i++) {
  
      var endemail = abaemail.getRange(i + 2, 4).getValue();
  
      var mensagem = {
  
        to: endemail,
        subject: "Relatório de comissões e passeios",
        body: "Esta é uma mensagem automática. Segue em anexo o relatório das comissões das vendas dos passeios do mês pela equipe da recepção. O restante pendente a receber(se caso houver), será incluso no próximo relatório, para a próxima divisão das comissões",
        name: "Motor de vendas",
        attachments: [planilha.getAs(MimeType.PDF).setName("PASSEIOS DO MES" + ".pdf")]
  
      }
      MailApp.sendEmail(mensagem);
  
       
  
    }
  
    
  
    planilha.getSheetByName("VENDEDORES").activate();
    planilha.getSheetByName("PENDENTES").activate();
    planilha.getSheetByName("AGENCIAS/PARCEIROS").activate();
    planilha.getSheetByName("HOME").activate();
    planilha.getSheetByName("RECEBIDOS").activate();
    planilha.getSheetByName("PARCEIROS AVULSOS").activate();
      
      // Retorna uma Promise para sinalizar a conclusão da atualização
      return new Promise((resolve, reject) => {
        // Simule um atraso de 3 segundos para a atualização
        setTimeout(() => {
          // Conclui a atualização
          resolve();
        }, 9000);
      });
    } catch (error) {
      console.error("Erro ao enviar e-mails: " + error.message);
      // Se ocorrer um erro, ainda resolvemos a Promise para que o código continue
      return Promise.resolve();
    }
  }
  
  function delCopy() {
  
    var planilhaId = "16SdXvJ3oIoZdjlZC2xbCXzF7fCiM68f7WMCEzyzaXIE";
    var planilha = SpreadsheetApp.openById(planilhaId); // Abre a planilha pelo ID
    var abapasseios = planilha.getSheetByName("PASSEIOS"); // acessa a aba PASSEIIOS
    var abatotal = planilha.getSheetByName("TOTAL"); // acessa a aba TOTAL
    var abaemail = planilha.getSheetByName("VENDEDORES"); //acessa a aba VENDEDORES
    var abagrafico = planilha.getSheetByName("Grafico"); // acessa a aba Grafico
    var abarecebidos = planilha.getSheetByName("RECEBIDOS"); // acessa a aba Grafico
  
    let app = SpreadsheetApp;
    let spreadsheet = app.getActiveSpreadsheet();
    let passeios = abapasseios;
    let finalizados = abarecebidos;
  
    if (!passeios || !finalizados) {
      console.error("Planilhas 'PASSEIOS' ou 'RECEBIDOS' não encontradas.");
      return;
    }
  
    let values = passeios.getRange('A2:o').getValues();
    let i = 2;
    let rowsDel = [];
    let contDel = 0;
  
    values.map((elem, ind, obj) => {
      if (elem[8] == 'RECEBIDO' || elem[8] == 'CANCELADO' || elem[13] == 'CANCELADO') {
        let lastRow = finalizados.getLastRow() + 1;
        passeios.getRange(`A${i}:o${i}`).copyTo(finalizados.getRange(`A${lastRow}:I${lastRow}`));
        rowsDel.push(i);
      }
      i++;
    });
  
    rowsDel.map((elem, ind, obj) => {
      passeios.deleteRow(elem - contDel);
      contDel++;
    });
  
    console.log("A função delCopy() está sendo executada após a atualização da planilha.");
  }
  
  // Chama enviarEmail() e depois executa outraFuncao() após a atualização da planilha
  enviarEmail().then(() => {
    delCopy();
  });