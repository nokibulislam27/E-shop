import { Outlet } from "react-router-dom";
import SideBar from "../components/DashboardSideBar/SideBar";

const Dashboard = () => {
    return (
        <div className="grid grid-rows-1 md:grid-cols-12">
            <div className="col-span-2 z-50">
                <SideBar></SideBar>
            </div>
            <div className="col-span-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;