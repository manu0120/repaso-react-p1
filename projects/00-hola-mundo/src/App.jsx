import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    // const profileImageUrl = 'https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51'
    // const profileImageUrl = `https://unavatar.io/${username}`
    const username = 'oscar_varela'
    const name = 'Oscar Varela'
    const format = (userName) => `@${userName}`

    /* ℹ️ Si en cada uno de los componentes se pone formatUserName={formatUserName()}, se le pasa la ejecución de la función. Lo que se le pasa al componente es el resultado de la ejecución de la función. Lo que se quiere es que se le pase la función y que luego se ejecute en el componente.
    
    ¿se ejecuta la función cada vez que se renderiza el componente, lo cual es ineficiente.?

    */

    return (
        <div className='App'>
            <TwitterFollowCard userName={username} name={name} isFollowing={false} formatUserName={format}/>
            <TwitterFollowCard userName="mig_hernandez" name="Miguel Hernandez" isFollowing formatUserName={format}/>
            <TwitterFollowCard userName="miguel_hernandez" name={name} isFollowing={false} formatUserName={format}/>
        </div>
    )
}