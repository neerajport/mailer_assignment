import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import MoreInfo from "./MoreInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

//upper searchbox

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function Dashboard() {
    const [rows, setRows] = useState([]);

    const navigate = useNavigate();

    //Table pagination start
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
            onPageChange(
                event,
                Math.max(0, Math.ceil(count / rowsPerPage) - 1)
            );
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === "rtl" ? (
                        <LastPageIcon />
                    ) : (
                        <FirstPageIcon />
                    )}
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
                    {theme.direction === "rtl" ? (
                        <FirstPageIcon />
                    ) : (
                        <LastPageIcon />
                    )}
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

    //Table pagination ends

    //fetch all data
    const [newList, setNewList] = useState([]);
    const fetchData = async () => {
        let list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "form"));
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            let newList = [...list];
            setNewList(newList);
            setRows(list.reverse());
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/admin");
        }
        fetchData();
    }, []);

    const handleClick = () => {
        localStorage.removeItem("accessToken");
        navigate("/admin");
    };

    //my extra data
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newRows, setNewRows] = useState("");

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

    const handleSearchInput = (e) => {
        const inputVal = e.target.value;
        setNewRows(inputVal);
    };

    const handleClickSearchBar = (e) => {
        const newRowsValue = newList.filter((ele) => {
            return (
                ele.name.toLowerCase().includes(newRows.toLowerCase()) ||
                ele.email.toLowerCase().includes(newRows.toLowerCase())
            );
        });
        setRows(newRowsValue);
    };

    return (
        <div>
            <>
                <div className="mmi">
                    <Button onClick={handleClick} variant="contained">
                        LogOut
                    </Button>
                </div>
                <br />
                <br />
                <div className="dashboard_upper">
                    <Typography sx={{ mb: 2 }}>エントリー一覧</Typography>
                    <div>
                        <TextField
                            id="search-bar"
                            className="text"
                            onInput={(e) => {
                                handleSearchInput(e);
                            }}
                            // onChange={handleSearchBox}
                            label="検索"
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                        />
                        <IconButton
                            type="submit"
                            onClick={handleClickSearchBar}
                            aria-label="search"
                        >
                            <SearchIcon style={{ fill: "blue" }} />
                        </IconButton>
                    </div>
                </div>
                {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
                <TableContainer component={Paper}>
                    <Table
                        sx={{ maxWidth: 760, mx: "auto" }}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">
                                    ID
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    氏名
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Email&nbsp;(g)
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    [詳細]&nbsp;(g)
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : rows
                            ).map((row) => (
                                <StyledTableRow key={row.id}>
                                    {/* <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell> */}
                                    <StyledTableCell align="center">
                                        {row.id}
                                    </StyledTableCell>
                                    {row && row.name ? (
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell align="center">
                                            No Name Found
                                        </StyledTableCell>
                                    )}
                                    {row && row.email ? (
                                        <StyledTableCell align="center">
                                            {row.email}
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell align="center">
                                            No Email Found
                                        </StyledTableCell>
                                    )}

                                    <StyledTableCell align="center">
                                        {/* <Button variant="contained">more info</Button> */}
                                        <MoreInfo
                                            {...row}
                                            id={row.id}
                                            fetchData={fetchData}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        2,
                                        5,
                                        10,
                                        25,
                                        { label: "All", value: -1 },
                                    ]}
                                    colSpan={3}
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
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
        </div>
    );
}

export default Dashboard;
