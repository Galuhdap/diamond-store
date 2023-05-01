import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useState } from "react";
import { func } from "prop-types";

export function Tables() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  console.log("ini lastIndex: "+ lastIndex);

  const firstIndex = lastIndex - recordsPerPage;
  console.log("ini firstIndex: "+ firstIndex);

  const records = authorsTableData.slice(firstIndex, lastIndex);
  console.log("ini recorcd: "+records);

  const npage = Math.ceil(authorsTableData.length / recordsPerPage);
  console.log("ini npage: "+npage);

  const numbers = Array.from({length : npage}, (_ , i) => i+1);
  console.log("ini numbers: "+numbers);

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
      console.log("ini cek prepage: " + setCurrentPage(currentPage - 1));
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
    console.log("ini cek id :" + setCurrentPage(id));
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      const test = setCurrentPage(currentPage + 1);
      console.log("ini check NextPage: " + test);
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6 ">
          <Typography variant="h6" color="white">
            Order Table
          </Typography>
        </CardHeader>
        <div className="ml-auto mb-4 md:mr-4 md:w-56">
          <Input label="Type here" />
        </div>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Id Pembelian",
                  "Player",
                  "Phone",
                  "Game",
                  "Payment",
                  "Status",
                  "Employed",
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
            <tbody>
              {records.map(
                (
                  {
                    id_pembelian,
                    player,
                    nick_player,
                    payment,
                    game,
                    status,
                    phone,
                    date,
                  },
                  key
                ) => {
                  const className = `py-3 px-5`;
                  return (
                    <tr key={player}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {id_pembelian}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {player}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {nick_player}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {game[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {game[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {payment}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "blue-gray"}
                          value={status ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
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
              )}
            </tbody>
          </table>
          <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
              {/* <div>
                <nav
                  class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    class=" page-link relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
                    onClick={prePage}
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    {numbers.map((n, i) => {
                      <li
                        className={`page-number ${
                          currentPage === n ? 'active' : ' '
                        }`}
                        key={i}
                      >
                        <a
                          href="#"
                          className="page-item page-link"
                          onClick={() => changeCPage(n)}
                        >
                          {n}
                        </a>
                      </li>;
                    })}
                  </span>
                  <a
                    href="#"
                    class="page-link relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1  ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
                    onClick={nextPage}
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div> */}
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="Page-link" onClick={prePage}>Prev</a>
                </li>
                {
                  numbers.map((n,i) => (
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i} >
                      <a href="#" className="page-item" onClick={()=>currentPage(n)}>{n}</a>
                    </li>
                  ))
                }
                <li className="page-item">
                  <a href="#" className="Page-link" onClick={nextPage}>Next</a>
                </li>
              </ul>
            </nav>
            
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )

 
}

export default Tables;
