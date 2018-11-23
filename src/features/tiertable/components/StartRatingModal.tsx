import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

interface RatingConfirmationModalProps {
  isModalOpen: boolean;
  userId: string;
  activityId: string;
}

const StartRatingModal = ({
  isModalOpen,
  userId,
  activityId
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
          pathname: `/activity/edit/${activityId}`,
          search: `?user=${userId}`
        }}
      >
        <button>Start Rating!</button>
      </Link>
    </Modal>
  );
};

export default StartRatingModal;
