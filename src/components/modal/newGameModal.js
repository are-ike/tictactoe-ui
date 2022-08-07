import Modal from ".";
import SecondaryButton from "../button/SecondaryButton";
import PrimaryButton from "../button/PrimaryButton";

const NewGameModal = ({ show, setShow, onAccept, onDecline, playerNo }) => {
  return (
    <Modal show={show} setShow={setShow} className={'w-[500px]'}>
      <p className="text-pink mb-12 text-3xl text-center">
        Player {playerNo} wants to play again.
        <br /> Are you interested?
      </p>

      <div className="flex gap-x-4 items-center">
        <SecondaryButton onClick={onDecline} className="border-pink text-pink">
          no
        </SecondaryButton>
        <PrimaryButton onClick={onAccept}>yes</PrimaryButton>
      </div>
    </Modal>
  );
};

export default NewGameModal;
