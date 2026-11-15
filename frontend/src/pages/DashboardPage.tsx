  
  export default function DashboardPage() {
    return (
     <>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard
        </h2>

        <p className="text-slate-500 mb-8">
          Welcome back! Here's your learning overview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Active courses</p>
            <p className="text-3xl font-bold mt-2">4</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Pending assignments</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Completed assignments</p>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
        </div>
     </>
    )
  }