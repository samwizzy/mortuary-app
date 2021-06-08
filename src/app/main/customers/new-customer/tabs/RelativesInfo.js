import React, { Fragment } from 'react';
import { Button, Icon, TextField, Accordion, AccordionSummary, AccordionDetails, MenuItem, IconButton } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: "block"
  },
}))

const relationships = ["Brother", "Sister", "Mother", "Father", "Son", "Daughter", "Others"].map(r => ({
  label: r,
  value: r,
}))

function RelativesInfo(props) {
  const classes = useStyles()
  const { form, handleRowChange, addRelativeRow, removeRelativeRow } = props;
  const [expanded, setExpanded] = React.useState("relatives");

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Fragment>
      <div>
        <Accordion expanded={expanded === 'relatives'} onChange={handlePanelChange("relatives")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="relatives-content"
            id="relatives-header"
          >
            <Button className="" color="primary">Add Relatives</Button>
          </AccordionSummary>
          <AccordionDetails className={classes.root}>
          <div className="w-full flex mb-4">
            <Button onClick={addRelativeRow}>
              <Icon>add</Icon> Add
            </Button>
          </div>

          <div className="space-y-8">
          {form.relative.map((r, i) => 
          <div className="flex justify-between items-start" key={i}>
            <div className='w-full grid grid-cols-4 gap-x-8'>
              <TextField
                className='mt-8 mb-16'
                required
                label='First Name'
                autoFocus
                id='relative-first-name'
                name='first_name'
                value={r.first_name}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Last Name'
                autoFocus
                id='relative-last-name'
                name='last_name'
                value={r.last_name}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Other Name'
                autoFocus
                id='relative-other-name'
                name='other_name'
                value={r.other_name}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Email'
                autoFocus
                id='relative-email'
                name='email'
                value={r.email}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                select
                label='Relationship with deceased'
                autoFocus
                id='relative.relationship_with_deceased'
                name='relationship_with_deceased'
                value={r.relationship_with_deceased}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              >
                <MenuItem value="">Select relation with deceased</MenuItem>
                {relationships.map(r => 
                  <MenuItem key={r.value} value={r.value}>{r.value}</MenuItem>
                )}
              </TextField>  

              <TextField
                className='mt-8 mb-16'
                required
                label='Address'
                autoFocus
                id='relative-address'
                name='address'
                value={r.address}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Phone'
                autoFocus
                id='relative-phone'
                name='phone_number'
                value={r.phone_number}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Age'
                id='relative-age'
                name='age'
                value={r.age}
                onChange={handleRowChange(i)}
                variant='outlined'
                fullWidth
              />
            </div>
            <IconButton onClick={removeRelativeRow(i)}><Icon>delete</Icon></IconButton>
          </div>
          )}
          </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fragment>
  );
}

export default RelativesInfo;
