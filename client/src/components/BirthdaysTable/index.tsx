import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BirthdayAPI } from "../../types/Birthday";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCountries } from "../../store/countries/countrySlice";
import { format } from "date-fns";
import { setSelectedBirthday } from "../../store/birthdays/birthdaysSlice";
import { BodyTableRow, TableContainer } from "./styles";

interface Props {
  rows: BirthdayAPI[];
}

const BirthdaysTable = ({ rows }: Props) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Birthday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ cursor: "pointer" }}>
          {rows.map((row) => (
            <BodyTableRow
              key={row._id}
              onClick={() => dispatch(setSelectedBirthday(row._id))}
            >
              <TableCell>
                {row.name} {row.surname}
              </TableCell>
              <TableCell>
                {countries.find((country) => country._id === row.country)?.name
                  .common ?? null}
              </TableCell>
              <TableCell>
                {format(new Date(row.birthday ?? null), "dd/MM/yyyy")}
              </TableCell>
            </BodyTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BirthdaysTable;
