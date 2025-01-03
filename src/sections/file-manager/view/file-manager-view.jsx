import { useState, useCallback, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { _allFiles, FILE_TYPE_OPTIONS, PRODUCT_MOCK_DATA, FOLDER_MOCK_DATA } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { fileFormat } from 'src/components/file-thumbnail';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useTable, rowInPage, getComparator } from 'src/components/table';

import { FileManagerTable } from '../file-manager-table';
import { FileManagerFilters } from '../file-manager-filters';
import { FileManagerGridView } from '../file-manager-grid-view';
import { FileManagerFiltersResult } from '../file-manager-filters-result';
import { FileManagerNewFolderDialog } from '../file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

export function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const openDateRange = useBoolean();

  const confirm = useBoolean();

  const upload = useBoolean();

  const [view, setView] = useState('list');

  const [tableData, setTableData] = useState([]);

  const filters = useSetState({
    name: '',
    type: [],
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    // Fetch data from PRODUCT_MOCK_DATA and FOLDER_MOCK_DATA
    const fetchData = () => {
      const folderMap = new Map();

      // Create folders based on categories
      PRODUCT_MOCK_DATA.forEach(product => {
        if (!folderMap.has(product.category)) {
          folderMap.set(product.category, {
            id: `folder-${product.category}`,
            name: product.category,
            type: 'folder',
            size: 0,
            modifiedAt: new Date().toISOString(),
            shared: [],
            isFavorited: false,
            files: [],
          });
        }
        
        // Add files to the corresponding folder
        const folder = folderMap.get(product.category);
        product.images.forEach((image, index) => {
          folder.files.push({
            id: `${product.id}-image-${index}`,
            name: image.name,
            type: 'file',
            size: image.size,
            modifiedAt: new Date().toISOString(),
            shared: [],
            isFavorited: false,
            folder: product.category,
          });
        });
        folder.size += product.images.reduce((total, image) => total + image.size, 0);
      });

      // Convert folder map to array
      const folderData = Array.from(folderMap.values());

      setTableData(folderData);
    };

    fetchData();
  }, []);

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.type.length > 0 ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);

  const handleDeleteItem = useCallback(
    (id) => {
      const updatedData = tableData.map(folder => {
        if (folder.type === 'folder') {
          return {
            ...folder,
            files: folder.files.filter(file => file.id !== id),
            size: folder.files.filter(file => file.id !== id).reduce((total, file) => total + file.size, 0),
          };
        }
        return folder;
      }).filter(folder => folder.files.length > 0);

      toast.success('Delete success!');

      setTableData(updatedData);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteItems = useCallback(() => {
    const updatedData = tableData.map(folder => {
      if (folder.type === 'folder') {
        return {
          ...folder,
          files: folder.files.filter(file => !table.selected.includes(file.id)),
          size: folder.files.filter(file => !table.selected.includes(file.id)).reduce((total, file) => total + file.size, 0),
        };
      }
      return folder;
    }).filter(folder => folder.files.length > 0);

    toast.success('Delete success!');

    setTableData(updatedData);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
    >
      <FileManagerFilters
        filters={filters}
        dateError={dateError}
        onResetPage={table.onResetPage}
        openDateRange={openDateRange.value}
        onOpenDateRange={openDateRange.onTrue}
        onCloseDateRange={openDateRange.onFalse}
        options={{ types: FILE_TYPE_OPTIONS }}
      />

      <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );

  const renderResults = (
    <FileManagerFiltersResult
      filters={filters}
      totalResults={dataFiltered.length}
      onResetPage={table.onResetPage}
    />
  );

  return (
    <>
      <DashboardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">File manager</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={upload.onTrue}
          >
            Upload
          </Button>
        </Stack>
 <CustomBreadcrumbs
        links={[
          { name: 'Dashboard'},
          { name: 'Documents'},
          { name: 'All Document' },
        ]}
        sx={{ my: { xs: 3, md: 2 } }}
      />
        <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
          {renderFilters}

          {canReset && renderResults}
        </Stack>

        {notFound ? (
          <EmptyContent filled sx={{ py: 10 }} />
        ) : (
          <>
            {view === 'list' ? (
              <FileManagerTable
                table={table}
                dataFiltered={dataFiltered}
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
              />
            ) : (
              <FileManagerGridView
                table={table}
                dataFiltered={dataFiltered}
                onDeleteItem={handleDeleteItem}
                onOpenConfirm={confirm.onTrue}
              />
            )}
          </>
        )}
      </DashboardContent>

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (type.length) {
    inputData = inputData.filter((file) => type.includes(fileFormat(file.type)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((file) => fIsBetween(file.modifiedAt, startDate, endDate));
    }
  }

  return inputData;
}

