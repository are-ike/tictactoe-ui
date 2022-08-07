const Input = ({ value, setValue, isDisabled, onEnter }) => {
  const onKeyUp = (e) => {
    if (e.keyCode === 13 && value.trim().length) {
      onEnter();
    }
  };

  return (
    <input
      className="border rounded w-full border-white bg-transparent px-8 py-4 outline-0 text-4xl"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={onKeyUp}
      disabled={isDisabled}
    />
  );
};

export default Input;
