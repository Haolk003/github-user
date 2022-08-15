import React from 'react'
import { useEffect } from 'react';
import { useStateContext } from '../context/context';
import {AccumulationChartComponent,Inject,Category,AccumulationLegend,AccumulationSeriesCollectionDirective,AccumulationSeriesDirective,PieSeries,AccumulationTooltip,AccumulationDataLabel} from '@syncfusion/ej2-react-charts'
import { useState } from 'react';
const Lang = () => {
    const {repos} =useStateContext();  
    const languages = repos.reduce((total,item)=>{
      const {language,stargazers_count}=item;
      if(!language){
        return total;
      }
      else if(!total[language]){
        total[language]={
         label:language,
         value:1,
         stars:stargazers_count 
        }
      }
      else{
        total[language]={
          ...total[language],
          value:total[language].value +1,
          stars:total[language].value+stargazers_count,
        }
      }
      return total;
    },{})
      
    const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  return (

   <div className='w-[100%] bg-white h-[400px] rounded-md p-3'>
      <h2 className='text-center font-semibold text-2xl '>Languages</h2>
      <AccumulationChartComponent id="pie-chart"  width='100%' height='350px' legendSettings = {{enable:true}}   enableSmartLabels={false} enableAnimation={true} tooltip={{ enable: true}}>
        <Inject services={[AccumulationLegend,AccumulationDataLabel,AccumulationTooltip,PieSeries]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective dataSource={mostUsed}  xName="label" yName='value' explodeOffset='10%' explodeIndex={0} innerRadius="50%"
                  dataLabel={{
                    visible: true,
                    position: 'Outside', name: 'label' ,
                    font: {
                      fontWeight: '800',
                    },
                  }}
                  radius='70%'>  
          </AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  
  )
}

export default Lang;