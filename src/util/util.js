//export function refrestPage() { window.location.reload() }

const api = process.env.REACT_APP_API_URL || 'calendario-bem-estar-b4iu.vercel.app/bemEstar';
var XLSX = require('xlsx')
const moment = require('moment')


module.exports = {
   urlAgendamento: api +'/agendar',
   urlDeleteAgendamento: api + '/deleteAgendamento/',
   urlDelAgendamento: api + '/delAgendamento/',
   urlHorariosDisponiveis: api + '/horariosDisponivies',
   urlGetAgendamento : api + '/agendas/',
   urlPUTagendamento: api + '/update/',
   urlReagendamento: api + '/Reagendar/',
   urlGEThistorico: api + '/agendash/',
   urlGEThorarioFuncio: api + '/horarioFuncionamento/',
   urlPUThorarioFuncio: api + '/horarioFuncio',
   urlPosthorarioServico:  api + '/criarHorarioServico',
   urllogin:  api + '/login',
   urllogout:  api + '/logout',
   urlAdmin:  api + '/admin/users',


   refrestPage:  () => { window.location.reload() },


   ExportToExcel: async (modo,dados) => {
     

        // Verifica se os dados são um array e se não está vazio
        if (!Array.isArray(dados) || dados.length === 0) {
          console.log('Dados vazios ou inválidos');
          return;
        }
      
        const rows = [];
      
        // Cria um array com os cabeçalhos
        const headers = Object.keys(dados[0]);
        rows.push(headers);
      
        // Cria um objeto para cada item de dados e adiciona à matriz de linhas
        dados.forEach((item) => {
          const row = Object.values(item);
          rows.push(row);
        });
      
        // Cria uma nova planilha do Excel
        const ws = XLSX.utils.aoa_to_sheet(rows);
      
        // Adiciona a data de criação no final do arquivo
        XLSX.utils.sheet_add_aoa(ws, [['Created ' + new Date().toISOString()]], { origin: -1 });
      
        // Cria um novo livro do Excel e adiciona a planilha a ele
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Agendamentos');
      
        // Salva o arquivo no formato XLSX
        XLSX.writeFile(wb, `agendamento-${modo}.xlsx`);
      
      
      
   } 
    

 

};
