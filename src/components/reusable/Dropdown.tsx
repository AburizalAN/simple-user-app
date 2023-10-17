import * as React from "react";
import clsx from "clsx";

type DropdownProps = {
  children: (props: ChildProps) => React.ReactNode;
  content?: React.ReactNode;
  list?: {
    content: string | React.ReactNode,
    onClick?: () => void, 
  }[];
  position?: "left" | "right";
  toggleOutside?: boolean;
  forceClose?: boolean;
};

type ChildProps = {
  openDropdown: () => void;
  toggle: boolean;
};

const Dropdown = ({
  children,
  content,
  list,
  position = "left",
  toggleOutside = true,
  forceClose = false,
}: DropdownProps) => {
  const [toggle, setToggle] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const childProps: ChildProps = {
    openDropdown: () => setToggle((prev) => (prev ? false : true)),
    toggle: toggle,
  };

  const handleClose = () => {
    if (forceClose) {
      setIsOpen(false)
    }
    setToggle(false);
  }

  React.useEffect(() => {
    if (toggle) {
      setIsOpen(true);
    }
    if (!toggle && isOpen) {
      const element = ref.current;
      if (!element) return;
      element.classList.add("closing");
      element.addEventListener(
        "animationend",
        () => {
          setIsOpen(false);
        },
        { once: true }
      );
    }
  }, [toggle]);

  React.useEffect(() => {
    document.addEventListener("mousedown", (event: any) => {
      if (toggleOutside && !wrapperRef.current?.contains(event.target)) {
        handleClose();
      }
    });
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex">
      {children(childProps)}
      <div
        ref={ref}
        className={clsx(
          !isOpen && "hidden", 
          "dropdown z-50 bg-white rounded-md p-1 absolute top-full shadow-lg ring-1 ring-black ring-opacity-5",
          position === "left"
            ? "left-0"
            : position === "right"
            ? "right-0"
            : ""
        )}
      >
        {list ? (
          <div className="flex flex-col gap-y-1 w-56">
            {list.map((item, i) => (
              <div
                key={i}
                className="dropdown-item relative p-2 rounded-md text-sm hover:bg-violet-500 hover:text-white transition-all"
                onClick={() => {
                  handleClose();
                  if (item.onClick) {
                    item.onClick()
                  }
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        ) : null}
        {content}
      </div>
    </div>
  );
};

export default Dropdown;