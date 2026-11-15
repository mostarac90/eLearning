import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-white shadow-sm px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-800">
          EasyLearning
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-8">

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

        <h3 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
          EasyLearning – Courses
        </h3>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Create a course
          </h2>
          <CourseForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Available courses
          </h2>
          <CourseList />
        </section>

      </main>

    </div>
  )
}

export default App