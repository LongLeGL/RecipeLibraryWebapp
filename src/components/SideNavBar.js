import React from 'react';
import { NavLink } from 'react-router-dom';
import '../pages/global.css';
import './SideNavBar.css';
import Tabs from './Tabs';
import logo from '../img/logo.png';
import HomeIcon from '../img/home.svg'
import UserIcon from '../img/portrait.svg'
import LocationIcon from '../img/marker.svg'
import TruckIcon from '../img/truck-side.svg'
import UsersIcon from '../img/users.svg'
import LogoutIcon from '../img/signout.svg'

function SideNavBar() {
    return (
		<div className='SideNavBar'>
			<div className='AppName'>
				<img src={logo} alt='logo'/>
				<div>UWC 2.0</div>
			</div>

			<NavLink to="/CreateTask" className='CreateTaskBtn'>
				<button>Tạo công việc</button>
			</NavLink>

			<Tabs>
				<div label="Trang chủ" path="/Home" icon={HomeIcon} />
				<div label="Quản lí nhân viên" path="/PersonnelManage" icon={UsersIcon} />
				<div label="Quản lí điểm thu gom" path="/MCPManage" icon={LocationIcon} />
				<div label="Quản lí phương tiện" path="/VehicleManage" icon={TruckIcon} />
				<div label='_separator' />
				<div label="Quản lí tài khoản" path="/AccountManage" icon={UserIcon} />
			</Tabs>
			<NavLink to="/">
				<div className='LogoutBtn'>
					<img src={LogoutIcon} alt='Logout Icon'/>
					Đăng xuất
				</div>
			</NavLink>
		</div>
    );
}

export default SideNavBar;