import classnames from "../../utils/classnames";
const Modal = ({ show, setShow, children }) => {
  return (
    <div
      className={classnames(
        "bg-black bg-opacity-50 duration-300 absolute inset-0 flex items-center justify-center z-50",
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-white rounded-lg p-4 flex items-center flex-col border-yellow border border-[3px] max-w-full w-[500px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
