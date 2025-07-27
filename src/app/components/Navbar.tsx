'use client';
import Link from 'next/link';
import { useEffect, useState } from "react";
import Branding from "./Branding";

interface NavbarLinkInterface {
    name: string;
    href: string;
    icon: string;
}

interface NavbarLinkTopicInterface {
    name: string;
    links: NavbarLinkInterface[];
}

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [hoverOnBranding, setHoverOnBranding] = useState(false);
    const [hoverOnLink, setHoverOnLink] = useState('');

    const navbarTopics: NavbarLinkTopicInterface[] = [
        {
            name: 'Administración',
            links: [
                { name: 'Analítica', href: '/analytics', icon: '📊' },
                { name: 'Facturación', href: '/billing', icon: '💳' },
                { name: 'Usuarios', href: '/users', icon: '👤' },
            ],
        },
        {
            name: 'Gestión',
            links: [
                { name: 'Agenda', href: '/schedule', icon: '📅' },
                // { name: 'Doctores', href: '/doctors', icon: '👨‍⚕️' },
                // { name: 'Pacientes', href: '/patients', icon: '👥' },
            ],
        },
        // {
        //     name: 'Área Médica',
        //     links: [
        //         { name: 'Mi Agenda', href: '/my-schedule', icon: '🗓️' },
        //         { name: 'Pacientes', href: '/my-patients', icon: '🧑‍🤝‍🧑' },
        //     ],
        // },
    ];

    const ArrowSVG = ({ rotate }: { rotate: number }) => (
        <svg
            className="w-[20px] h-[20px] transition-transform duration-200"
            style={{ transform: `rotate(${rotate}deg)` }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                d="M17.8726 5.84272L17.1573 5.12736C16.9875 4.95755 16.7129 4.95755 16.5431 5.12736L10 11.656L3.45693 5.12736C3.28712 4.95755 3.01253 4.95755 2.84272 5.12736L2.12736 5.84272C1.95755 6.01253 1.95755 6.28712 2.12736 6.45693L9.6929 14.0225C9.86271 14.1923 10.1373 14.1923 10.3071 14.0225L17.8726 6.45693C18.0425 6.28712 18.0425 6.01253 17.8726 5.84272Z"
                fill="currentColor"
            />
        </svg>
    )

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            setIsDarkMode(systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);


    return (
        <div className="flex flex-col bg-[var(--color-foreground)]/15 p-4 justify-between">
            <div className='space-y-10'>
                <div
                    className="flex items-center gap-6 relative"
                    onMouseEnter={() => setHoverOnBranding(!isOpen && true)}
                    onMouseLeave={() => setHoverOnBranding(false)}
                >
                    <Branding className={`${hoverOnBranding && !isOpen && 'text-transparent transition-colors duration-100'}`} nameHidden={!isOpen} />

                    {isOpen && (
                        <div
                            className="cursor-pointer"
                            onClick={() => { setIsOpen(false); setHoverOnBranding(false); }}
                        >
                            <ArrowSVG rotate={90} />
                        </div>
                    )}

                    {!isOpen && hoverOnBranding && (
                        <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-transparent "
                            onClick={() => setIsOpen(true)}
                        >
                            <ArrowSVG rotate={-90} />
                        </div>
                    )}

                </div>

                <ul>
                    <li key={'home'} className="relative group">
                        <Link
                            href={'/'}
                            className={`flex items-center gap-2 px-2 py-2 ${isOpen ? 'justify-start' : 'justify-center'}`}
                        >
                            <span onMouseEnter={() => setHoverOnLink('Inicio')}
                                onMouseLeave={() => setHoverOnLink('')}
                            >🏠</span>
                            {isOpen && <span>Inicio</span>}
                            {!isOpen && hoverOnLink === 'Inicio' && (
                                <span className="absolute left-[65px] top-1/2 -translate-y-1/2 bg-[var(--color-background)] text-md px-5 py-3 rounded-xl rounded-l-none shadow-lg w-max whitespace-nowrap z-20">
                                    Inicio
                                </span>
                            )}

                        </Link>
                    </li>
                </ul>


                <nav className={`${isOpen ? 'space-y-10' : 'space-y-0'}`}>
                    {navbarTopics.map((topic, index) => (
                        <div key={index} className="space-y-2">
                            {isOpen && (
                                <h4 className="text-sm font-semibold text-[var(--color-foreground)]/50 uppercase px-2">{topic.name}</h4>
                            )}
                            <ul className="space-y-1">
                                {topic.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="relative group">
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-2 px-2 py-2 ${isOpen ? 'justify-start' : 'justify-center'}`}
                                        >
                                            <span onMouseEnter={() => setHoverOnLink(link.name)}
                                                onMouseLeave={() => setHoverOnLink('')}
                                            >{link.icon}</span>
                                            {isOpen && <span>{link.name}</span>}
                                            {!isOpen && hoverOnLink === link.name && (
                                                <span className="absolute left-[65px] top-1/2 -translate-y-1/2 bg-[var(--color-background)] text-md px-5 py-3 rounded-xl rounded-l-none shadow-lg w-max whitespace-nowrap z-20">
                                                    {link.name}
                                                </span>
                                            )}

                                        </Link>

                                        {/* Tooltip cuando está cerrado
                                        {!isOpen && (
                                            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-5 py-3 bg-[var(--color-background)]  text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                                {link.name}
                                            </span>
                                        )} */}
                                    </li>
                                ))}
                            </ul>


                            {/* Separador visual si el menú está cerrado */}
                            {!isOpen && index < navbarTopics.length - 1 && (
                                <div className="border-t border-[var(--color-foreground)]/50 my-3" />
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            <div className={`flex items-center gap-2 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                {isOpen ? (
                    // Cuando el menú está abierto, muestra "Claro"/"Oscuro"
                    <button
                        onClick={() => setIsDarkMode(prev => !prev)}
                        className="flex items-center pt-2 cursor-pointer w-full"
                    >
                        {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>
                ) : (
                    // Cuando el menú está cerrado, muestra solo el icono (oculto en pantallas < xl)
                    <button
                        onClick={() => setIsDarkMode(prev => !prev)}
                        className="p-2 border-2 border-[var(--color-foreground)]/50 bg-[var(--color-foreground)] rounded-full cursor-pointer hidden xl:flex self-center"
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                )}
            </div>


        </div>
    );
}