import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper, Input, Icon, TextField, MenuItem, Typography, CircularProgress } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import _ from "lodash"
import * as Actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(0.2, 1),
  },
}));

function ReportsHeader(props) {
  const { match } = props;
  const classes = useStyles()
  const dispatch = useDispatch();
  const searchText = '';
  const branches = useSelector(({ezone}) => ezone.branches.branches)
  const loading = useSelector(({reportsApp}) => reportsApp.reports.loading)
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  const [form, setForm] = useState({
    branchId: "",
    endDate: null,
    orgKey: 1,
    startDate: null
  });

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: moment(date).format("YYYY-MM-DD") });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(Actions.getVoucherReports(form))
  }

  const canSubmit = () => {
    return (
      form.startDate && 
      form.endDate && 
      form.branchId 
    )
  }

  console.log(branches, "branches")
  console.log(form, "form")
  console.log(_.every(form, _.isEmpty), "_.every(form, !_.isEmpty)")

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <FuseAnimate animation='transition.expandIn' delay={300}>
          <Icon className='text-32 mr-0 sm:mr-12'>person</Icon>
        </FuseAnimate>
        <FuseAnimate animation='transition.slideLeftIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            {match.params.id ? 'Voucher Report Details' : 'Voucher Reports'}
          </Typography>
        </FuseAnimate>
      </div>

      <div className='flex flex-1 items-start justify-center px-12 space-x-8'>
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <Paper
              className='flex items-center px-8 py-4 rounded-8'
              elevation={1}
            >
              <Icon className='mr-8' color='action'>
                search
              </Icon>

              <Input
                placeholder='Search'
                className='flex flex-1'
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={ev => dispatch(Actions.setSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>

        <FuseAnimate animation='transition.slideDownIn' delay={300}>
          <TextField
            className='min-w-128'
            select
            label='Branch'
            id='branch_id'
            name='branchId'
            value={form.branchId}
            onChange={handleChange}
            variant='outlined'
            size="small"
            InputLabelProps={{
              disabled: true,
            }}
          >
            <MenuItem value="">Select branch</MenuItem>
            {branches.map(b => 
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            )}
          </TextField>  
        </FuseAnimate>

        <div className="flex items-start space-x-8">
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='flex-start' className={classes.root}>
                <div className="flex flex-col">
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/dd/yyyy'
                    id='start-date'
                    label="Start"
                    value={form.startDate}
                    onChange={handleDateChange("startDate")}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      disabled: true,
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/dd/yyyy'
                    id='end-date'
                    label="End"
                    value={form.endDate}
                    onChange={handleDateChange("endDate")}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      disabled: true,
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </Grid>
            </MuiPickersUtilsProvider>
          </FuseAnimate>
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <Button 
              variant="contained"
              disableElevation
              onClick={handleSubmit}
              endIcon={loading && <CircularProgress size={16} />}
              disabled={!canSubmit()}
            >
              Filter
            </Button>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ReportsHeader);
