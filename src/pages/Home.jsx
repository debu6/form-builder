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
import { Col, Row } from 'react-bootstrap';

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
      <div className='w-full flex flex-wrap justify-between items-center mb-2 '>
        <h1 className="text-2xl">Forms List</h1>
        <div className='gap-3'>
          {isAuthenticated ? <Link to={`/form-builder`}><button className='btn btn-success m-2'>Create Form</button></Link> : <Link to={`/login`}><button className='btn btn-success'>Log in</button></Link>}
          {isAuthenticated && <button className='btn btn-danger' onClick={()=>{dispatch(logout())}}>Logout</button>}</div>
      </div>

        <Row>
          <Col sm={12} md={3}></Col>
          <Col sm={12} md={6}>
          <TableContainer component={Paper}>
        <Table  aria-label="simple table">
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
               {isAuthenticated &&  <TableCell align="right"><Link to={`/responses/${row.id}`} className="text-blue-500">{getSingleFromResponses(row.id)?.length} responses</Link></TableCell>}

              </TableRow>
            ))}
          </TableBody>
          
        </Table>
        {
              forms?.length==0 && <div className='w-full flex justify-center py-2 '>No form found</div>
            }
      </TableContainer>
          </Col>
          <Col sm={12} md={3}></Col>
        </Row>
     
    </div>
  );
}

export default Home;
