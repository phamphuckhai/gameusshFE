import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { IconButton } from '@material-ui/core'

const End = () => (
    <Fragment>
        <Helmet><title>Tổng kết</title></Helmet>
        <div id="end">
            <section>
                <p>The page of the end</p>
            </section>
        </div>
    </Fragment>
    
);
    
export default End;