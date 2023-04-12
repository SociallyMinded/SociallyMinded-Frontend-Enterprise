import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Header from "../common/Header/Header";
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, Sankey } from 'recharts';
import { Link } from "react-router-dom";

import {
  LineChart,
  Line,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import useDashboardHooks from "./useDashboardHooks";
import Dropdown from 'react-bootstrap/Dropdown';


const determineMonth = (monthNumeric) => {
  let actualMonth = monthNumeric + 1
  if (actualMonth == 1) {
    return "Jan"
  }
  if (actualMonth == 2) {
    return "Feb"
  }
  if (actualMonth == 3) {
    return "Mar"
  }
  if (actualMonth == 4) {
    return "Apr"
  }
  if (actualMonth == 5) {
    return "May"
  }
  if (actualMonth == 6) {
    return "Jun"
  }
  if (actualMonth == 7) {
    return "Jul"
  }
  if (actualMonth == 8) {
    return "Aug"
  }
  if (actualMonth == 9) {
    return "Sept"
  }  
  if (actualMonth == 10) {
    return "Oct"
  } 
  if (actualMonth == 11) {
    return "Nov"
  }  
  if (actualMonth == 12) {
    return "Dec"
  }
}

export default function Dashboard() {
  const { user } = UserAuth();


  const {         
    searchQuery, loading, data,
    searchByProductName, searchPrompts, handleSearchQuery, 
    displayData, showSearchPrompts, performSearch, updatedOrderStatus, showOrderModal,
    setShowOrderModal, handleClose, performFilter, dataChartOne , dataChartTwo, dataChartThree,
    dataChartFour, dataChartFive, dataChartSix, dataChartSeven, dataChartEight,
    selectedMonth, setSelectedMonth, toggleRefresh
  } = useDashboardHooks(user);


  console.log(dataChartFive)

  const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  console.log(selectedMonth)

  return (
    <PageTemplate>
      {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
      <ChartContainer>
        <DashboardTitle>Orders Records Analytics for {new Date().getFullYear()}</DashboardTitle>
        
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Current Month : {determineMonth(selectedMonth-1)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {
          setSelectedMonth(1)
        }}>Jan</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(2)}>Feb</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(3)}>March</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(4)}>Apr</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(5)}>May</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(6)}>Jun</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(7)}>July</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(8)}>Aug</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(9)}>Sept</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(10)}>Oct</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(11)}>Nov</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedMonth(12)}>Dec</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        
        {dataChartOne != {} &&
          <>
          <ChartTitle>Total Sales Revenue</ChartTitle>
            <StyledBarChart
                width={1000}
                height={400}
                data={dataChartOne}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total sales" fill="#8884d8" />
              </StyledBarChart>
          </>
        }

      <GraphSectionTwo>
        {dataChartTwo != [] && 
            <GraphContainerTwo>
                <ChartTitle>Total Sales Revenue By Category</ChartTitle>  
                <StyledPieChart width={400} height={400}>
                <Pie
                  data={dataChartTwo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataChartTwo != null && dataChartTwo.map((entry, index) => (
                    <Cell key={`cell-${1}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </StyledPieChart>
            </GraphContainerTwo>
        }   
        {dataChartThree != [] && 
          <GraphContainerTwo>
            <ChartTitle>Order Records by Order Status</ChartTitle>
            <BarChart
              width={600}
              height={400}
              data={dataChartThree}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="number of records" fill="#e08da6" />
            </BarChart>
          </GraphContainerTwo>
          }
      </GraphSectionTwo>
      <GraphSectionThree>
      {dataChartFour != {} &&
          <PopularityAndRatingChartContainer>
          <ChartTitle>Top 5 Most Popular Products</ChartTitle>
            <StyledBarChart
                width={500}
                height={400}
                data={dataChartFive}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="number of records" fill="#5c94ed" />
              </StyledBarChart>
          </PopularityAndRatingChartContainer>
        }

        {dataChartSeven != {} &&
          <PopularityAndRatingChartContainer>
          <ChartTitle>Top 5 least popular products</ChartTitle>
            <StyledBarChart
                width={500}
                height={400}
                data={dataChartSeven}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickCount={3}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="number of records" fill="#5c94ed" />
              </StyledBarChart>
          </PopularityAndRatingChartContainer>
        }
     
      </GraphSectionThree>



      <GraphSectionThree>
      {dataChartSix != {} &&
          <PopularityAndRatingChartContainer>
          <ChartTitle>Top 5 Products with highest rating</ChartTitle>
            <StyledBarChart
                width={500}
                height={400}
                data={dataChartSix}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 5]} tickCount={6}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="average rating score" fill="#f5b064" />
              </StyledBarChart>
          </PopularityAndRatingChartContainer>
        }

        {dataChartEight != {} &&
          <PopularityAndRatingChartContainer>
          <ChartTitle>Top 5 Products with lowest rating</ChartTitle>
            <StyledBarChart
                width={500}
                height={400}
                data={dataChartEight}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 5]} tickCount={6}/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="average rating score" fill="#f5b064" />
              </StyledBarChart>
          </PopularityAndRatingChartContainer>
        }
  


      </GraphSectionThree>
      
      
      </ChartContainer>

    </PageTemplate>
  );
}

const PopularityAndRatingChartContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const GraphContainerTwo = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

const GraphSectionTwo = styled.div`
  display:flex;
  flex-direction:row;
`
const GraphSectionThree = styled.div`
    margin-top:5vh;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`

const DashboardTitle = styled.h2`
  margin-top:7vh;
  font-weight:100em;
`

const ChartTitle = styled.h4`
  margin-top:5vh;
  font-weight:100em;
`

const ChartContainer = styled.div`
  padding-left:0px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

const StyledBarChart = styled(BarChart)`
  margin-left:-20px;
  margin-top:3vh;
`

const StyledPieChart = styled(PieChart)`
  margin-left:-20px;
`