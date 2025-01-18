import { useGetFormsQuery, useGetResponsesQuery } from '../services/formApi';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

function Home() {
  const { data: forms } = useGetFormsQuery();
  const { data: responses } = useGetResponsesQuery();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch=useDispatch()

  const getSingleFromResponses = (id) => {
    return responses?.filter(response => response.formId === id)
  }
  return (
    <div className=" sm:p-14 bg-green-300 p-4 w-screen h-screen">
      <div className='w-full flex justify-between mb-2'>
        <h1 className="text-2xl">Forms List</h1>
        <div className='gap-3'>
          {isAuthenticated ? <Link to={`/form-builder`}><button className=''>Create Form</button></Link> : <Link to={`/login`}><button className=''>Log in</button></Link>}
          {isAuthenticated && <button onClick={()=>{dispatch(logout())}}>Logout</button>}</div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              {isAuthenticated && <TableCell align="right">Responses</TableCell>}

            </TableRow>
          </TableHead>
          <TableBody>
            {forms?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right"> <Link to={`/form/${row.id}`} className="text-blue-500">{row.title}</Link></TableCell>
               {isAuthenticated &&  <TableCell align="right">{getSingleFromResponses(row.id).length} responses</TableCell>}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
