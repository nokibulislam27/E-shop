import useUsers from "../../../hooks/userUser";

const Admin = () => {
    const { data: userStats } = useUsers();
    return (
        <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Admin Dashboard
            </h2>
            <p className="mb-6 text-gray-600">
                Oversee platform operations and manage users and reviews.
            </p>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{userStats?.totalUsers || 0}</div>
                    <div className="stat-desc">Active and engaged</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Pending Reviews</div>
                    <div className="stat-value text-secondary">0</div>
                    <div className="stat-desc">Needing attention</div>
                </div>
            </div>
        </div>
    );
};

export default Admin;