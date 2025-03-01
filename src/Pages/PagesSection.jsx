import { Car, Users, DollarSign, Calendar } from "lucide-react";

const stats = {
  activeRentals: 124,
  availableCars: 45,
  totalRevenue: 52890,
  customerCount: 1234,
};

const PageSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        {
          title: "Active Rentals",
          value: stats.activeRentals,
          icon: Calendar,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Available Cars",
          value: stats.availableCars,
          icon: Car,
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          title: "Total Revenue",
          value: `$${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
        {
          title: "Total Customers",
          value: stats.customerCount,
          icon: Users,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageSection;
