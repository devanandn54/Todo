import React from 'react'
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell} from 'recharts'

const PieChartComponent = ({tasks}) => {
  const { completedTasks, dueTasks } = tasks
  const data = [
    {name: 'Completed Tasks', value: completedTasks},
    {name: 'Due Tasks', value: dueTasks},
  ]

  const COLORS = ['#66bb6a', '#ef5350']

  return (
    <ResponsiveContainer width='100%' height={400} sx={{maxWidth: '100%', margin: '0 auto'}}>
      <PieChart>
        <Pie
          dataKey='value'
          isAnimationActive={true}
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={160}
          fill='#8884d8'
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
