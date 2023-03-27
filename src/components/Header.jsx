import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="fixed w-screen h-[60px] z-10">
            <div className="h-[60px] backdrop-blur-sm bg-[rgba(255,255,255,.6)]">
                <div className="px-[40px] flex items-center h-full">
                    <div className="flex-[.2]">
                        <h2 className="text-2xl">Convin</h2>
                    </div>

                    <ul className="flex items-center gap-4">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/buckets">Buckets</Link>
                        </li>
                        <li>
                            <Link to="/history">History</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
