import * as React from 'react'
import {FunctionComponent} from "react";
import {NewsTemplate} from "./NewsTemplate";


export interface NewsProps{

}

export const News:FunctionComponent<NewsProps>=()=>{
    return(
        <div>
            <NewsTemplate/>
            <NewsTemplate/>
            <NewsTemplate/>
            <NewsTemplate/>
        </div>
    )
}