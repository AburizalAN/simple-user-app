import * as ReactDOM from "react-dom/client";
import * as React from "react";
import clsx from "clsx";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

type MessageCompProps = {
  children: React.ReactNode;
  type: string;
  duration: number;
  closed: () => void;
};

type MessageProps = {
  type: string;
  content: string | React.ReactNode;
  duration?: number;
};

const MessageComp = ({
  children,
  type,
  duration,
  closed,
}: MessageCompProps) => {
  const [isClosed, setIsClosed] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    setTimeout(() => {
      setIsClosed(true);
    }, duration);
  }, []);

  React.useEffect(() => {
    if (isClosed) {
      const element = ref.current;
      if (element) {
        element.classList.add("closing");
        element.addEventListener(
          "animationend",
          () => {
            closed();
          },
          { once: true }
        );
      }
    }
  }, [isClosed]);

  return (
    <div ref={ref} className={clsx("message", type)}>
      <span className={clsx("message-icon-wrapper", type)}>
        {type === "success" ? <AiFillCheckCircle /> : type === "error" ? <AiFillExclamationCircle /> : null}
      </span>
      <span>{children}</span>
    </div>
  );
};

const message = ({ type, content, duration = 4000 }: MessageProps) => {
  const wrapper = document.createElement("div");
  const closed = () => {
    document.body.removeChild(wrapper);
  };
  const renderComponent = (
    <MessageComp type={type} duration={duration} closed={closed}>
      {content}
    </MessageComp>
  );

  document.body.appendChild(wrapper);
  const root = ReactDOM.createRoot(wrapper);
  root.render(renderComponent);
};

export default message;