import React from "react";
import noData from "../../../../../../public/Img/nodata.png";
import Image from "next/image";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Box,
  Grid,
  TableSortLabel,
} from "@mui/material";

interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface Row {
  [key: string]: any;
}

interface CustomTableProps {
  columns: string[];
  page: number;
  rowsPerPage: number;
  rows: Row[];
  count?: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  onRequestSort?: (property: string) => void;
}

const index: React.FC<CustomTableProps> = ({
  rows,
  page,
  columns,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  count,
  loading,
  order,
  orderBy,
  onRequestSort,
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort?.(property);
    };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={
                  index === 0
                    ? "left"
                    : index === columns.length - 1
                    ? "center"
                    : "center"
                }
              >
                {column == "Expiry Date" ? (
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={createSortHandler(column)}
                  >
                    <strong>{column}</strong>
                  </TableSortLabel>
                ) : (
                  <strong>{column}</strong>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                overflow: "hidden",
              }}
            >
              {Object.values(row)?.map((ele, ind) => (
                <TableCell
                  key={ind}
                  align={
                    ind === 0
                      ? "left"
                      : ind === Object.values(row).length - 1
                      ? "center"
                      : "center"
                  }
                  component="th"
                  scope="row"
                >
                  {!Array.isArray(ele) ? (
                    ele
                  ) : (
                    <Box>{ele?.map((btn) => btn)}</Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          {!loading && rows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200, // Adjust height as needed
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src={noData} alt="nodata" />
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TablePagination
              page={page}
              count={count}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: 10000 }]}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default index;