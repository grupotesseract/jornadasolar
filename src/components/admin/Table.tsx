import React, { FC, useState } from 'react'
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  makeStyles
} from '@material-ui/core'
import MuiTable from '@material-ui/core/Table'
import MuiTableHead from '@material-ui/core/TableHead'
import Alert from '@material-ui/lab/Alert'
import TablePagination from '@material-ui/core/TablePagination'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  TableRow: {
    '&:hover': {
      backgroundColor: '#828282 !important'
    }
  },
  tableAlert: {
    padding: 20,
    backgroundColor: '#4F4F4F',
    color: 'white',
    justifyContent: 'center'
  }
})

interface ITableHeadProps {
  headCells: Array<any>
}

interface ITableProps {
  headCells: Array<any>
  bodyCells: Array<any>
}

const TableHead = ({ headCells }: ITableHeadProps) => {
  return (
    <MuiTableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index < headCells.length - 1 ? 'left' : 'right'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

const Table: FC<ITableProps> = ({ headCells, bodyCells = [] }: ITableProps) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const classes = useStyles({})

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (!bodyCells || bodyCells.length < 1) {
    return (
      <TableContainer component={Paper}>
        <MuiTable aria-label="default table">
          <TableHead headCells={headCells} />
        </MuiTable>
        <Alert severity="warning" className={classes.tableAlert}>
          Nenhum registro encontrado
        </Alert>
      </TableContainer>
    )
  }
  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer component={Box}>
        <MuiTable aria-label="default table">
          <TableHead headCells={headCells} />

          <TableBody>
            {bodyCells
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(bodyCell => (
                <TableRow
                  key={bodyCell.id}
                  style={{ cursor: 'pointer' }}
                  hover
                  className={classes.TableRow}
                >
                  {headCells.map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      align={index < headCells.length - 1 ? 'left' : 'right'}
                      onClick={
                        index < headCells.length - 1 ? bodyCell.onClick : null
                      }
                    >
                      {bodyCell[cell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={bodyCells.length}
        rowsPerPageOptions={[10, 20, 30]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        classes={{
          root: classes.root
        }}
      />
    </Paper>
  )
}

export default Table
