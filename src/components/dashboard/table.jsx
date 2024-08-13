import React, { useState, useEffect, useRef } from "react";

import Pagination from "react-mui-pagination";

import "./table.css";
import { LuSearch } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import sort_logo_img from "../../Assets/table/shortarrow.png";
import { MdOutlineCloudDownload } from "react-icons/md";
import axios from "axios";

function OrderTable() {
  const [recordperpage, setRecordperPage] = useState(1000);
  const [total_count, setTotalCount] = useState(10);
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data
    fetch("https://66b736fa7f7b1c6d8f1b4117.mockapi.io/employee")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleDownloadEXcel = () => {
    // Custom headers
    const headers = [
      "Employee Id",
      "Name",
      "Email",
      "Profession",
      "Age",
      "Date of Birth",
      "Salary",
    ];

    // Map data to a new array with custom headers
    const dataWithCustomHeaders = [
      headers,
      ...users.map((item) => [
        item?.id,
        `${item.firstName} ${item.lastName}`,
        item.email,
        item.profession,
        item.age,
        item.dob,
        item.salary,
      ]),
    ];
    // Generate Excel file
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataWithCustomHeaders);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // Save file
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "employee.xlsx");
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const sortBy = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...listData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setListData(sortedData);
    setSortConfig({ key, direction });
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleItemsPerPageChange = (value) => {
    setRecordperPage(value);
    setPage(1); // Reset to page 1 whenever items per page changes
  };

  const calculateSerialNumber = (index) => {
    return (page - 1) * recordperpage + index + 1;
  };
  const startSerialNumber = calculateSerialNumber(0);
  const endSerialNumber = calculateSerialNumber(listData.length - 1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterData = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="page">
      <div className="filter_list d-flex justify-content-between align-items-center   mb-1">
        <div className="d-flex align-items-center gap-2">
          <div
            className="button-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              className={`button ${isHovered ? "hovered" : ""}`}
              onClick={() => handleDownloadEXcel()}
            >
              <span>Employee Report</span>
              <div className="pageheader_icons_container">
                <MdOutlineCloudDownload className="pageheader_react_icons" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="page_header_slider_container">
        <form className="d-none d-lg-inline-block form-inline navbar-search ms-auto">
          <div className="input-group my-1 ">
            <input
              type="search"
              className="form-control bg-white border-0 small page_search"
              placeholder="Search here"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
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
        <table className=" table  ">
          <thead>
            <tr>
              <td scope="col">S.No.</td>

              <td scope="col">
                {" "}
                <div className="th_common">
                  <span> Name </span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("firstName")}
                  />
                </div>
              </td>
              <td scope="col">
                {" "}
                <div className="th_common">
                  <span> Email </span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("email")}
                  />
                </div>{" "}
              </td>
              <td scope="col">
                {" "}
                <div className="th_common">
                  <span> Profession </span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("profession")}
                  />
                </div>{" "}
              </td>
              <td scope="col">
                <div className="th_common">
                  <span> Contact Number </span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("contactNumber")}
                  />
                </div>{" "}
              </td>
              <td scope="col">
                <div className="th_common">
                  <span>Age</span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("age")}
                  />
                </div>{" "}
              </td>

              <td scope="col">
                {" "}
                <div className="th_common">
                  <span>Date of birth </span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("dob")}
                  />
                </div>{" "}
              </td>
              <td scope="col">
                {" "}
                <div className="th_common">
                  <span>Salary</span>

                  <img
                    src={sort_logo_img}
                    alt="sort logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortBy("salary")}
                  />
                </div>
              </td>
            </tr>
            <br />
          </thead>
          <tbody>
            {filterData?.map((val, i) => (
              <>
                <tr key={i}>
                  <td>{calculateSerialNumber(i)}</td>

                  <td>
                    {" "}
                    {val?.firstName} {val?.lastName}{" "}
                  </td>
                  <td>{val?.email}</td>
                  <td>{val?.profession}</td>
                  <td>{val?.contactNumber}</td>
                  <td>{val?.age}</td>

                  <td>{val.dob}</td>

                  <td>{val?.salary}</td>
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
            {" "}
            Showing {startSerialNumber} - {endSerialNumber} of {total_count}{" "}
            Results
          </p>
        </div>

        <div className="d-flex   justify-content-center align-items-center">
          <Pagination
            page={page}
            // setPage={handleChange}
            total={total_count}
            className="pagination "
            perPage={recordperpage}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
