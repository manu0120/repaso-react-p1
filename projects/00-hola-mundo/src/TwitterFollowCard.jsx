import { useState } from 'react'

export function TwitterFollowCard ({ children, formatUserName, userName, name, initialIsFollowing }){
    // ℹ LAS PROPS SON INMUTABLES, no se pueden modificar. Si se quiere modificar, se debe crear un estado u otra variable
    
    // Desestructuración: permite extraer valores de un arreglo o propiedades de un objeto y asignarlos a variables de manera concisa.
    // Así, en lugar de acceder a los elementos del arreglo mediante índices, se asignan directamente a variables con nombres significativos,mejorando la legibilidad y mantenibilidad del código.
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    
    const imageSrc = `https://unavatar.io/${userName}`

    // renderizado condicional
    const textAux = isFollowing ? 'Siguiendo' : 'Seguir'

    const [text, setText] = useState(textAux)
    
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    

    const handleClick = () => {
        // prevIsFollowing es el estado anterior
        setIsFollowing((prevIsFollowing) => {
            const newIsFollowing = !prevIsFollowing;
            setText(newIsFollowing ? 'Siguiendo' : 'Seguir');
            return newIsFollowing;
        });
    }
    const handleHover = () => {
        if (isFollowing) {
            setText('Dejar de seguir')
        }
    }

    const handleMouseLeave = () => {
        if(text === 'Dejar de seguir' && isFollowing) {
            setText('Siguiendo')
        }
        if (isFollowing) {
            setText('Siguiendo')
        }
    }

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
                {/* Conseguimos que el botón sea dinámico */}
                <button className={buttonClassName}
                    onClick={handleClick}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleMouseLeave}>
                    {text}
                </button>
            </aside>
        </article>
    )
}