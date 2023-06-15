"use client";
import React from "react";
import Link from "next/link";

interface IRoute {
  path: string;
  label: string;
}

interface HeaderProps {
  routes: IRoute[];
}

const NavBar: React.FC<HeaderProps> = ({ routes }) => {
  return (
    <header className="shadow-default">
      <div className="container flex h-20 items-center justify-between">
        <h2>Kenzie Empresas</h2>
        <nav>
          {routes.map((route, index) => (
            <Link key={index} href={route.path}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
