function onEdit() {

    var guiaAtiva = SpreadsheetApp.getActive().getSheetName();
    
    if (guiaAtiva =="PASSEIOS"){
    
     var guia = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PASSEIOS");
    
    
    
        var linha = guia.getActiveCell().getRow();
        var coluna = guia.getActiveCell().getColumn();
    
        if (coluna =="5" || coluna =="7" && linha >"1"){
    
          var dados = guia.getRange(linha,5,1,3).getValues();
    
          var v1 = dados[0][0];
    
          if (v1 ==""){
            var v1 = "0";
    
          }
    
          var v2 = dados[0][2];
    
          if (v2 ==""){
            var v2 = "0";
    
          }
    
          if(v1 !=""|| v2 !=""){
    
            var multiplicar = parseFloat(v1)* parseFloat(v2);
    
            guia.getRange(linha,10).setValue(multiplicar);
          }
    
          if(v1 ==""&& v2 == ""||v1 == "0" && v2 =="0"){
            guia.getRange(linha,10).setValue("");
          }
    
    
          var seltion = guia.getSelection().getActiveRange().getA1Notation();
          
          var rg1 = seltion.split(":");
    
          var rg1 = rg1[0].replace(/[^0-9]/g,''); 
    
          var rg2 = seltion.split(":");
    
          if(rg2.length >1){
            var rg2 = rg2[2].replace(/[^0-9]/g,'');
            var rg2 = parseFloat(rg2)+ parseFloat(1);
    
          
          }else{
            var rg2 = 0;
          }
    
          if(rg1 != ""&& rg2 != ""){
    
            var linhainicial = rg1;
            var tl = parseFloat(rg2) - parseFloat(rg1);
    
            var dados= guia.getRange(linhainicial,5,tl,3).getValues();
    
            var i = 0;
    
            for(var linha = rg1; linha < rg2;linha++){
    
                var v1 = dados[i][0];
    
                if (v1 ==""){
                  var v1 = "0";
    
                }
    
                var v2 = dados[i][2];
    
                if (v2 ==""){
                  var v2 = "0";
    
                }
    
    
    
                if(v1 !=""|| v2 !=""){
    
                  var multiplicar = parseFloat(v1)* parseFloat(v2);
    
                  guia.getRange(linha,10).setValue(multiplicar);
                }
    
                if(v1 ==""&& v2 == ""||v1 == "0" && v2 =="0"){
                  guia.getRange(linha,10).setValue("");
                }
    
                i = i +1;
            
            }
    
          }
    
       
        }
    
        linha.length = 0
        
    
        
    
        }
    
     }





     function Classificar() {
  
        var guiaAtiva = SpreadsheetApp.getActive() .getSheetName();
      
        if(guiaAtiva =="PASSEIOS"){
      
         var planilha = SpreadsheetApp.getActiveSpreadsheet();
         var guiaDados = planilha.getSheetByName("PASSEIOS");
      
         guiaDados.getRange("A2:O").sort({column: 2,ascending: true});
      
        }
       
      }

      


      function createPDF() {
 
        var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PASSEIOS")//Pega a aba da planilha
       
        var folderIter =DriveApp.getFoldersByName("PDF PASSEIOS")//Pega a pasta dentro do google drive
        var pdfFolder = folderIter.next(); //entra na pasta
       
        var SpreadsheetApp_id = SpreadsheetApp.getActiveSpreadsheet().getId(); // pega o id da planilha em questão
        var SpreadsheetFile = DriveApp.getFileById(SpreadsheetApp_id); // pega a planinha dentro do drive pelo id
        var blob = SpreadsheetFile.getAs(MimeType.PDF);//Pega a planilha dentro do google drive como pdf
        pdfFolder.createFile(blob).setName("Passeios Do mês")
       }
       

       function ClassificarVendedores() {
  
        var guiaAtiva = SpreadsheetApp.getActive() .getSheetName();
      
        if(guiaAtiva =="VENDEDORES"){
      
         var planilha = SpreadsheetApp.getActiveSpreadsheet();
         var guiaDados = planilha.getSheetByName("VENDEDORES");
      
         guiaDados.getRange("A2:I").sort({column: 2,ascending: true});
      
        }
       
      }
      
 
        


