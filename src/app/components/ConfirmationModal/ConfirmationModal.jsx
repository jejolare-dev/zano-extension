import React, { useCallback, useContext } from "react";
import cls from "./ConfirmationModal.module.scss";
import Modal from "../../components/UI/Modal/Modal";
import Button, { ButtonThemes } from "../UI/Button/Button";
import { Store } from "../../store/store-reducer";

const ConfirmationModal = ({ isOpen, onClose }) => {
  const { state } = useContext(Store);
  const { method, params } = state.confirmationModal;

  const closeHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <div className={cls.ConfirmationModal}>
        <div className={cls.title}>Confirmation</div>
        <div className={cls.subTitle}>Confirm and send tx</div>
        <div className={cls.table}>
          <div className={cls.tableRow}>
            <div className={cls.label}>method:</div>
            <div className={cls.value}>{method}</div>
          </div>
          <div className={cls.tableRow}>
            <div className={cls.label}>params:</div>
            <div className={cls.value}>
              {params.map((param) => (
                <span key={param}>{param}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={cls.actions}>
          <Button onClick={onClose} theme={ButtonThemes.Outline}>Cancel</Button>
          <Button>Sign</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
