import { TableContainer as MUITableContainer, TableRow } from "@mui/material";
import styled from "styled-components";

export const TableContainer = styled(MUITableContainer)(({ theme }) => ({
  flex: 2,
  border: "1px solid " + theme.palette.primary.main,
}));

export const BodyTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));
