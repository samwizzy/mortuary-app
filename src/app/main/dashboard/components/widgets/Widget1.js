import React from 'react';
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius * 4,
    backgroundImage: `url(/assets/images/backgrounds/widget-blue-bg.svg)`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
      fontSize: theme.typography.subtitle1.fontSize,
    },
    '& .MuiCardContent-root': {
      minHeight: 160,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
  },
}));

const Widget1 = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h3'>100</Typography>
      </CardContent>

      <Divider />

      <CardActions>
        <Button size='small' onClick={() => {}}>
          Customers
        </Button>
      </CardActions>
    </Card>
  );
};

export default Widget1;
