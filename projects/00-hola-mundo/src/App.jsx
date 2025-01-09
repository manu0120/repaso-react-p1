import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    // const profileImageUrl = 'https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51'
    // const profileImageUrl = `https://unavatar.io/${username}`
    const username = 'oscar_varela'
    const name = 'Oscar Varela'
    const formatUserName = (userName) => `@${userName}`

    return (
        <div className='App'>
            <TwitterFollowCard userName={username} name={name} isFollowing={false} formatUserName={formatUserName}/>
            <TwitterFollowCard userName="mig_hernandez" name="Miguel Hernandez" isFollowing formatUserName={formatUserName}/>
            <TwitterFollowCard userName="miguel_hernandez" name={name} isFollowing={false} formatUserName={formatUserName}/>
        </div>
    )
}