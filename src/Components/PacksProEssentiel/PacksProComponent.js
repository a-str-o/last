import React, { Component } from 'react'
import PacksProHeader from './PacksProHeader';
import PacksProTitles from './PacksProTitles';
import PacksProPriceTable from './PacksProPriceTable';



import './PacksProComponent.scss';


export class PacksProComponent extends Component {
    render() {
        return (
            <>

                <div className="pack-pro-timeline-conatiner--contai">
                 <PacksProHeader />
                 <PacksProTitles />
                 <PacksProPriceTable />
                 {/* <PacksProsArticle /> */}
                </div>



            </>
        )
    }
}

export default PacksProComponent
