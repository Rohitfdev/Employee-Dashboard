import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MdOutlineCloudDownload } from "react-icons/md";
import Pagination from "react-mui-pagination";

function AttendanceTable() {
  const [recordperpage, setRecordperPage] = useState(1000);
  const [total_count, setTotalCount] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("https://66b736fa7f7b1c6d8f1b4117.mockapi.io/employee");
        const userData = await userResponse.json();
        setUsers(userData);

        const attendanceResponse = await fetch("https://6391e7c1ac688bbe4c56457d.mockapi.io/Leave/attendance");
        const attendanceData = await attendanceResponse.json();
        setAttendanceData(attendanceData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const enrichedUsers = users.map((user) => {
    const userAttendance = attendanceData.find(
      (attendance) => attendance.employeeId === user.id.toString() // Ensure the types match
    );


    const formatDate = (date) => {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.toLocaleDateString();
    };

    return {
      ...user,
      attendanceStatus: userAttendance ? userAttendance.status : "No attendance records available",
      attendanceDate: userAttendance ? formatDate(userAttendance.date) : "N/A",
    };
  });

  const handleDownloadExcel = () => {
    const headers = [
      "S.No.",
      "Employee Name",
      "Email",
      "Profession",
      "Attendance Status",
      "Attendance Date",
    ];

    const dataWithCustomHeaders = [
      headers,
      ...enrichedUsers.map((item, index) => [
        index + 1,
        `${item.firstName} ${item.lastName}`,
        item.email,
        item.profession,
        item.attendanceStatus,
        item.attendanceDate,
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
    saveAs(fileData, "attendance_records.xlsx");
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
              <span>Attendance Report</span>
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
              <td>Attendance Status</td>
              <td>Attendance Date</td>
            </tr>
            <br />
          </thead>
          <tbody>
            {filterData.length === 0 ? (
              <tr>
                <td colSpan="6">No records found</td>
              </tr>
            ) : (
              filterData.map((val, i) => (
                <>
                <tr key={i}>
                  <td>{calculateSerialNumber(i)}</td>
                  <td>{val.firstName} {val.lastName}</td>
                  <td>{val.email}</td>
                  <td>{val.profession}</td>
                  <td>{val.attendanceStatus}</td>
                  <td>{val.attendanceDate}</td>
                </tr>
                <br />
                </>
              ))
            )}
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
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
