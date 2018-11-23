import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

interface RatingConfirmationModalProps {
  isModalOpen: boolean;
  userId: string;
  activityId: string;
  closeModal: () => void;
}

const StartRatingModal = ({
  isModalOpen,
  userId,
  activityId,
  closeModal
}: RatingConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isModalOpen}
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
      <h4>Looks like you've yet to enter your ratings! Let's get started!</h4>

      <Link
        to={{
          pathname: `/activity/${activityId}`,
          search: `?user=${userId}&mode=edit`
        }}
      >
        <button onClick={closeModal}>Start Rating!</button>
      </Link>
    </Modal>
  );
};

export default StartRatingModal;
