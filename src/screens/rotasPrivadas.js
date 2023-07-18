// rotas privadas
import TelaPsicologa from "../screensUsers/psicologa/psicologa"
import Telahistorico from "../screensUsers/psicologa/historico"
//import TelaPsicologa from "../screensUsers/massoterapeuta/massoterapia"
import AtendimentoEspecialista from "../screensUsers/psicologa/GerenciamentoAtendimento"


export default function RotasPrivadas() {
    return (
        <>
    <Stack.Screen name="UserPsicologa" component={TelaPsicologa} />
    <Stack.Screen name="Atendimento Especialista" component={AtendimentoEspecialista} />
    <Stack.Screen name="Tela Historico" component={Telahistorico} />
   

        </>

   
    )
}