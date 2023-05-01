import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData, usersList } from "@/data";

export function UserList() {

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          
          <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
                {[
                  "Username",
                  "Email",
                  "Phone",
                  "Role",
                  "",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <thead>
                  {
                    usersList.map(
                      (
                        {
                          username,
                          email,
                          phone,
                          role,
                        },
                        key
                      ) => {
                        return(
                          <tr key={username}>
                            <td className="py-3 px-5">
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {username}
                              </Typography>
                            </td>
                            <td className="py-3 px-5">
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {email}
                              </Typography>
                            </td>
                            <td className="py-3 px-5">
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {phone}
                              </Typography>
                            </td>
                            <td className="py-3 px-5">
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {role}
                              </Typography>
                            </td>
                            <td className="py-3 px-5">
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                              Edit
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )
                  }
            </thead>
          </table>
        </CardBody>
      </Card>
    </div>
  );

}

export default UserList;
