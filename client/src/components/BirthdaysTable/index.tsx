import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BirthdayAPI } from "../../types/Birthday";
import { useAppSelector } from "../../store";
import { selectCountries } from "../../store/countries/countrySlice";
import { format } from "date-fns";

interface Props {
  rows: BirthdayAPI[];
}

const BirthdaysTable = ({ rows }: Props) => {
  const countries = useAppSelector(selectCountries);
  return (
    <TableContainer component={Paper} sx={{ flex: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Birthday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BirthdaysTable;
