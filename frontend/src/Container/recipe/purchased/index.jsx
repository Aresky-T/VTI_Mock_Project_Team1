import React, { useCallback, useEffect, useState } from "react";
// import PurchasedRecipes from "../../../components/ProfileComponent/recipes/purchased";
import {
  MaterialTableCell,
  MaterialTablePagination,
} from "../../../components/table/material";

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
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { compareDate } from "../../../utils/compare";
import { useAuth } from "../../../redux/selector";
import ROUTES from "../../../constant/routes";
import DisableOwnershipConfirmModal from "./DisableOwnershipConfirmModal";
import { getAllPurchasedRecipeForUserApi } from "../../../api/recipe.api";
import { disableRecipeOwnershipForUserApi } from "../../../api/recipe.owner.api";

const PurchasedRecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [...recipes].sort(compareDate("changedDate", "desc"));

  const paginatedRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGetAllPurchasedRecipe = useCallback(() => {
    if (currentUser && currentUser.token) {
      getAllPurchasedRecipeForUserApi(currentUser.token)
        .then((res) => {
          setRecipes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  const handleDisableRecipeOwnership = useCallback(() => {
    if (!selectedRecipe || !currentUser) return;
    disableRecipeOwnershipForUserApi(selectedRecipe.id, currentUser.token)
      .then(() => {
        setSelectedRecipe(null);
        handleGetAllPurchasedRecipe();
        toast.success(
          "Ownership of the recipe has been successfully disabled. You can repurchase the recipe to regain access."
        );
      })
      .catch((err) => {
        toast.error(
          "Failed to disable ownership of the recipe. Please try again or contact support if the issue persists."
        );
      });

    //eslint-disable-next-line
  }, [selectedRecipe, currentUser]);

  useEffect(() => {
    handleGetAllPurchasedRecipe();
  }, [handleGetAllPurchasedRecipe]);

  return (
    <div className="profile-body purchased-recipe-container">
      <div className="profile-body_header">
        <h3>Purchased recipes</h3>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="custom material table">
          <TableHead>
            <TableRow>
              <MaterialTableCell align="center" width={"5%"}>
                ID
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Image
              </MaterialTableCell>
              <MaterialTableCell align="left">Name</MaterialTableCell>
              <MaterialTableCell align="center" width={"10%"}>
                Point
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Ownership date
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"25%"}>
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
                      <MaterialTableCell align="center">
                        <div className="recipe-image">
                          <img src={row.imageUrl} alt="" />
                        </div>
                      </MaterialTableCell>
                      <MaterialTableCell>
                        <span className="row-recipe-name">{row.name}</span>
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {row.point}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        {new Date(row.createDate).toLocaleDateString()}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        <Box display={"flex"}>
                          <Button
                            sx={{ fontSize: ".7rem" }}
                            color="secondary"
                            onClick={() =>
                              navigate(`${ROUTES.RECIPE_DETAILS}?id=${row.id}`)
                            }
                          >
                            View details
                          </Button>

                          <Button
                            sx={{ fontSize: ".7rem" }}
                            color="error"
                            variant="text"
                            onClick={() => setSelectedRecipe(row)}
                          >
                            Disable ownership
                          </Button>
                        </Box>
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
      <DisableOwnershipConfirmModal
        recipe={selectedRecipe}
        handleCloseModal={() => setSelectedRecipe(null)}
        handleSubmit={handleDisableRecipeOwnership}
      />
    </div>
  );
};

export default PurchasedRecipeContainer;
