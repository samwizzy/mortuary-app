import React, { useState } from 'react';
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Checkbox,
  Tooltip,
  IconButton,
  Icon,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Proforma Number',
    sort: true,
  },
  {
    id: 'no-of-services',
    align: 'left',
    disablePadding: false,
    label: 'No. of Services',
    sort: true,
  },
  {
    id: 'contact-person',
    align: 'left',
    disablePadding: false,
    label: 'Contact Person',
    sort: true,
  },
  {
    id: 'created_by',
    align: 'left',
    disablePadding: false,
    label: 'Created By',
    sort: true,
  },
  {
    id: 'date-created',
    align: 'left',
    disablePadding: false,
    label: 'Date Created',
    sort: true,
  },
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function CustomersTableHead(props) {
  const classes = useStyles(props);
  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className='h-64'>
        <TableCell padding='checkbox' className='relative pl-4 sm:pl-12'>
          <Checkbox
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {props.numSelected > 0 && (
            <div
              className={clsx(
                'flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10',
                classes.actionsButtonWrapper
              )}
            >
              <IconButton
                aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                aria-haspopup='true'
                onClick={openSelectedProductsMenu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id='selectedProductsMenu'
                anchorEl={selectedProductsMenu}
                open={Boolean(selectedProductsMenu)}
                onClose={closeSelectedProductsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closeSelectedProductsMenu();
                    }}
                  >
                    <ListItemIcon className='min-w-40'>
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary='Remove' />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title='Sort'
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default CustomersTableHead;
