import React, {useEffect, useState} from 'react';
import {fetchPlanetsData} from "../../../../../../reducers/ActionCreator";
import {IPlot} from "../../../../../../types/store/threejs/planetObjectsTypes";
import {useAppDispatch, useAppSelector} from "../../../../../../hooks/redux";

const ProductCard = () => {



    return (
        <div className='product-card'>
            <div className='product-card-owner'>

            </div>
        </div>
    );
};

export default ProductCard;