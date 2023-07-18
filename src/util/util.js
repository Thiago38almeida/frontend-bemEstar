//export function refrestPage() { window.location.reload() }


module.exports = {
   urlAgendamento: 'http://localhost:9091/bemEstar/agendar',
   urlDeleteAgendamento: 'http://localhost:9091/bemEstar/deleteAgendamento/',
   urlHorariosDisponiveis: 'http://localhost:9091/bemEstar/horariosDisponivies',
   urlGetAgendamento : 'http://localhost:9091/bemEstar/agendas/',
   urlPUTagendamento: 'http://localhost:9091/bemEstar/update/',
   urlGEThistorico: 'http://localhost:9091/bemEstar/agendash/',
   urlGEThorarioFuncio: 'http://localhost:9091/bemEstar/horarioFuncionamento/',
   urlPUThorarioFuncio: 'http://localhost:9091/bemEstar/update/horarioFuncio',
   urlPosthorarioServico:  'http://localhost:9091/bemEstar/criarHorarioServico',


   refrestPage:  () => { window.location.reload() },

 

};
