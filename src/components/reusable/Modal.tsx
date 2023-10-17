import * as React from "react";
import * as ReactDOM from "react-dom";
import clsx from "clsx";
import { RiCloseFill } from "react-icons/ri";

type ModalProps = {
  width?: number | string;
  className?: string;
  visible: boolean;
  onCancel: () => void;
  maskClosable?: boolean;
  centerPosition?: boolean;
  title?: string;
  closeIcon?: boolean | null;
};

const ModalComp = ({
  width = 500,
  className,
  children,
  visible,
  onCancel,
  maskClosable = true,
  centerPosition = false,
  title,
  closeIcon = true,
}: React.PropsWithChildren<ModalProps>) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const modalWrapperRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setIsOpen(true);
    } else {
      const modal = modalRef.current;
      const modalWrapper = modalWrapperRef.current;
      if (!modal || !modalWrapper) return;
      modal.classList.add("closing");
      modalWrapper.classList.add("closing");
      modal.addEventListener(
        "animationend",
        () => {
          setIsOpen(false);
        },
        { once: true }
      );
    }
  }, [visible]);

  React.useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
  }, [modalRef.current]);

  React.useEffect(() => {
    if (maskClosable) {
      document.addEventListener("mousedown", (event: any) => {
        if (
          modalWrapperRef.current?.contains(event.target) &&
          !modalRef.current?.contains(event.target)
        ) {
          onCancel();
        }
      });
    }
  }, [maskClosable]);

  return isOpen ? (
    <div
      ref={modalWrapperRef}
      className="modal-wrapper"
    >
      <div
        ref={modalRef}
        className={clsx(
          !centerPosition ? "mx-auto mb-auto mt-[100px]" : "m-auto",
          "p-5 rounded-md border modal bg-white",
          className
        )}
        style={{ width }}
      >
        <div className="relative">
          {title ? <h5 className="font-bold mb-5">{title}</h5> : null}
          {closeIcon ? (
            <div className="absolute top-0 right-0">
              <button onClick={onCancel} className="text-gray-500 k p-1 border rounded-md shadow-sm cursor-pointer flex justify-center items-center">
                <RiCloseFill />
              </button>
            </div>
          ) : null}
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const renderComponent = (
    <ModalComp {...props} />
  );

  return ReactDOM.createPortal(renderComponent, document.body);
}

export default Modal;