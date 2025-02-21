import PropTypes from 'prop-types';

export const Square = ({children, updateBoard, index, isSelected}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
      updateBoard(index)
    }
    return (
      // callback: comprueba que se pulse la tecla espaciadora o la tecla enter
      <div 
        className={className} 
        onClick={handleClick} 
        role="button" 
        tabIndex="0" 
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        onTouchStart={handleClick}
      >
        {children}
      </div>
    )
}

// si se quisiera poner una propiedad obligatoria, se puede hacer de esta manera: PropTypes.func.isRequired
Square.propTypes = {
  children: PropTypes.node,
  updateBoard: PropTypes.func,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
};