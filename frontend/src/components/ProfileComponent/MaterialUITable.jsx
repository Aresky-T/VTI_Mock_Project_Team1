import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useDispatch, useSelector } from 'react-redux';
import { RiEditBoxFill, RiDeleteBin4Fill } from 'react-icons/ri';
import { compareString } from '../../utils/compare';
import { deleteRecipeStart, updateRecipeStart } from '../../redux/recipes.slide';
import { getAllRecipesForCreatorApi } from '../../api/recipe.api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function TablePaginationActions(props) {
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
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const getAllRows = (data) => {
    return [...data]
}

export default function CustomPaginationActionsTable() {
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const time = useSelector(state => state.time.value);
    const [list, setList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = getAllRows([...list].sort(compareString('name', 'desc')));
    const dispatch = useDispatch();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleShowUpdateRecipePopup = (data) => {
        dispatch(updateRecipeStart(data));
    }

    const toggleShowConfirmDeleteRecipePopup = (data) => {
        dispatch(deleteRecipeStart(data));
    }

    React.useEffect(() => {
        getAllRecipesForCreatorApi(currentUser)
        .then(res => {
            setList(res.data);
        })
    }, [time])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Image</StyledTableCell>
                        <StyledTableCell align="center">Point</StyledTableCell>
                        <StyledTableCell align="center">Create Date</StyledTableCell>
                        <StyledTableCell align="center">Edit</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, index) => (
                        <React.Fragment key={index}>
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    <span className='row-recipe-name'>{row.name}</span>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    <div className="recipe-image">
                                        <img src={row.imageUrl} alt="" />
                                    </div>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.point}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {new Date(row.createDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell style={{ width: 50 }} align="center">
                                    <span className='row-recipe-icon'
                                        onClick={() => toggleShowUpdateRecipePopup(row)}
                                    ><RiEditBoxFill /></span>
                                </TableCell>
                                <TableCell style={{ width: 50 }} align="center">
                                    <span className='row-recipe-icon'
                                        onClick={() => toggleShowConfirmDeleteRecipePopup(row)}
                                    ><RiDeleteBin4Fill /></span>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={7} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={7}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}