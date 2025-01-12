export function TwitterFollowCard ({ children, formatUserName, userName, name, isFollowing }){
    // ℹ LAS PROPS SON INMUTABLES, no se pueden modificar. Si se quiere modificar, se debe crear un estado u otra variable.
    const imageSrc = `https://unavatar.io/${userName}`

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                    className='tw-followCard-avatar'
                    src={imageSrc} 
                    alt="profile" 
                />
                <div className='tw-followCard-info'>
                    {/* ℹ Explicación RENDERIZADO CONDICIONAL ChatGPT: 
                    https://chatgpt.com/share/67844388-a44c-8011-8d8b-7af167f7c97b */}
                    {children ? 
                        children : 
                        <strong>{name}</strong>
                    }
                    <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className='tw-followCard-button'>
                    Seguir
                </button>
            </aside>
        </article>
    )
}