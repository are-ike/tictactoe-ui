import DefaultButton from "./DefaultButton";

const SecondaryButton = ({ children, onClick, isDisabled, isLink, link }) => {
  return (
    <DefaultButton
      onClick={onClick}
      isDisabled={isDisabled}
      isLink={isLink}
      link={link}
      className='hover:border-pink hover:text-pink'
    >
      {children}
    </DefaultButton>
  );
};

export default SecondaryButton;
