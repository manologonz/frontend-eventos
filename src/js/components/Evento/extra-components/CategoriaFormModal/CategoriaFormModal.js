import React from 'react';
import Modal from "react-responsive-modal"
import CategoriaForm from "../../../Categoria/Crear/CategoriaForm";

const ColumnFormModal = (props) => {
    const { onSubmit, isOpen, closeModal } = props;
    const modalStyles = {
        modal: {
            width: "50%",
            borderRadius: "5px"
        }
    }
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            styles={modalStyles}
        >
            <div>
                <CategoriaForm onSubmit={onSubmit}/>
            </div>

        </Modal>
    );
};

export default ColumnFormModal;
