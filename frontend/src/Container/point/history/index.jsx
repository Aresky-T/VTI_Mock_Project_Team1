import React, { useEffect, useState } from "react";
import { useAuth } from "../../../redux/selector";
import { getPointHistoryForUserApi } from "../../../api/point.api";
import {
  MaterialTableCell,
  MaterialTablePagination,
} from "../../../components/table/material";
import { compareDate } from "../../../utils/compare";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";

const PointHistoryContainer = () => {
  const [histories, setHistories] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [...histories].sort(compareDate("changedDate", "desc"));

  const paginatedRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  // const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      getPointHistoryForUserApi(currentUser.token)
        .then((res) => {
          setHistories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  return (
    <div className="profile-body point-history">
      <div className="profile-body_header">
        <h3>Point history</h3>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom material table">
          <TableHead>
            <TableRow>
              <MaterialTableCell align="center" width={"5%"}>
                ID
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"20%"}>
                Date
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Point
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"60%"}>
                Description
              </MaterialTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              <>
                {paginatedRows.map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <MaterialTableCell component="th" scope="row">
                        {page * rowsPerPage + index + 1}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {new Date(row.changedDate).toLocaleString("en-EN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {row.pointChanged}
                      </MaterialTableCell>
                      <MaterialTableCell align="left">
                        {row.description}
                      </MaterialTableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={MaterialTablePagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* {histories && (
        <MaterialTable
          data={[]}
          renderTableHeader={() => ""}
          renderTableBody={() => ""}
        />
      )} */}
      {/* <div className="exchange_wrapper">
        <p>This feature is in development, please come back later!</p>
      </div> */}
    </div>
  );
};

export default PointHistoryContainer;
