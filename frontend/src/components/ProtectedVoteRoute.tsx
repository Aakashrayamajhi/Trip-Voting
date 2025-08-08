import { Navigate } from "react-router-dom";

export default function ProtectedVoteRoute({ children }: { children: JSX.Element }) {
    const hasVoted = localStorage.getItem("trip-voting-completed");
    if (hasVoted) {
        return <Navigate to="/results" replace />;
    }
    return children;
}
