import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';
// import * as Actions from './store/actions';
// import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';

function CustomersList(props) {
  const dispatch = useDispatch();
  const contacts = [
    {
        'id'      : '5725a680b3249760ea21de52',
        'name'    : 'Abbott',
        'lastName': 'Keitch',
        'avatar'  : 'assets/images/avatars/Abbott.jpg',
        'nickname': 'Royalguard',
        'company' : 'Saois',
        'jobTitle': 'Digital Archivist',
        'email'   : 'abbott@withinpixels.com',
        'phone'   : '+1-202-555-0175',
        'address' : '933 8th Street Stamford, CT 06902',
        'birthday': undefined,
        'notes'   : ''
    },
    {
        'id'      : '5725a680606588342058356d',
        'name'    : 'Arnold',
        'lastName': 'Matlock',
        'avatar'  : 'assets/images/avatars/Arnold.jpg',
        'nickname': 'Wanderer',
        'company' : 'Laotcone',
        'jobTitle': 'Graphic Artist',
        'email'   : 'arnold@withinpixels.com',
        'phone'   : '+1-202-555-0141',
        'address' : '906 Valley Road Michigan City, IN 46360',
        'birthday': undefined,
        'notes'   : ''
    },
    {
        'id'      : '5725a68009e20d0a9e9acf2a',
        'name'    : 'Barrera',
        'lastName': 'Bradbury',
        'avatar'  : 'assets/images/avatars/Barrera.jpg',
        'nickname': 'Jackal',
        'company' : 'Unizim',
        'jobTitle': 'Graphic Designer',
        'email'   : 'barrera@withinpixels.com',
        'phone'   : '+1-202-555-0196',
        'address' : '183 River Street Passaic, NJ 07055',
        'birthday': undefined,
        'notes'   : ''
    }
	];
  const selectedContactIds = ['5725a68009e20d0a9e9acf2a'];
  const searchText = "";
  const user = {
				'id'              : '5725a6802d10e277a0f35724',
				'name'            : 'John Doe',
				'avatar'          : 'assets/images/avatars/profile.jpg',
				'starred'         : [
						'5725a680ae1ae9a3c960d487',
						'5725a6801146cce777df2a08',
						'5725a680bbcec3cc32a8488a',
						'5725a680bc670af746c435e2',
						'5725a68009e20d0a9e9acf2a'
				],
				'frequentContacts': [
						'5725a6809fdd915739187ed5',
						'5725a68031fdbb1db2c1af47',
						'5725a680606588342058356d',
						'5725a680e7eb988a58ddf303',
						'5725a6806acf030f9341e925',
						'5725a68034cb3968e1f79eac',
						'5725a6801146cce777df2a08',
						'5725a680653c265f5c79b5a9'
				],
				'groups'          : [
						{
								'id'        : '5725a6802d10e277a0f35739',
								'name'      : 'Friends',
								'contactIds': [
										'5725a680bbcec3cc32a8488a',
										'5725a680e87cb319bd9bd673',
										'5725a6802d10e277a0f35775'
								]
						},
						{
								'id'        : '5725a6802d10e277a0f35749',
								'name'      : 'Clients',
								'contactIds': [
										'5725a680cd7efa56a45aea5d',
										'5725a68018c663044be49cbf',
										'5725a6809413bf8a0a5272b1',
										'5725a6803d87f1b77e17b62b'
								]
						},
						{
								'id'        : '5725a6802d10e277a0f35329',
								'name'      : 'Recent Workers',
								'contactIds': [
										'5725a680bbcec3cc32a8488a',
										'5725a680653c265f5c79b5a9',
										'5725a6808a178bfd034d6ecf',
										'5725a6801146cce777df2a08'
								]
						}
				]
		};


  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      if (searchText.length === 0) {
        return entities;
      }
      return FuseUtils.filterArrayByString(entities, searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center h-full'>
        <Typography color='textSecondary' variant='h5'>
          There are no customers!
        </Typography>
      </div>
    );
  }

  return (
    <FuseAnimate animation='transition.slideUpIn' delay={300}>
      <ReactTable
        className='-striped -highlight h-full sm:rounded-16 overflow-hidden'
        getTrProps={(state, rowInfo, column) => {
          return {
            className: 'cursor-pointer',
            onClick: (e, handleOriginal) => {},
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: () => (
              <Checkbox
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={(event) => {
                  // event.target.checked
                  //   ? ()=>{}
                  //   : ()=>{};
                }}
                checked={
                  selectedContactIds.length === contacts.length &&
                  selectedContactIds.length > 0
                }
                indeterminate={
                  selectedContactIds.length !== contacts.length &&
                  selectedContactIds.length > 0
                }
              />
            ),
            accessor: '',
            Cell: (row) => {
              return (
                <Checkbox
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  checked={selectedContactIds.includes(row.value.id)}
                  onChange={() => {}}
                />
              );
            },
            className: 'justify-center',
            sortable: false,
            width: 64,
          },
          {
            Header: () =>
              selectedContactIds.length > 0 && <div />,
            accessor: 'avatar',
            Cell: (row) => (
              <Avatar
                className='mr-8'
                alt={row.original.name}
                src={row.value}
              />
            ),
            className: 'justify-center',
            width: 64,
            sortable: false,
          },
          {
            Header: 'First Name',
            accessor: 'name',
            filterable: true,
            className: 'font-bold',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            filterable: true,
            className: 'font-bold',
          },
          {
            Header: 'Company',
            accessor: 'company',
            filterable: true,
          },
          {
            Header: 'Job Title',
            accessor: 'jobTitle',
            filterable: true,
          },
          {
            Header: 'Email',
            accessor: 'email',
            filterable: true,
          },
          {
            Header: 'Phone',
            accessor: 'phone',
            filterable: true,
          },
          {
            Header: '',
            width: 128,
            Cell: (row) => (
              <div className='flex items-center'>
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    // dispatch(Actions.toggleStarredContact(row.original.id));
                  }}
                >
                  {user.starred && user.starred.includes(row.original.id) ? (
                    <Icon>star</Icon>
                  ) : (
                    <Icon>star_border</Icon>
                  )}
                </IconButton>
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    // dispatch(Actions.removeContact(row.original.id));
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        noDataText='No contacts found'
      />
    </FuseAnimate>
  );
}

export default CustomersList;
