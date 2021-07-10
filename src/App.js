import * as d3 from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const datas = [
  [ 0, 40, 
    0.01, 50, 
    0.02, 10, 
    0.03, 60, 
    0.04, 100, 
    0.05, 90, 
    0.06, 35, 
    0.07, 70, 
    0.08, 10, 
    0.09, 50, 
    0.1, 105, 
    0.11, 10,
    0.12, 50,
    0.13, 0,
    0.14, 50,
    0.15, 45,
    0.16, 60,
    0.17, 40,
    0.18, 30,
    0.19, 20,
    0.2, 10,
    0.21, 20,
    0.22, 60,
    0.23, 70,
    0.24, 40,
    0.25, 50,
    0.26, 10,
    0.27, 30,
    0.28, 65,
    0.29, 70,
    0.3, 30,
    0.31, 40,
    0.32, 40,
    0.33, 90,
    0.34, 60,
    0.35, 50,
    0.36, 40,
    0.37, 30,
    0.38, 70,
    0.39, 20,
    0.4, 60,
    0.41, 40,
    0.42, 10,
    0.43, 100,
    0.44, 70,
    0.45, 100,
    0.46, 40,
    0.47, 70,
    0.48, 80,
    0.49, 60,
    0.5, 30,
    0.51, 30,
    0.52, 60,
    0.53, 30,
    0.54, 50,
    0.55, 50,
    0.56, 30,
    0.57, 30,
    0.58, 120,
    0.59, 50,
    0.6, 80,
    0.61, 10,
    0.62, 80,
    0.63, 50,
    0.64, 50,
    0.65, 40,
    0.66, 50,
    0.67, 10,
    0.68, 50,
    0.69, 60,
    0.7, 20,
    0.71, 70,
    0.72, 80,
    0.73, 40,
    0.74, 70,
    0.75, 50,
    0.76, 90,
    0.77, 90,
    0.78, 70,
    0.79, 80,
    0.8, 70,
    0.81, 70,
    0.82, 50,
    0.83, 60,
    0.84, 80,
    0.85, 20,
    0.86, 40,
    0.87, 80,
    0.88, 80,
    0.89, 70,
    0.9, 30
  ],
  [
    0.91, 100,
    0.92, 70,
    0.93, 80,
    0.94, 40,
    0.95, 50,
    0.96, 70,
    0.97, 70,
    0.98, 130,
    0.99, 70,
    1, 50,
    1.01, 70,
    1.02, 70,
    1.03, 30,
    1.04, 80,
    1.05, 70,
    1.06, 30,
    1.07, 60,
    1.08, 110,
    1.09, 70,
    1.1, 70,
    1.11, 80,
    1.12, 60,
    1.13, 50,
    1.14, 50,
    1.15, 90,
    1.16, 80,
    1.17, 80,
    1.18, 70,
    1.19, 70,
    1.2, 50,
    1.21, 70,
    1.22, 20,
    1.23, 80,
    1.24, 90,
    1.25, 80,
    1.26, 40,
    1.27, 40,
    1.28, 40,
    1.29, 60,
    1.3, 60
  ]
]
var i = 0;
var colors = [ "#7E552E", "green", "##9B673A", "#7F5F39" ];

function App() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
      changeData();
  }, []);

  const changeData = () => {
      setData(datas[i++]);
      if(i === datas.length) i = 0;
  }

  return (
      <div className="App">
          <h2>Graphs with React</h2>
          <button className="btn" onClick={changeData}>Change Data</button>
          <BarChart width={1800} height={400} data={data} />
      </div>
  );
}

function BarChart({ width, height, data }){
  const ref = useRef();

  useEffect(() => {
      const svg = d3.select(ref.current)
          .attr("width", width)
          .attr("height", height)
          .style("fill", "blue")
          .style("border", "1px solid black")
  }, []);

  useEffect(() => {
      draw();
  }, [data]);

  const draw = () => {
      
      const svg = d3.select(ref.current);
      var selection = svg.selectAll("rect").data(data);

      var grad = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');
    
    grad.selectAll('stop')
      .data(colors)
      .enter()
      .append('stop')
      .style('stop-color', function(d){ return d; })
      .attr('offset', function(d,j){
        return 100 * (j / (colors.length - 1)) + '%';
      })

      var yScale = d3.scaleLinear()
                          .domain([0, d3.max(data)])
                          .range([0, height-100]);
      
      selection
          .transition().duration(300)
              .attr("height", (d) => yScale(d))
              .attr("y", (d) => height - yScale(d))

      selection
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 10)
          .attr("y", (d) => height)
          .attr("width", 10)
          .attr("height", 0)
          .attr("fill", "url(#grad)")
          .transition().duration(300)
              .attr("height", (d) => yScale(d))
              .attr("y", (d) => height - yScale(d))
      
      selection
          .exit()
          .transition().duration(300)
              .attr("y", (d) => height)
              .attr("height", 0)
          .remove()
  }

  return (
      <div className="chart">
          <svg ref={ref}>
          </svg>
      </div>
      
  )

}

export default App;