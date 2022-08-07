import DefaultButton from "./DefaultButton";

const PrimaryButton = ({
  children,
  onClick,
  isDisabled,
  isLink,
  link,
  state,
  className
}) => {
  return (
    <DefaultButton
      onClick={onClick}
      isDisabled={isDisabled}
      isLink={isLink}
      link={link}
      state={state}
      className={"hover:bg-darkpink border-yellow bg-pink " + className}
    >
      {children}
    </DefaultButton>
  );
};

export default PrimaryButton;
