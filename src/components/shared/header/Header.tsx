import React from 'react';
import './Header.css';
import type { IUser } from '../../../models/user.interface';
import axios from 'axios';
import { LogOut, UserRound } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between bg-white px-15 py-3 shadow-md">
      <img
        src="oliveira-trust-logo.png"
        alt="Oliveira Trust Logo"
        className="h-8"
      />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <UserRound className="rounded-full border-1 border-solid mr-1" />
          <h1 className="text-xs font-bold">Felipe Mattos</h1>
        </div>
        <LogOut className="ml-3 size-4" />
      </div>
    </header>
  );
};

export default Header;
