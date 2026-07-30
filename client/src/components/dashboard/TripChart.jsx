import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


function TripChart({data}) {


    const chartData = [

        {
            name:"Total",
            trips:data?.totalTrips || 0
        },

        {
            name:"Active",
            trips:data?.activeTrips || 0
        },

        {
            name:"Completed",
            trips:data?.completedTrips || 0
        },

        {
            name:"Pending",
            trips:data?.pendingTrips || 0
        }

    ];


    return (

        <div className="bg-white rounded-2xl p-6 shadow-sm">


            <h2 className="text-xl font-bold text-gray-800 mb-5">

                Trip Analytics

            </h2>


            <ResponsiveContainer width="100%" height={300}>


                <LineChart data={chartData}>


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