import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MdOutlineCloudDownload } from "react-icons/md";
import axios from "axios";
import Pagination from "react-mui-pagination";

function LeaveTable() {
  const [recordperpage, setRecordperPage] = useState(1000);
  const [total_count, setTotalCount] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fetch users data
    fetch("https://66b736fa7f7b1c6d8f1b4117.mockapi.io/employee")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch leave data
    fetch("https://6391e7c1ac688bbe4c56457d.mockapi.io/Leave/leaves")
      .then((response) => response.json())
      .then((data) => {
        setLeaveData(data);
      })
      .catch((error) => console.error("Error fetching leave data:", error));
  }, []);

  const enrichedUsers = users.map((user) => {
    const userLeave = leaveData.find((leave) => leave.employeeId === user.id);

    const formatLeaveDate = (date) => {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.toLocaleDateString();
    };

    return {
      ...user,
      leave: userLeave ? userLeave.leaveType : "No leave records available",
      leaveStatus: userLeave ? userLeave.status : "N/A",
      leaveDate: userLeave ? formatLeaveDate(userLeave.leaveDate) : "N/A",
    };
  });

  const handleDownloadExcel = () => {
    const headers = [
      "S.No.",
      "Employee Name",
      "Email",
      "Profession",
      "Leave Details",
      "Leave Status",
      "Leave Date",
    ];

    const dataWithCustomHeaders = [
      headers,
      ...enrichedUsers.map((item, index) => [
        index + 1,
        `${item.firstName} ${item.lastName}`,
        item.email,
        item.profession,
        item.leave,
        item.leaveStatus,
        item.leaveDate,
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataWithCustomHeaders);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "leave_records.xlsx");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterData = enrichedUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm)
  );

  const calculateSerialNumber = (index) => {
    return (page - 1) * recordperpage + index + 1;
  };
  const startSerialNumber = calculateSerialNumber(0);
  const endSerialNumber = calculateSerialNumber(filterData.length - 1);

  return (
    <div className="page">
      <div className="filter_list d-flex justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center gap-2">
          <div
            className="button-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              className={`button ${isHovered ? "hovered" : ""}`}
              onClick={handleDownloadExcel}
            >
              <span>Leave Report</span>
              <div className="pageheader_icons_container">
                <MdOutlineCloudDownload className="pageheader_react_icons" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="page_header_slider_container">
        <form className="d-none d-lg-inline-block form-inline navbar-search ms-auto">
          <div className="input-group my-1">
            <input
              type="search"
              className="form-control bg-white border-0 small page_search"
              placeholder="Search here"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button className="btn bg-white" type="button">
                <LuSearch className="search_logo" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="table-container">
        <table className="table-container">
          <thead>
            <tr>
              <td>S.No.</td>
              <td>Employee Name</td>
              <td>Email</td>
              <td>Profession</td>
              <td>Leave Details</td>
              <td>Leave Status</td>
              <td>Leave Date</td>
            </tr>
            <br />
          </thead>
          <tbody>
            {filterData.map((val, i) => (
              <>
                <tr key={i}>
                  <td>{calculateSerialNumber(i)}</td>
                  <td>{val.firstName} {val.lastName}</td>
                  <td>{val.email}</td>
                  <td>{val.profession}</td>
                  <td>{val.leave}</td>
                  <td>{val.leaveStatus}</td>
                  <td>{val.leaveDate}</td>
                </tr>
                <br />
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-flex align-items-center justify-content-between mt-3 px-3">
        <div className="d-flex align-items-center justify-content-center my-4 my-md-0">
          <p
            className="p3 m-0"
            style={{ fontFamily: "Poppins", fontSize: "14px" }}
          >
            Showing {startSerialNumber} - {endSerialNumber} of {total_count} Results
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <Pagination
            page={page}
            total={total_count}
            className="pagination"
            perPage={recordperpage}
          />
        </div>
      </div>
    </div>
  );
}

export default LeaveTable;
