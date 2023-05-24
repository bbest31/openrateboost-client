// @mui
import { Container, Typography, Paper } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
// hooks
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// config
import { AUTH0_API, SERVER_API } from '../config';
// utils
import { fDate } from '../utils/formatTime';

// ----------------------------------------------------------------------

const lockSymbol = <Iconify icon={'material-symbols:lock'} color="#919EAB" />;

export default function Home() {
  const { themeStretch } = useSettings();
  const [subjectLines, setSubjectLines] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const { domain, audience, scope } = AUTH0_API;
  const [userPlan, setUserPlan] = useState('free');
  const [loading, setLoading] = useState(false);
  const columns = [
    { field: 'text', headerName: 'Subject Line', type: 'string', flex: 3, minWidth: 300 },
    {
      field: 'openRate',
      headerName: 'Open Rate',
      type: 'number',
      description: 'Percentage of opens out of total sends',
      valueFormatter: (params) => (params.value !== null ? `${params.value}%` : '-'),
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        if (index > 4 && userPlan === 'free') return lockSymbol;
        return params.value !== null ? `${params.value}%` : '-';
      },
      flex: 1,
    },
    {
      field: 'uniqueOpens',
      headerName: 'Unique Opens',
      type: 'number',
      flex: 1,
      description: 'Total unique opens of emails with this subject line',
    },
    {
      field: 'opens',
      headerName: 'Total Opens',
      type: 'number',
      flex: 1,
      description: 'Total times emails with this subject line were opened',
    },
    {
      field: 'createdAt',
      headerName: 'Date Generated',
      type: 'dateTime',
      headerAlign: 'right',
      align: 'right',
      valueGetter: (params) => new Date(params.row.createdAt),
      valueFormatter: (params) => (params.value ? fDate(params.value) : '-'),
      flex: 1,
    },
  ];

  const MemoizedRow = React.memo(GridRow);
  const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

  const getSubjectLines = useCallback(
    () => {
      (async () => {
        setLoading(true);
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
        setLoading(false);
      })();
    },
    // eslint-disable-next-line
    [audience, getAccessTokenSilently, scope, user.sub]
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

  useEffect(() => {
    getUserPlan();
    getSubjectLines();
  }, [getSubjectLines, getUserPlan]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          OpenRateBoost
        </Typography>
        <Paper style={{ width: '100%', padding: '24px' }} elevation={3}>
          <DataGrid
            loading={loading}
            rows={subjectLines}
            columns={columns}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbarQuickFilter, row: MemoizedRow, columnHeaders: MemoizedColumnHeaders }}
            initialState={{ pagination: { paginationModel: { pageSize: 25, page: 0 } } }}
          />
        </Paper>
      </Container>
    </Page>
  );
}
