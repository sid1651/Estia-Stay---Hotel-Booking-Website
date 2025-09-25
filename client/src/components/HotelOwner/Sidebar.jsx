import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'


const Sidebar = () => {
  const SidebarLinks = [
    { name: 'Dashboard', path: '/owner', icon: assets.dashboardIcon },
    { name: 'Add Room', path: '/owner/add-room', icon: assets.addIcon },
    { name: 'List Room', path: '/owner/list-room', icon: assets.listIcon },
  ]

  return (
    <div className="sidebar-container">
      {SidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <img src={item.icon} alt={item.name} className="sidebar-icon" />
          <span className="sidebar-text">{item.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
