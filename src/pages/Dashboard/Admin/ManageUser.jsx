import { MdDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/userUser";

const ManageUser = () => {
    const queryClient = useQueryClient();
    const { data, isLoading } = useUsers();
    const axiosSecure = useAxiosSecure();

    if (isLoading) {
        return <Loading />;
    }

    const users = data?.users || [];

    const handleRoleChange = async (userId, fullName, currentRole, newRole) => {
        if (currentRole === newRole) {
            return Swal.fire("No changes", "The user already has this role.", "info");
        }
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to change ${fullName}'s role to '${newRole}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
                    if (res.data) {
                        Swal.fire("Success", `${fullName}'s role has been updated to '${newRole}'!`, "success");
                        queryClient.invalidateQueries("users"); // Invalidate query
                    }
                } catch (error) {
                    console.error("Error updating role:", error);
                    Swal.fire("Error", "There was an issue updating the role.", "error");
                }
            }
        });
    };

    const handleDelete = async (userId, fullName) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you really want to delete ${fullName}? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${userId}`);
                    if (res.data) {
                        Swal.fire("Deleted!", `${fullName} has been deleted.`, "success");
                        queryClient.invalidateQueries("users"); // Invalidate query
                    }
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error", "There was an issue deleting the user.", "error");
                }
            }
        });
    };

    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full shadow-md rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-100 text-gray-600">
                            <th className="py-3 px-4 font-semibold text-sm">Name</th>
                            <th className="py-3 px-4 font-semibold text-sm">Email</th>
                            <th className="py-3 px-4 font-semibold text-sm">Role</th>
                            <th className="py-3 px-4 font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">{user.fullName}</td>
                                <td className="py-3 px-4 text-sm">{user.email}</td>
                                <td className="py-3 px-4 text-sm">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, user.fullName, user.role, e.target.value)}
                                        className="select select-bordered w-full max-w-xs"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <button
                                        onClick={() => handleDelete(user._id, user.fullName)}
                                        className="btn btn-error btn-sm text-white flex items-center gap-2"
                                    >
                                        <MdDelete size={20} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
