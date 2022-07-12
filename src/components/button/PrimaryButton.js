import DefaultButton from "./DefaultButton";

const PrimaryButton = ({ children, onClick, isDisabled, isLink, link }) => {
  return (
    <DefaultButton
      onClick={onClick}
      isDisabled={isDisabled}
      isLink={isLink}
      link={link}
      className='hover:bg-darkpink border-yellow bg-pink'
    >
      {children}
    </DefaultButton>
  );
};

export default PrimaryButton;
