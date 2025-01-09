import { useState, useCallback, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DashboardContent } from 'src/layouts/dashboard';
import { PRODUCT_MOCK_DATA } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useTable, getComparator } from 'src/components/table';

import { FileManagerFilters } from '../file-manager-filters';
import { FileManagerGridView } from '../file-manager-grid-view';
import { FileManagerFiltersResult } from '../file-manager-filters-result';
import { FileManagerNewFolderDialog } from '../file-manager-new-folder-dialog';
import { FileManagerFolderView } from '../file-manager-folder-view';

export function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const openDateRange = useBoolean();
  const confirm = useBoolean();
  const upload = useBoolean();

  const [tableData, setTableData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const filters = useSetState({
    name: '',
    type: [],
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchData = () => {
      const folderMap = new Map();

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
            images: [],
          });
        }
        
        const folder = folderMap.get(product.category);
        folder.images = [...folder.images, ...product.images];
        folder.size += product.images.reduce((total, image) => total + image.size, 0);
      });

      const folderData = Array.from(folderMap.values());
      setTableData(folderData);
    };

    fetchData();
  }, []);

  const dateError = filters.state.startDate && filters.state.endDate
    ? filters.state.startDate.getTime() > filters.state.endDate.getTime()
    : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const canReset =
    !!filters.state.name ||
    filters.state.type.length > 0 ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFolderClick = useCallback((folder) => {
    setSelectedFolder(folder);
  }, []);

  const handleDeleteItem = useCallback(
    (id) => {
      const updatedData = tableData.map(folder => ({
        ...folder,
        images: folder.images.filter(image => image.id !== id),
        size: folder.images.filter(image => image.id !== id).reduce((total, image) => total + image.size, 0),
      })).filter(folder => folder.images.length > 0);

      toast.success('Delete success!');

      setTableData(updatedData);
      if (selectedFolder) {
        setSelectedFolder(updatedData.find(folder => folder.id === selectedFolder.id) || null);
      }

      table.onUpdatePageDeleteRow(dataFiltered.length);
    },
    [dataFiltered.length, table, tableData, selectedFolder]
  );

  const handleDeleteItems = useCallback(() => {
    const updatedData = tableData.map(folder => ({
      ...folder,
      images: folder.images.filter(image => !table.selected.includes(image.id)),
      size: folder.images.filter(image => !table.selected.includes(image.id)).reduce((total, image) => total + image.size, 0),
    })).filter(folder => folder.images.length > 0);

    toast.success('Delete success!');

    setTableData(updatedData);
    if (selectedFolder) {
      setSelectedFolder(updatedData.find(folder => folder.id === selectedFolder.id) || null);
    }

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataFiltered.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, table, tableData, selectedFolder]);

  const handleFolderUpdate = useCallback((updatedFolder) => {
    setTableData(prevData => 
      prevData.map(folder => 
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
    setSelectedFolder(updatedFolder);
  }, []);

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
      />
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
              startIcon={<Iconify icon="eva:cloud-upload-contained" />}
              onClick={upload.onTrue}
            >
              Upload
            </Button>
        </Stack>

        <CustomBreadcrumbs
          links={[
            { name: 'Dashboard' },
            { name: 'Documents' },
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
            {selectedFolder ? (
              <FileManagerFolderView 
                folder={selectedFolder} 
                onFileClick={(file) => console.log('File clicked:', file)}
                onFolderUpdate={handleFolderUpdate}
              />
            ) : (
              <FileManagerGridView
                table={table}
                dataFiltered={dataFiltered}
                onDeleteItem={handleDeleteItem}
                onOpenConfirm={confirm.onTrue}
                onFolderClick={handleFolderClick}
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
    inputData = inputData.filter((file) => type.includes(file.type));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (file) =>
          new Date(file.modifiedAt).getTime() >= startDate.getTime() &&
          new Date(file.modifiedAt).getTime() <= endDate.getTime()
      );
    }
  }

  return inputData;
}

