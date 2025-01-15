import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    // const profileImageUrl = 'https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51'
    // const profileImageUrl = `https://unavatar.io/${username}`
    const username = 'oscarmiguel'
    const name = 'Oscar Miguel'
    // const formattedUserName = <span>@manu_hdzz</span>
    
    const format = (userName) => '@' + userName
    /* ℹ️ Si en cada uno de los componentes se pone formatUserName={formatUserName()}, se le pasa la ejecución de la función. Lo que se le pasa al componente es el resultado de la ejecución de la función. Lo que se quiere es que se le pase la función y que luego se ejecute en el componente.
    
    ¿se ejecuta la función cada vez que se renderiza el componente, lo cual es ineficiente.?
    */
    const miguel_hernandez = {userName: "miguel_hernandez", formatUserName: format}

    return (
        <div className='App'>
            <TwitterFollowCard userName={username} name={name} formatUserName={format}
                initialIsFollowing={false}/>
            <TwitterFollowCard userName="mig_hernandez" name="Miguel Hernandez" formatUserName={format} initialIsFollowing/>
            
            {/* Uso de REST_OPERATOR (no confundir con el spread operator): ℹ No es recomendable usarlo porque
            se puede mandar información de más, o porque puede hacer que
            por temas de optimización el componente se rerenderice sin 
            necesidad*/}
            <TwitterFollowCard { ... miguel_hernandez} initialIsFollowing={false}>
                <strong>Miguel Hernández</strong>
            </TwitterFollowCard>
        </div>
    )
}