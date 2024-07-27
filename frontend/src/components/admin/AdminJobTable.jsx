import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";

const AdminJobTable = () => {
  const { adminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(adminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      adminJobs &&
      adminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredCompany);
  }, [adminJobs, searchJobByText]);

  return (
    <Table>
      <TableCaption>A list of your recent jobs companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs?.map((job) => (
          <motion.tr
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            key={job._id}
          >
            {/* <TableCell>
              <Avatar>
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
            </TableCell> */}
            <TableCell>{job?.company?.name}</TableCell>
            <TableCell>{job?.title}</TableCell>
            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="float-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    onClick={() => {
                      navigate(`/admin/companies/${job._id}`);
                    }}
                    className="flex w-fit items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                  <div 
                   onClick={()=> navigate(`/admin/job/${job._id}/applicant`)}
                  className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                    <Eye className="w-4" />
                    <span>Applicant</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
};
export default AdminJobTable;
