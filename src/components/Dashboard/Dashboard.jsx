import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Header from "../common/Header/Header";
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, Sankey } from 'recharts';
import { Link } from "react-router-dom";
import './tooltip.css'

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
import { Text } from "recharts";
import { Card } from "react-bootstrap";

const CustomXAxisTick = ({ x, y, payload }) => {
  if (payload && payload.value) {
    return (
      <Text
          fontSize={"18px"}
          x={x} 
          y={y} 
          textAnchor="middle" 
          verticalAnchor="start"
      >{payload.value}
      </Text>

    );
  }
  return null;
};

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
    selectedMonth, setSelectedMonth, toggleRefresh, totalRevenue, totalRecords
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Id : ${label}`}</p>
          <p className="label">{`Name : ${payload[0].payload.name}`}</p>
          <p className="label">{`Rating : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
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

    <CardsSection>
          <CardContainer>
            <Card>
              <StyledCardBody>
                <CardTitle>Total Sales Revenue</CardTitle>
                <CardSubtitle>{"$" + totalRevenue}</CardSubtitle>
              </StyledCardBody>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <StyledCardBody>
                <CardTitle>Total Order Records</CardTitle>
                <CardSubtitle>{totalRecords}</CardSubtitle>
              </StyledCardBody>
            </Card>
          </CardContainer>
        </CardsSection>

        
        {dataChartOne != {} &&
          <>
          <ChartTitle>Total Sales Revenue By Day</ChartTitle>
          
          <LineChart
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
          <Line type="monotone" dataKey="total sales" stroke="#8884d8" />
        </LineChart>
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
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" textAnchor= "middle" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "0" fontSize={"12px"}/>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
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
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" textAnchor= "middle" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "0" fontSize={"12px"}/>
                <YAxis tickCount={3}/>
                <Tooltip content={<CustomTooltip />} />
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
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" textAnchor= "middle" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "0" fontSize={"12px"}/>
                <YAxis type="number" domain={[0, 5]} tickCount={6}/>
                <Tooltip content={<CustomTooltip />} />
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
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" textAnchor= "middle" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "0" fontSize={"12px"}/>
                <YAxis type="number" domain={[0, 5]} tickCount={6}/>
                <Tooltip content={<CustomTooltip />} />
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

const CardTitle = styled.h5`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top:2vh;
`

const CardSubtitle = styled.h6`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top:2vh;
  font-size:1.5em;
`

const StyledCardBody = styled(Card.Body)`
  padding:1em;
`

const CardsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:5vw;
  margin-top:5vh;
`;

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

const StyledBarChart = styled(LineChart)`
  margin-left:-20px;
  margin-top:3vh;
`

const StyledPieChart = styled(PieChart)`
  margin-left:-20px;
`