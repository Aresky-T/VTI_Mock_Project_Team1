import React, { useEffect, useState } from "react";
// import RecipeTransactionHistory from "../../../components/ProfileComponent/recipes/transactions";
import { useAuth } from "../../../redux/selector";
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
  Button,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { getAllRecipeTransactionsApi } from "../../../api/recipe.transaction.api";
import ROUTES from "../../../constant/routes";
import { useNavigate } from "react-router-dom";

const RecipeTransactionContainer = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  // const theme = useTheme();
  const navigate = useNavigate();

  const rows = [...transactions].sort(compareDate("transactionDate", "desc"));
  const paginatedRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      getAllRecipeTransactionsApi(currentUser.token)
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);
  return (
    <div className="profile-body transaction-history">
      <div className="profile-body_header">
        <h3>Recipe transaction history</h3>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom material table">
          <TableHead>
            <TableRow>
              <MaterialTableCell align="center" width={"5%"}>
                ID
              </MaterialTableCell>
              <MaterialTableCell width={"20%"}>Date</MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Cost
              </MaterialTableCell>
              <MaterialTableCell width={"45%"}>Recipe</MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Action
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
                      <MaterialTableCell>
                        {new Date(row.transactionDate).toLocaleString("en-EN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {row.cost}
                      </MaterialTableCell>
                      <MaterialTableCell align="left">
                        {row.recipe?.name || "Unknown"}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {row.recipe && (
                          <Button
                            sx={{ fontSize: ".7rem" }}
                            color="secondary"
                            onClick={() =>
                              navigate(
                                `${ROUTES.RECIPE_DETAILS}?id=${row.recipe.id}`
                              )
                            }
                          >
                            View recipe
                          </Button>
                        )}
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
      {/* <div className="exchange_wrapper">
        <p>This feature is in development, please come back later!</p>
      </div> */}
    </div>
  );
};

export default RecipeTransactionContainer;
