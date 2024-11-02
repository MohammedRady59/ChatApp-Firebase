import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectRouter({ isAllow, path, children }) {
  if (!isAllow) return <Navigate to={path} />;
  return children;
}

export default ProtectRouter;
