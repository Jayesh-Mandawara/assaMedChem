import "./features/shared/global.scss";
import { router } from "./auth.routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
