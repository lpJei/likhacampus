import { useNavigate } from "react-router-dom";

const ViewProject = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)} className="flex flex-1 gap-3">
        <MoveLeft fontSize={1} /> Return
      </button>
      <div>ViewProject</div>
    </>
  );
};

export default ViewProject;
