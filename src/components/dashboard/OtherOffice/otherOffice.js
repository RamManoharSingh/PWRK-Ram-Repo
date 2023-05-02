import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Button } from "@mui/material";
import { Modes } from "../../common/Constants/Modes";
import routeNames from "../../../routes/routeName";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API_BASE_URL}OtherOffice/GetOtherOffice`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "othOffId",
    numeric: true,
    disablePadding: false,
    label: "Other Office ID",
  },
  {
    id: "officeTypeId",
    numeric: true,
    disablePadding: false,
    label: "Office Type ID",
  },
  {
    id: "othOffName",
    numeric: true,
    disablePadding: false,
    label: "Other Office Name",
  },
  {
    id: "othOffCode",
    numeric: true,
    disablePadding: false,
    label: "Other Office Code",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },

  {
    id: "stateId",
    numeric: true,
    disablePadding: false,
    label: "State ID",
  },
  {
    id: "disttId",
    numeric: true,
    disablePadding: false,
    label: "District ID",
  },
  {
    id: "pinCode",
    numeric: true,
    disablePadding: false,
    label: "PIN Code",
  },
  {
    id: "stdCode",
    numeric: true,
    disablePadding: false,
    label: "STD Code",
  },
  {
    id: "contactNo",
    numeric: true,
    disablePadding: false,
    label: "Contact Number",
  },
  {
    id: "mobileNo",
    numeric: true,
    disablePadding: false,
    label: "Mobile Number",
  },
  {
    id: "emailId",
    numeric: true,
    disablePadding: false,
    label: "Email ID",
  },
  {
    id: "seqId",
    numeric: true,
    disablePadding: false,
    label: "Seq ID",
  },
  {
    id: "longitude",
    numeric: true,
    disablePadding: false,
    label: "Longitude",
  },
  {
    id: "latitude",
    numeric: true,
    disablePadding: false,
    label: "Latitude",
  },
  {
    id: "pan",
    numeric: true,
    disablePadding: false,
    label: "PAN",
  },

  {
    id: "gst",
    numeric: true,
    disablePadding: false,
    label: "GST",
  },
  {
    id: "bankName",
    numeric: true,
    disablePadding: false,
    label: "Bank Name",
  },
  {
    id: "bankAddress",
    numeric: true,
    disablePadding: false,
    label: "Bank Address",
  },
  {
    id: "bankAccNo",
    numeric: true,
    disablePadding: false,
    label: "Bank Account Number",
  },
  {
    id: "bankIFSC",
    numeric: true,
    disablePadding: false,
    label: "Bank IFSC",
  },
  {
    id: "isActive",
    numeric: true,
    disablePadding: false,
    label: "Is Active",
  },
  {
    id: "isVisible",
    numeric: true,
    disablePadding: false,
    label: "Is Visible",
  },
  {
    id: "updateby",
    numeric: true,
    disablePadding: false,
    label: "Update By",
  },
  {
    id: "updateOfficeTypeId",
    numeric: true,
    disablePadding: false,
    label: "Update Office Type ID",
  },
  {
    id: "updateOfficeId",
    numeric: true,
    disablePadding: false,
    label: "Update Office ID",
  },
  {
    id: "updateon",
    numeric: true,
    disablePadding: false,
    label: "Update On",
  },
  {
    id: "ipAddress",
    numeric: true,
    disablePadding: false,
    label: "IP Address",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="thead-dark table-dark">
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'center' : 'left'}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Office Account Details
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [isError, setIsError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);

  //   useEffect(() => {
  //     let tempData = baseApiData.map((ele) => {
  //       if (!ele.title) ele.title = "";
  //       if (!ele.employeeID) ele.employeeID = 0;
  //       if (!ele.bcNumber) ele.bcNumber = "";
  //       if (!ele.firstName) ele.firstName = "";
  //       if (!ele.lastName) ele.lastName = "";
  //       if (!ele.bcResourceNumber) ele.bcResourceNumber = "";
  //       if (!ele.telephone) ele.telephone = "";
  //       if (!ele.email) ele.email = "";
  //       if (!ele.initials) ele.initials = "";
  //       if (!ele.employmentStatusName) ele.employmentStatusName = "";
  //       if (!ele.techniques) ele.techniques = "";
  //       if (!ele.linkToUrlSubjectMapNDT) ele.linkToUrlSubjectMapNDT = "";
  //       if (!ele.linkToUrlSubjectMapWeldingN3)
  //         ele.linkToUrlSubjectMapWeldingN3 = "";
  //       if (!ele.competenceMatrixData) ele.competenceMatrixData = [];
  //       return ele;
  //     });
  //     let lsearchText = searchValue.toLowerCase();
  //     let filteredData = tempData.filter(
  //       (x) =>
  //         x.title.toLowerCase().includes(lsearchText) ||
  //         x.firstName.toLowerCase().includes(lsearchText) ||
  //         x.lastName.toLowerCase().includes(lsearchText) ||
  //         x.email.toLowerCase().includes(lsearchText) ||
  //         x.initials.toLowerCase().includes(lsearchText) ||
  //         x.employmentStatusName.toLowerCase().includes(lsearchText) ||
  //         x.techniques.toLowerCase().includes(lsearchText) ||
  //         x.linkToUrlSubjectMapNDT.toLowerCase().includes(lsearchText) ||
  //         x.linkToUrlSubjectMapWeldingN3.toLowerCase().includes(lsearchText) ||
  //         x.bcNumber.includes(lsearchText) ||
  //         x.employeeID.includes(searchValue) ||
  //         x.bcResourceNumber.includes(lsearchText) ||
  //         x.telephone.includes(lsearchText) ||
  //         x.competenceMatrixData.filter((e) =>
  //           e.name.toLowerCase().includes(lsearchText)
  //         ).length > 0
  //     );

  //     setRows(filteredData);
  //   }, [searchValue]);

  const handleModal = async (officeId) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}OfficeAccountDetails/GetOfficeAccountDetails/${officeId}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        officeAccountDetailsData: result.data,
      },
    };
    navigate(routeNames.CREATEOFFICEACCOUNTDETAILS, option);
  };

  const getApiData = async () => {
    try {
      const res = await axios.get(API);
      setRows(res.data);
      setBaseApiData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  React.useEffect(() => {
    getApiData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const deleteOfficeAccountDetails = (officeId) => {
    Swal.fire({
      title: "Do You Want To Delete?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}OfficeAccountDetails/DeleteOfficeAccountDetails/${officeId}`
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Your work has been Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            getApiData();
          })
          .catch(() => {
            Swal.fire("Office Account Details not deleted.");
          });
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <input
          type="text"
          placeholder="Enter search string"
          style={{
            width: "230px",
            height: "48px",
            borderRadius: "20px",
            float: "right",
            textAlign: "center",
          }}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
        <button
          className="btn btn-primary"
          onClick={() =>
            navigate(routeNames.CREATEOFFICEACCOUNTDETAILS, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Office Account Details
        </button>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            className="table table-bordered table-light table-striped"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              className="thead-dark table-dark"
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page, rowsPerPage, page, rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.othOffId}
                      selected={isItemSelected}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.othOffId}
                      </TableCell>

                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.officeTypeId}
                      </TableCell>

                      <TableCell align="center">{row.othOffName}</TableCell>

                      <TableCell align="center">{row.othOffCode}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>

                      <TableCell align="center">{row.stateId}</TableCell>
                      <TableCell align="center">{row.disttId}</TableCell>
                      <TableCell align="center">{row.pinCode}</TableCell>
                      <TableCell align="center">{row.stdCode}</TableCell>
                      <TableCell align="center">{row.contactNo}</TableCell>
                      <TableCell align="center">{row.mobileNo}</TableCell>
                      <TableCell align="center">{row.emailId}</TableCell>
                      <TableCell align="center">{row.seqId}</TableCell>
                      <TableCell align="center">{row.longitude}</TableCell>
                      <TableCell align="center">{row.latitude}</TableCell>
                      <TableCell align="center">{row.pan}</TableCell>
                      <TableCell align="center">{row.gst}</TableCell>
                      <TableCell align="center">{row.bankName}</TableCell>
                      <TableCell align="center">{row.bankAddress}</TableCell>
                      <TableCell align="center">{row.bankAccNo}</TableCell>
                      <TableCell align="center">{row.bankIFSC}</TableCell>
                      <TableCell align="center">{row.isActive}</TableCell>
                      <TableCell align="center">{row.isVisible}</TableCell>
                      <TableCell align="center">{row.updateby}</TableCell>
                      <TableCell align="center">
                        {row.updateOfficeTypeId}
                      </TableCell>
                      <TableCell align="center">{row.updateOfficeId}</TableCell>
                      <TableCell align="center">{row.updateon}</TableCell>
                      <TableCell align="center">{row.ipAddress}</TableCell>

                      <TableCell>
                        <div style={{ display: "flex" }}>
                          <div className="Edit">
                            <button
                              className="btn
                          btn-primary btn-xxl"
                              style={{
                                padding: 4,
                                marginright: 3,
                                marginLeft: 3,
                                paddingleft: 5,
                                paddingright: 5,
                                margin: 3,
                                marginTop: 1.25,
                              }}
                              onClick={() => handleModal(row.officeId)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            style={{ margin: 3 }}
                            onClick={() =>
                              deleteOfficeAccountDetails(row.officeId)
                            }
                          >
                            <DeleteTwoToneIcon />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
