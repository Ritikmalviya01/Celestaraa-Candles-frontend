import React from 'react'
import Header from '../pages/Header'
import { Outlet } from "react-router-dom";
import AdminDashHome from '../Modules/admin/pages/AdminDashHome'

const AdminSideBar = () => {
  return (
   <section className="bg-white">
      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* left part */}
        <div className="bg-bg py-0 overflow-auto hidden lg:block border-r">
          <AdminDashHome/>
        </div>
        {/* right part */}
        <div className="bg-gray-50 min-h-[90vh] flex flex-col gap-6 w-full  h-[100vh] overflow-x-scroll">
          <Header />
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default AdminSideBar
