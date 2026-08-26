import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "./DashboardLayout";

function ProtectedLayout({ children }) {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </ProtectedRoute>
    );
}

export default ProtectedLayout;