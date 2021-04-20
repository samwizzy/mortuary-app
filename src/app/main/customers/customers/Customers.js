import React from 'react';
import {FusePageCarded} from '@fuse';
// import withReducer from 'app/store/withReducer';
import ProductsTable from './CustomersList';
import CustomersHeader from './CustomersHeader';
// import reducer from '../store/reducers';

function Products()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <CustomersHeader/>
            }
            content={
                <ProductsTable/>
            }
            innerScroll
        />
    );
}

// export default withReducer('eCommerceApp', reducer)(Products);
export default Products;
