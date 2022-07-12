import { Link } from "react-router-dom";


const DefaultButton = ({ children, onClick, isDisabled, isLink, link, className }) => {
  const classNames = "border px-8 py-4 rounded duration-300 text-4xl disabled:opacity-50 w-fit " + className;

  const render = () => {
    if (isLink) {
      return (
        <Link className={classNames} to={link}>
          {children}
        </Link>
      );
    } else {
      return (
        <button onClick={onClick} disabled={isDisabled} className={classNames}>
          {children}
        </button>
      );
    }
  };
  return render();
};

export default DefaultButton;
