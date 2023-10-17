const Spinner = ({ width = 16, height = 16 }) => {
  return (
    <svg
      className="spinner"
      width={width}
      height={height}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};

export default Spinner;