import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";
import { useParams } from "react-router-dom";
import { setAllApplicants } from "@/redux/applicationSlice";

function JobApplicants() {
    const { id } = useParams();
    useGetAllApplicants(id);
    const dispatch = useDispatch();
    const { applicants = [] } = useSelector((state) => state.application); // Fallback to empty array
    const loading = useSelector((state) => state.auth.loading);

    const handleStatusChange = async (applicantId, status) => {
        try {
            dispatch(setLoading(true));
            axios.defaults.withCredentials = true;
            const res = await axios.put(`${APPLICATION_API_ENDPOINT}/${applicantId}/update`, { status });
            if (res.data.success) {
                dispatch(setAllApplicants(applicants.map(applicant =>
                    applicant._id === applicantId ? { ...applicant, status } : applicant
                )));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Accepted":
                return "bg-green-500 text-white";
            case "Rejected":
                return "bg-red-500 text-white";
            case "Pending":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Applicants
                </h2>

                {applicants && applicants.length > 0 ? (
                    <Table className="w-full text-sm text-gray-900 dark:text-white">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-700">
                                <TableCell className="font-semibold py-3 px-4">Profile</TableCell>
                                <TableCell className="font-semibold py-3 px-4">Name</TableCell>
                                <TableCell className="font-semibold py-3 px-4">Email</TableCell>
                                <TableCell className="font-semibold py-3 px-4">Resume</TableCell>
                                <TableCell className="font-semibold py-3 px-4">Status</TableCell>
                                <TableCell className="font-semibold py-3 px-4">Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.map((applicant) => (
                                <TableRow key={applicant._id} className="border-b border-gray-200 dark:border-gray-700">
                                    <TableCell className="py-4 px-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={applicant.avatar || "default-avatar.png"} alt={applicant.fullname} />
                                            <AvatarFallback>{applicant?.fullname?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="py-4 px-4">{applicant.fullname || "Unknown"}</TableCell>
                                    <TableCell className="py-4 px-4">{applicant.email || "No email"}</TableCell>
                                    <TableCell className="py-4 px-4">
                                        {applicant.resume ? (
                                            <a href={applicant.resume} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                                View Resume
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400">Not Uploaded</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-4 px-4">
                                        <Badge className={`px-3 py-1 text-sm rounded-md ${getStatusColor(applicant.status)}`}>
                                            {applicant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 px-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                                    {loading ? "Updating..." : "Change Status"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-40">
                                                <DropdownMenuItem onClick={() => handleStatusChange(applicant._id, "Pending")}>
                                                    Pending
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(applicant._id, "Accepted")}>
                                                    Accept
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(applicant._id, "Rejected")}>
                                                    Reject
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">No applicants yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobApplicants;
