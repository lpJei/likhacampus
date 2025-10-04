import { forwardRef, useImperativeHandle, useRef } from "react";

const TermsNConditionsModal = forwardRef((props, ref) => {
  const modalRef = useRef();

  // Expose open() to parent
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current.showModal(),
    close: () => modalRef.current.close(),
  }));

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg">Terms and Conditions</h3>
          <p className="py-4 text-sm text-gray-600">
            <ul>
              By clicking on "Continue", I agree that:{" "}
              <li>I have read and accepted the community guidelines.</li>
              <li>
                I have read and agree to give my personal data for security and
                legitimate purposes
              </li>
              <li>
                I agree to receive notifications for announcements and updates
              </li>
              (Optional)
            </ul>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default TermsNConditionsModal;
