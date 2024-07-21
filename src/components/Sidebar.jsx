import React from 'react'
import { Navbar } from './Navbar'
import {Search} from './search'
import {Chats} from './Chats'
export const Sidebar = () => {
  return (
    <div className="sidebar">
       <Navbar/>
       <Search/>
       <Chats/>
    </div>
  )
}
