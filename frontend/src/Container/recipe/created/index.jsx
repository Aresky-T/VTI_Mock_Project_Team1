import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../redux/selector";
import {
  deleteRecipeByIdApi,
  getAllCreatedRecipeForUserApi,
} from "../../../api/recipe.api";
import { compareString } from "../../../utils/compare";
import { useNavigate } from "react-router-dom";
// import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
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
  IconButton,
  Tooltip,
  // useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import EditNoteSharp from "@mui/icons-material/EditNoteSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import {
  MaterialTableCell,
  MaterialTablePagination,
} from "../../../components/table/material";
import ROUTES from "../../../constant/routes";
import RecipeDeleteModal from "../../../components/ProfileComponent/RecipeDeleteModal";
import { toast } from "react-toastify";

const getAllRows = (data) => {
  return [...data];
};

const CreatedRecipesContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeForDelete, setRecipeForDelete] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = getAllRows([...recipes].sort(compareString("name", "desc")));

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const navigate = useNavigate();
  // const theme = useTheme();

  const paginatedRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRecipe = useCallback(() => {
    if (!recipeForDelete || !currentUser) return;
    const recipeId = recipeForDelete.id;
    const token = currentUser.token;

    deleteRecipeByIdApi(recipeId, token)
      .then(() => {
        handleGetAllCreatedRecipe();
        setRecipeForDelete(null);
        toast.success("Delete recipe successfully!");
      })
      .catch((err) => {
        toast.error("Delete failed!");
      });

    //eslint-disable-next-line
  }, [recipeForDelete, currentUser]);

  const handleGetAllCreatedRecipe = useCallback(() => {
    getAllCreatedRecipeForUserApi(currentUser.token)
      .then((res) => setRecipes(res.data))
      .catch((err) => {});
  }, [currentUser]);

  useEffect(() => {
    handleGetAllCreatedRecipe();
  }, [handleGetAllCreatedRecipe]);

  return (
    <div className="profile-body created-recipes-container">
      <div className="profile-body_header">
        <h3>Your created recipes</h3>
      </div>
      <TableContainer component={Paper} className="scrollbar-container">
        <Table aria-label="custom material table" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <MaterialTableCell align="center" width={"5%"}>
                ID
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"15%"}>
                Image
              </MaterialTableCell>
              <MaterialTableCell align="left">Name</MaterialTableCell>
              <MaterialTableCell align="center" width={"5%"}>
                Point
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"13%"}>
                Created date
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"5%"}>
                View
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"5%"}>
                Edit
              </MaterialTableCell>
              <MaterialTableCell align="center" width={"5%"}>
                Delete
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
                        {new Date(row.createDate).toLocaleString("en-EN", {
                          timeStyle: "short",
                          dateStyle: "short",
                        })}
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        <Tooltip title="View details">
                          <IconButton
                            size="small"
                            aria-label="view detail"
                            color="inherit"
                            onClick={() => {
                              navigate(`${ROUTES.RECIPE_DETAILS}?id=${row.id}`);
                            }}
                          >
                            <VisibilitySharpIcon />
                          </IconButton>
                        </Tooltip>
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit recipe"
                            size="small"
                            color="inherit"
                            onClick={() => {
                              navigate(`${ROUTES.RECIPE_EDIT}?id=${row.id}`);
                            }}
                          >
                            <EditNoteSharp />
                          </IconButton>
                        </Tooltip>
                      </MaterialTableCell>
                      <MaterialTableCell align="center">
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete recipe"
                            color="error"
                            size="small"
                            onClick={() => setRecipeForDelete(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
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
      <RecipeDeleteModal
        recipe={recipeForDelete}
        handleSubmitDelete={handleDeleteRecipe}
        handleClose={() => {
          setRecipeForDelete(null);
        }}
      />
    </div>
  );
};

export default CreatedRecipesContainer;
