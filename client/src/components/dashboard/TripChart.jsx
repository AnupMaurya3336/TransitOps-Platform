import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


function TripChart(){

    const data=[

        {
            name:"Mon",
            trips:4
        },

        {
            name:"Tue",
            trips:7
        },

        {
            name:"Wed",
            trips:5
        },

        {
            name:"Thu",
            trips:9
        },

        {
            name:"Fri",
            trips:12
        }

    ];


    return(

        <div className="bg-white rounded-2xl p-6 shadow-sm">


            <h2 className="text-xl font-bold text-gray-800 mb-5">
                Weekly Trip Analytics
            </h2>


            <ResponsiveContainer width="100%" height={300}>


                <LineChart data={data}>


                    <CartesianGrid strokeDasharray="3 3"/>


                    <XAxis dataKey="name"/>


                    <YAxis/>


                    <Tooltip/>


                    <Line
                        type="monotone"
                        dataKey="trips"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />


                </LineChart>


            </ResponsiveContainer>


        </div>

    );

}


export default TripChart;