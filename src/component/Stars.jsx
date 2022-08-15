import React, { useEffect } from 'react'
import { useStateContext } from '../context/context';
import {  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,  LineSeries, Category, ColumnSeries,  DataLabel,
  Tooltip} from '@syncfusion/ej2-react-charts'
const Stars = () => {
    const {repos}=useStateContext();
    const stars=repos.reduce((total,item)=>{
        const {stargazers_count,name}=item;
        if(stargazers_count){
           total[name]={name:name,stars:stargazers_count}
        }
        else{
          return total;
        }
       return total;
    },{});
    const mostStars=Object.values(stars).sort((a,b)=>{
      return b.stars-a.stars;
    }).slice(0,5);
    
    const pointRender=(args)=>{
      let seriesColor=["#1affff","#c44dff","#ffff00","#ff5050","#663300"];
      args.fill=seriesColor[args.point.index];
      return args.fill;
    }
  return (
    <div className='w-[100%] h-[400px] bg-white rounded-md '>
        <h2 className='text-center font-semibold text-2xl'>Most Popular</h2>
        <ChartComponent  id="chart" pointRender={pointRender} width='100%' height='350px'  primaryXAxis={{title:"Repos",titleStyle:{size:"20px",fontWeight:"bold"}, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, tickPosition: 'Outside', labelPosition:'Outside', labelStyle: { color: '#000',size:"15px" } }}>
          <Inject services={[ColumnSeries,DataLabel,Category,Tooltip,LineSeries]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={mostStars} pointColorMapping="color" type="Column" xName='name' yName="stars" primaryXAxis={{labelPosition:'Outside'}}  marker={{ visible:true,dataLabel: { visible: true, font: { fontWeight: '600', color: '#333' ,size:'16px'} } }}>
              
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
    </div>
  )
}

export default Stars;