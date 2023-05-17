// @mui
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// hooks
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// config
import { AUTH0_API, SERVER_API } from '../config';
// utils
import { fDateTimeSuffix } from '../utils/formatTime';

// ----------------------------------------------------------------------

const DEFAULT_ORDER = 'desc';
const DEFAULT_ORDER_BY = 'createdAt';

const lockSymbol = <Iconify icon={'material-symbols:lock'} color="#919EAB" />;

export default function Home() {
  const { themeStretch } = useSettings();
  const [subjectLines, setSubjectLines] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const { domain, audience, scope } = AUTH0_API;
  const [userPlan, setUserPlan] = useState('free');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'createdAt') {
      return new Date(b[orderBy]) - new Date(a[orderBy]);
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const createSortHandler = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * limit - subjectLines.length) : 0;

  const getSubjectLines = useCallback(
    () => {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience,
              scope,
            },
          });
          const res = await fetch(`${SERVER_API}/users/${user.sub}/subject-lines`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const subjectLinesJson = await res.json();
          const rows = [...subjectLines, ...subjectLinesJson];
          setSubjectLines(rows);
        } catch (e) {
          console.error(e.message);
        }
      })();
    },
    // eslint-disable-next-line
    [audience, getAccessTokenSilently, limit, scope, user.sub]
  );

  const getUserPlan = useCallback(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
            scope,
          },
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // eslint-disable-next-line
        const { user_metadata } = await metadataResponse.json();
        // eslint-disable-next-line
        setUserPlan(user_metadata?.plan || 'free');
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [audience, domain, getAccessTokenSilently, scope, user.sub]);

  /**
   * On change handler for when the user changes the rows to display per page
   * @param {Object} event
   */
  const rowsPerPage = useCallback((event) => {
    const updatedLimit = parseInt(event.target.value, 10);
    setLimit(updatedLimit);
    setPage(0);
  }, []);

  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    getUserPlan();
    getSubjectLines();
  }, [getSubjectLines, getUserPlan]);

  const visibleRows = useMemo(() => {
    const getComparator = (order, orderBy) =>
      order === DEFAULT_ORDER
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    return subjectLines.slice(page * limit, page * limit + limit).sort(getComparator(order, orderBy));
  }, [limit, orderBy, order, page, subjectLines]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          OpenRateBoost
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="subject line table">
            <TableHead>
              <TableRow>
                <TableCell>Subject Line</TableCell>
                <TableCell align="right" sortDirection={orderBy === 'openRate' ? order : 'asc'}>
                  <TableSortLabel
                    active={orderBy === 'openRate'}
                    direction={orderBy === 'openRate' ? order : 'asc'}
                    onClick={() => createSortHandler('openRate')}
                  >
                    Open Rate
                    {orderBy === 'openRate' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sortDirection={orderBy === 'uniqueOpens' ? order : 'asc'}>
                  <TableSortLabel
                    active={orderBy === 'uniqueOpens'}
                    direction={orderBy === 'uniqueOpens' ? order : 'asc'}
                    onClick={() => createSortHandler('uniqueOpens')}
                  >
                    Unique Opens
                    {orderBy === 'uniqueOpens' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sortDirection={orderBy === 'opens' ? order : 'asc'}>
                  <TableSortLabel
                    active={orderBy === 'opens'}
                    direction={orderBy === 'opens' ? order : 'asc'}
                    onClick={() => createSortHandler('opens')}
                  >
                    Total Opens
                    {orderBy === 'opens' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sortDirection={orderBy === 'createdAt' ? order : 'asc'}>
                  <TableSortLabel
                    active={orderBy === 'createdAt'}
                    direction={orderBy === 'createdAt' ? order : 'asc'}
                    onClick={() => createSortHandler('createdAt')}
                  >
                    Date Generated
                    {orderBy === 'createdAt' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.text}
                  </TableCell>
                  <TableCell align="right">
                    {userPlan === 'free' && (index > 4 || page > 0) ? lockSymbol : `${row.openRate}%`}
                  </TableCell>
                  <TableCell align="right">
                    {userPlan === 'free' && (index > 4 || page > 0) ? lockSymbol : `${row.uniqueOpens}`}
                  </TableCell>
                  <TableCell align="right">
                    {userPlan === 'free' && (index > 4 || page > 0) ? lockSymbol : `${row.opens}`}
                  </TableCell>
                  <TableCell align="right">{fDateTimeSuffix(new Date(row.createdAt))}</TableCell>
                </TableRow>
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
                  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={subjectLines.length}
                  rowsPerPage={limit}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={rowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
