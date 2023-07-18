//export function refrestPage() { window.location.reload() }

const {  api } = require("../service/api");


module.exports = {
   urlAgendamento: api +'/agendar',
   urlDeleteAgendamento: api + '/deleteAgendamento/',
   urlHorariosDisponiveis: api + '/horariosDisponivies',
   urlGetAgendamento : api + '/agendas/',
   urlPUTagendamento: api + '/update/',
   urlGEThistorico: api + '/agendash/',
   urlGEThorarioFuncio: api + '/horarioFuncionamento/',
   urlPUThorarioFuncio: api + '/update/horarioFuncio',
   urlPosthorarioServico:  api + '/criarHorarioServico',


   refrestPage:  () => { window.location.reload() },

 

};
