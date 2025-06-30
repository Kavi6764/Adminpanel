import { Apartment, Assignment, People, Work } from "@mui/icons-material";

const Dashboard = () => {
  const stats = [
    { title: "Departments", count: 5, icon: <Apartment />, color: "bg-blue-500" },
    { title: "Leave Types", count: 4, icon: <Assignment />, color: "bg-green-500" },
    { title: "Employees", count: 20, icon: <People />, color: "bg-purple-500" },
    { title: "Leave Requests", count: 12, icon: <Work />, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl text-white shadow-md flex items-center space-x-4 ${item.color}`}
        >
          <div className="text-4xl">{item.icon}</div>
          <div>
            <p className="text-lg">{item.title}</p>
            <p className="text-2xl font-bold">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
