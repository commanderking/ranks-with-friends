import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

interface RatingConfirmationModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  userId: string;
  activityId: string;
}

const RatingConfirmationModal = ({
  modalIsOpen,
  closeModal,
  userId,
  activityId
}: RatingConfirmationModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "50px",
          border: "5px solid black",
          textAlign: "center"
        }
      }}
    >
      <h4>Awesome! Your ratings have been submitted!</h4>

      <Link
        to={{
          pathname: `/activity/${activityId}`,
          search: `?user=${userId}`
        }}
      >
        <button>View Results</button>
      </Link>
      <button onClick={closeModal}>Edit Ratings</button>
    </Modal>
  );
};

export default RatingConfirmationModal;
