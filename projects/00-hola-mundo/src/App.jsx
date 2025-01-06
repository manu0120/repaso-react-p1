import './App.css'

export function App() {
    const profileImageUrl = 'https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51'
    const name = 'Oscar Varela'
    const username = 'oscar_varela'

    return (
        <article>
            <header>
                <img src={profileImageUrl} alt="profile image" />
                <div>
                    <strong>{name}</strong>
                    <span>@{username}</span>
                </div>
            </header>

            <aside>
                <button>
                    Seguir
                </button>
            </aside>
        </article>
    )
}