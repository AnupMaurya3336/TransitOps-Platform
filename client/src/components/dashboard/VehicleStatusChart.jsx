import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function VehicleStatusChart(){

    const data=[
        {name:"Available",value:12},
        {name:"On Trip",value:5},
        {name:"Maintenance",value:3},
        {name:"Retired",value:1}
    ];

    const COLORS=[
        "#22c55e",
        "#3b82f6",
        "#f59e0b",
        "#ef4444"
    ];

    return(

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
                Vehicle Status
            </h2>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                    >

                        {
                            data.map((entry,index)=>(
                                <Cell key={index} fill={COLORS[index]}/>
                            ))
                        }

                    </Pie>

                    <Tooltip/>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default VehicleStatusChart;