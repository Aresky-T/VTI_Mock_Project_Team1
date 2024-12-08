import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

export const MaterialTableCell = styled(TableCell)(({ theme }) => {
  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: ".8rem",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: ".8rem",
    },
  };
});

export const MaterialTablePagination = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

MaterialTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// const getAllRows = (data) => {
//   return [...data];
// };

// const MaterialTable = ({ renderTableHeader, renderTableBody }) => {
//   const [list, setList] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const rows = getAllRows([...list].sort(compareString("name", "desc")));
//   const theme = useTheme();

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="custom material table">
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//               colSpan={7}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               SelectProps={{
//                 inputProps: {
//                   "aria-label": "rows per page",
//                 },
//                 native: true,
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={MaterialTablePagination}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// };

// export default MaterialTable;

// import React from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TablePagination,
//   TableRow,
//   Paper,
//   IconButton,
//   tableCellClasses,
// } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
// import {
//   FirstPage as FirstPageIcon,
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   LastPage as LastPageIcon,
// } from "@mui/icons-material";

// export const MaterialTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.common.black,
//     fontSize: ".8rem",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: ".8rem",
//   },
// }));

// const MaterialTablePagination = ({
//   count,
//   page,
//   rowsPerPage,
//   onPageChange,
// }) => {
//   const theme = useTheme();

//   const handleFirstPageButtonClick = () => onPageChange(0);
//   const handleLastPageButtonClick = () =>
//     onPageChange(Math.ceil(count / rowsPerPage) - 1);

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 0}>
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={() => onPageChange(page + 1)}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// };

// const MaterialTable = ({
//   data,
//   renderTableHeader,
//   renderTableBody,
//   sortFunction,
// }) => {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const rows = sortFunction ? sortFunction([...data]) : data;
//   const paginatedRows =
//     rowsPerPage > 0
//       ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//       : rows;

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="custom material table">
//         <TableHead>{renderTableHeader()}</TableHead>
//         <TableBody>
//           {paginatedRows.length > 0 ? (
//             renderTableBody(paginatedRows)
//           ) : (
//             <TableRow>
//               <TableCell colSpan={7} align="center">
//                 No data available
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//               colSpan={7}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={(event, newPage) => setPage(newPage)}
//               onRowsPerPageChange={(event) => {
//                 setRowsPerPage(parseInt(event.target.value, 10));
//                 setPage(0);
//               }}
//               ActionsComponent={MaterialTablePagination}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// };

// MaterialTable.propTypes = {
//   data: PropTypes.array.isRequired,
//   renderTableHeader: PropTypes.func.isRequired,
//   renderTableBody: PropTypes.func.isRequired,
//   sortFunction: PropTypes.func,
// };

// export default MaterialTable;
