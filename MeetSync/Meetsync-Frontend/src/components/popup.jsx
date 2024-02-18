import PropTypes from "prop-types"

const Popup = ({
    message,
    handleDeleteTrue,
    handleDeleteFalse
}) =>{

    return(
        <div className="modal-backdrop">
            <div className="modal-content">
                <p>{message}</p>
                <button className="button modal-btn-cancel" onClick={handleDeleteFalse}>Cancel</button>
                <button className="button modal-btn-delete" onClick={handleDeleteTrue}>Confirm</button>
            </div>
        </div>
    )
}

Popup.propTypes = {
    message: PropTypes.string,
    handleDeleteTrue: PropTypes.func,
    handleDeleteFalse: PropTypes.func
}

export default Popup