import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Maximize, Minimize } from 'lucide-react';

const SatellitePresentation = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [animationState, setAnimationState] = useState<{started?: boolean}>({});

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'f') {
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    useEffect(() => {
        // Reset animations when slide changes
        setAnimationState({});

        // Start animations with delay
        const timer = setTimeout(() => {
            setAnimationState({ started: true });
        }, 100);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Slide content
    const slides = [
        // Slide 1: Title
        {
            id: 'title',
            content: (
                <div className="flex flex-col justify-center items-center h-full text-center bg-gradient-to-b from-gray-100 to-gray-50"> {/* Subtle background gradient */}
                    <h1 className={`text-5xl font-bold mb-6 text-blue-700 transition-all duration-1000 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="animate-bounce inline-block mr-2">🚀</span>Comunicação via Satélite
                    </h1>
                    <h2 className={`text-3xl font-semibold mb-12 text-gray-700 transition-all duration-1000 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="inline-block mr-2">✨</span>Fundamentos, Tecnologias e Aplicações
                    </h2>
                    <div className={`mt-12 transition-all duration-1000 delay-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 mx-auto mb-4 flex items-center justify-center relative shadow-lg">
                            {/* Earth - More detailed */}
                            <div className="w-24 h-24 rounded-full bg-blue-300 overflow-hidden relative">
                                {/* Simplified continents (you can use an actual small SVG for better continents if needed) */}
                                <div className="absolute bg-green-500 rounded-full top-1/4 left-1/4 w-1/2 h-1/2" style={{ clipPath: 'ellipse(50% 30% at 50% 50%)' }}></div>
                                {/* Cloud effect - using radial gradient */}
                                <div className="absolute inset-0 bg-radial-gradient from-transparent to-white opacity-40"></div>
                            </div>

                            {/* Satellite - More detailed orbiting satellite */}
                            <div className={`absolute left-1/2 top-1/2 w-full h-full ${animationState.started ? 'animate-orbit' : ''}`}>
                                <div className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                    <div className="relative w-6 h-6">
                                        {/* Satellite body */}
                                        <div className="absolute w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm shadow-md top-0 left-1"></div>
                                        {/* Solar panels - simplified as wings */}
                                        <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-100 border border-blue-200 transform -translate-y-1/2 rotate-45"></div>
                                        <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-100 border border-blue-200 transform -translate-y-1/2 -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 2: Introdução
        {
            id: 'intro',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-pulse inline-block mr-2">📡</span>1. Introdução à Comunicação por Satélite
                    </h2>

                    <div className="flex h-5/6">
                        <div className="w-1/2 pr-4">
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Definição</h3>
                                <p className="text-gray-700">
                                    Método de telecomunicação que utiliza satélites artificiais como repetidores para estabelecer enlaces entre pontos distantes na Terra, transmitindo sinais de uplink (Terra-satélite) e downlink (satélite-Terra).
                                </p>
                            </div>

                            <div className={`mb-6 transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Breve histórico</h3>
                                <ul className="list-disc pl-5 text-gray-700">
                                    <li>1957: Sputnik 1 (primeiro satélite artificial)</li>
                                    <li>1962: Telstar 1 (primeiro satélite comercial)</li>
                                    <li>1963: Syncom 2 (primeiro satélite geoestacionário)</li>
                                    <li>1965: Intelsat I (Early Bird)</li>
                                    <li>2010-presente: Megaconstelações (Starlink, OneWeb)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className={`mb-6 transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Importância</h3>
                                <ul className="list-disc pl-5 text-gray-700">
                                    <li>Cobertura global (áreas remotas, oceanos)</li>
                                    <li>Implementação rápida de infraestrutura</li>
                                    <li>Redundância em desastres naturais</li>
                                    <li>Eficiência para broadcasting</li>
                                    <li>Redução da divisão digital</li>
                                    <li>Aplicações críticas (aviação, marítimas, militares)</li>
                                </ul>
                            </div>

                            <div className={`mt-8 transition-all duration-1000 delay-1000 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <p className="text-blue-800 italic">
                                        "Os satélites representam uma das principais esperanças para conectar os bilhões de pessoas que ainda não têm acesso à internet."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 3: Fundamentos de Satélites
        {
            id: 'fundamentals',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-pulse inline-block mr-2">🔧</span>2. Fundamentos de Satélites
                    </h2>

                    <div className="flex h-5/6">
                        <div className="w-1/2 pr-4">
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Funcionamento Básico</h3>
                                <p className="text-gray-700 mb-2">
                                    Um satélite de comunicação é essencialmente uma estação repetidora no espaço que:
                                </p>
                                <ul className="list-disc pl-5 text-gray-700">
                                    <li>Recebe sinais da Terra (uplink)</li>
                                    <li>Amplifica os sinais recebidos</li>
                                    <li>Altera a frequência para evitar interferências</li>
                                    <li>Retransmite os sinais de volta à Terra (downlink)</li>
                                </ul>
                            </div>

                            <div className={`transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Princípios Físicos</h3>
                                <ul className="list-disc pl-5 text-gray-700">
                                    <li>Mecânica orbital (Leis de Kepler)</li>
                                    <li>Eletromagnetismo (ondas em diferentes frequências)</li>
                                    <li>Eletrônica (processamento e amplificação de sinais)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className={`mb-6 transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Tipos de Órbitas</h3>
                                <div className="relative h-64 mb-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                                    {/* Representação das órbitas */}
                                    <div className="absolute w-full h-full">
                                        {/* Terra */}
                                        <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                                        {/* GEO */}
                                        <div className={`absolute left-1/2 top-1/2 w-56 h-56 rounded-full border-2 border-red-400 transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-800`}>
                                            <div className="absolute right-0 top-1/2 w-4 h-4 bg-red-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                        </div>

                                        {/* MEO */}
                                        <div className={`absolute left-1/2 top-1/2 w-40 h-40 rounded-full border-2 border-yellow-400 transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-1000`}>
                                            <div className="absolute right-0 top-1/3 w-4 h-4 bg-yellow-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                        </div>

                                        {/* LEO */}
                                        <div className={`absolute left-1/2 top-1/2 w-24 h-24 rounded-full border-2 border-green-400 transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-1200`}>
                                            <div className="absolute right-0 top-0 w-4 h-4 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm text-center">
                                    <div className="bg-red-100 p-1 rounded">
                                        <p className="font-bold text-red-600">GEO</p>
                                        <p>35.786 km</p>
                                    </div>
                                    <div className="bg-yellow-100 p-1 rounded">
                                        <p className="font-bold text-yellow-600">MEO</p>
                                        <p>2.000-35.786 km</p>
                                    </div>
                                    <div className="bg-green-100 p-1 rounded">
                                        <p className="font-bold text-green-600">LEO</p>
                                        <p>160-2.000 km</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 4: Componentes de um Satélite
        {
            id: 'components',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-bounce inline-block mr-2">🛰️</span>Componentes Principais de um Satélite
                    </h2>

                    <div className="flex h-5/6">
                        <div className="w-1/2 pr-4">
                            <div className={`transition-all duration-1000 delay-300 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="relative bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
                                    {/* Ilustração de um satélite com seus componentes - Melhorada */}
                                    <div className="relative w-64 h-64">
                                        {/* Corpo do satélite - Mais detalhado */}
                                        <div className="absolute left-1/2 top-1/2 w-24 h-36 bg-gray-300 border-2 border-gray-400 rounded-md transform -translate-x-1/2 -translate-y-1/2 shadow-md">
                                            <div className="absolute top-1/4 left-0 w-full h-1/4 bg-gray-400 rounded-t-md flex items-center justify-center text-gray-100 font-semibold text-sm">
                                                Equip.
                                            </div>
                                            <div className="absolute bottom-1/4 left-0 w-full h-1/4 bg-gray-400 rounded-b-md"></div>
                                        </div>

                                        {/* Painéis solares - Mais realistas */}
                                        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 transition-all duration-1000 delay-400 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                            <div className="relative h-12 w-40 bg-blue-300 border border-blue-400 rounded-md shadow-sm">
                                                <div className="absolute inset-1 bg-blue-200 rounded-sm grid grid-cols-4 gap-1 p-1">
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                </div>
                                            </div>
                                            <div className="relative h-12 w-40 bg-blue-300 border border-blue-400 rounded-md shadow-sm mt-1">
                                                <div className="absolute inset-1 bg-blue-200 rounded-sm grid grid-cols-4 gap-1 p-1">
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                    <div className="bg-blue-100 rounded-sm shadow-inner"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Antena - Refletor parabólico */}
                                        <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                            <div className="relative w-20 h-20 rounded-full bg-gray-400 border-4 border-gray-500 flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-full bg-gray-500 border border-gray-600"></div>
                                            </div>
                                        </div>

                                        {/* Propulsores - Mais distintos */}
                                        <div className={`absolute bottom-1/4 left-1/4 transform translate-x-4 transition-all duration-700 delay-1000 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                            <div className="w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
                                            <div className="w-1 h-3 bg-red-600 ml-1.5 mt-1"></div>
                                        </div>
                                        <div className={`absolute bottom-1/4 right-1/4 transform -translate-x-4 transition-all duration-700 delay-1100 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                            <div className="w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
                                            <div className="w-1 h-3 bg-red-600 ml-1.5 mt-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <h3 className="font-semibold text-blue-600 mb-1">Subsistema de Comunicações</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Transponders</li>
                                        <li>Antenas</li>
                                        <li>Filtros</li>
                                        <li>Amplificadores</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                    <h3 className="font-semibold text-green-600 mb-1">Subsistema de Energia</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Painéis solares</li>
                                        <li>Baterias</li>
                                        <li>Distribuição de energia</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                    <h3 className="font-semibold text-purple-600 mb-1">Controle de Atitude (AOCS)</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Sensores de orientação</li>
                                        <li>Atuadores</li>
                                        <li>Computador de bordo</li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <h3 className="font-semibold text-yellow-600 mb-1">Subsistema de Propulsão</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Propulsores químicos/elétricos</li>
                                        <li>Tanques de combustível</li>
                                    </ul>
                                </div>

                                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                    <h3 className="font-semibold text-red-600 mb-1">Subsistema Térmico</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Radiadores</li>
                                        <li>Isolantes térmicos</li>
                                        <li>Aquecedores</li>
                                    </ul>
                                </div>

                                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                                    <h3 className="font-semibold text-indigo-600 mb-1">Telemetria e Comando</h3>
                                    <ul className="text-sm list-disc pl-4 text-gray-700">
                                        <li>Transceptores</li>
                                        <li>Antenas omnidirecionais</li>
                                        <li>Sistema de monitoramento</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 5: Sistemas de Comunicação
        {
            id: 'systems',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-bounce inline-block mr-2">🌐</span>3. Sistemas de Comunicação via Satélite
                    </h2>

                    <div className="grid grid-cols-2 gap-6 h-5/6">
                        <div>
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Tipos de Sistemas</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-700 mb-1">Por tipo de serviço:</h4>
                                    <ul className="list-disc pl-5 text-gray-700 mb-3">
                                        <li>Serviço Fixo por Satélite (FSS)</li>
                                        <li>Serviço Móvel por Satélite (MSS)</li>
                                        <li>Serviço de Radiodifusão (BSS)</li>
                                        <li>Serviço de Exploração da Terra (EESS)</li>
                                    </ul>

                                    <h4 className="font-medium text-blue-700 mb-1">Por arquitetura de rede:</h4>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>Sistemas Ponto-a-Ponto</li>
                                        <li>Sistemas Ponto-Multiponto</li>
                                        <li>Sistemas Multiponto-Multiponto</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Arquitetura Básica</h3>
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                                    <h4 className="font-medium text-purple-700 mb-1">Segmentos:</h4>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Segmento Espacial:</span> Satélites em órbita</li>
                                        <li><span className="font-medium">Segmento Terrestre:</span> Estações de controle, teleportos e terminais</li>
                                        <li><span className="font-medium">Segmento de Usuário:</span> Dispositivos finais</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`mb-6 transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Redes de Satélites</h3>
                                <div className="bg-white rounded-lg shadow-lg p-4 h-64 relative overflow-hidden">
                                    {/* Ilustração de rede de satélites */}
                                    <div className="absolute w-full h-full left-0 top-0">
                                        {/* Terra */}
                                        <div className="absolute left-1/2 top-1/2 w-20 h-20 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                                        {/* Satélites em diferentes órbitas com animação */}
                                        <div className={`absolute left-1/2 top-1/2 w-56 h-56 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'animate-spin-slow' : ''}`} style={{animationDuration: '60s'}}>
                                            <div className="absolute left-0 top-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute right-0 top-1/2 w-4 h-4 bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute top-0 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                                        </div>

                                        <div className={`absolute left-1/2 top-1/2 w-40 h-40 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'animate-spin-slow' : ''}`} style={{animationDuration: '30s'}}>
                                            <div className="absolute left-0 top-1/2 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute right-0 top-1/2 w-4 h-4 bg-yellow-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                                        </div>

                                        <div className={`absolute left-1/2 top-1/2 w-28 h-28 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${animationState.started ? 'animate-spin-slow' : ''}`} style={{animationDuration: '15s'}}>
                                            <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute right-0 top-1/2 w-3 h-3 bg-green-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                                            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>

                                        {/* Linhas de transmissão */}
                                        <div className={`absolute w-full h-full transition-opacity duration-1000 delay-1000 ${animationState.started ? 'opacity-70' : 'opacity-0'}`}>
                                            <svg width="100%" height="100%" className="absolute left-0 top-0">
                                                <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" strokeDasharray="5,3" />
                                                <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" strokeDasharray="5,3" />
                                                <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" strokeDasharray="5,3" />
                                                <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" strokeDasharray="5,3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-900 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Tipos de Constelações</h3>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Sistemas GEO tradicionais:</span> Intelsat, SES, Eutelsat</li>
                                        <li><span className="font-medium">Sistemas MEO:</span> O3b Networks, GPS</li>
                                        <li><span className="font-medium">Megaconstelações LEO:</span> Starlink (SpaceX), OneWeb, Projeto Kuiper (Amazon)</li>
                                        <li><span className="font-medium">Sistemas híbridos:</span> Combinam diferentes órbitas</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 6: Tecnologias e Protocolos
        {
            id: 'technologies',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-pulse inline-block mr-2">⚙️</span>4. Tecnologias e Protocolos de Comunicação
                    </h2>

                    <div className="grid grid-cols-2 gap-6 h-5/6">
                        <div>
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Técnicas de Modulação</h3>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">PSK (Phase Shift Keying):</span> BPSK, QPSK, 8PSK, 16PSK</li>
                                        <li><span className="font-medium">QAM (Quadrature Amplitude Modulation):</span> 16QAM, 64QAM, 256QAM</li>
                                        <li><span className="font-medium">APSK (Amplitude and Phase Shift Keying):</span> 16APSK, 32APSK</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`mb-6 transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Correção de Erros</h3>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Códigos FEC (Forward Error Correction)</span></li>
                                        <li>Códigos de Reed-Solomon</li>
                                        <li>Códigos Convolucional</li>
                                        <li>Turbo Codes e LDPC</li>
                                        <li>Códigos BCH</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Técnicas de Acesso Múltiplo</h3>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">FDMA:</span> Divisão por frequência</li>
                                        <li><span className="font-medium">TDMA:</span> Divisão por tempo</li>
                                        <li><span className="font-medium">CDMA:</span> Divisão por código</li>
                                        <li><span className="font-medium">MF-TDMA:</span> Combinação de FDMA e TDMA</li>
                                        <li><span className="font-medium">SDMA:</span> Divisão espacial</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`mb-6 transition-all duration-700 delay-900 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Tecnologias Emergentes</h3>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Integração com 5G:</span> Satélites como parte da infraestrutura 5G</li>
                                        <li><span className="font-medium">Comunicações ópticas espaciais:</span> Enlaces laser de alta velocidade</li>
                                        <li><span className="font-medium">Processamento avançado a bordo:</span> Comutação digital e regeneração</li>
                                        <li><span className="font-medium">Antenas avançadas:</span> Phased arrays e formação de feixes</li>
                                        <li><span className="font-medium">Satélites definidos por software:</span> SDR e reconfiguração em órbita</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-1100 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-2 text-blue-500">Avanços em Eficiência</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                                    <div className="mb-3">
                                        <h4 className="font-medium text-blue-700 mb-1">Aumento da eficiência espectral:</h4>
                                        <ul className="list-disc pl-5 text-gray-700">
                                            <li>Modulações de alta ordem</li>
                                            <li>Códigos avançados de correção de erros</li>
                                            <li>Técnicas adaptativas (ACM)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-blue-700 mb-1">Evolução das velocidades:</h4>
                                        <ul className="list-disc pl-5 text-gray-700">
                                            <li>De kbps nos primeiros sistemas para 100+ Mbps</li>
                                            <li>Enlaces de alta capacidade atingindo Gbps</li>
                                            <li>HTS modernos com 100-1.000 Gbps</li>
                                            <li>Megaconstelações com terabits agregados</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 7: Aplicações e Mercados
        {
            id: 'applications',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-bounce inline-block mr-2">💼</span>5. Aplicações e Mercados da Comunicação via Satélite
                    </h2>

                    <div className="grid grid-cols-3 gap-4 h-5/6">
                        <div className={`transition-all duration-500 delay-300 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-blue-50 rounded-lg p-4 h-full border border-blue-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-blue-700 mb-3">Telecomunicações</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>Backhaul para redes móveis</li>
                                    <li>Extensão de conectividade rural</li>
                                    <li>Redundância de rede</li>
                                    <li>Comunicações de emergência</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 delay-400 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-red-50 rounded-lg p-4 h-full border border-red-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-red-700 mb-3">Mídia e Radiodifusão</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>Televisão por satélite (DTH)</li>
                                    <li>Distribuição de conteúdo</li>
                                    <li>Contribuição ao vivo de eventos</li>
                                    <li>Rádio por satélite</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 delay-500 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-green-50 rounded-lg p-4 h-full border border-green-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-green-700 mb-3">Defesa e Segurança</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>Comunicações militares táticas</li>
                                    <li>ISR (Intelligence, Surveillance)</li>
                                    <li>Comando e controle</li>
                                    <li>Communications On-The-Move</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 delay-600 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-yellow-50 rounded-lg p-4 h-full border border-yellow-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-yellow-700 mb-3">Marítimo</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>Internet e telefonia a bordo</li>
                                    <li>Operações de embarcações</li>
                                    <li>Navegação e segurança</li>
                                    <li>IoT marítima</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 delay-700 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-purple-50 rounded-lg p-4 h-full border border-purple-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-purple-700 mb-3">Aeronáutico</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>Wi-Fi a bordo para passageiros</li>
                                    <li>Comunicações de cockpit</li>
                                    <li>Telemetria e meteorologia</li>
                                    <li>Segurança e vigilância</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 delay-800 transform ${animationState.started ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                            <div className="bg-indigo-50 rounded-lg p-4 h-full border border-indigo-200">
                                <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full mb-3 mx-auto">
                                    <div className="w-6 h-6 bg-indigo-500 rounded"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-indigo-700 mb-3">Mercado Global</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm">
                                    <li>$20-25 bilhões anuais em receitas</li>
                                    <li>Principais segmentos: TV (40-45%), banda larga (20-25%), serviços móveis (15-20%)</li>
                                    <li>Principais players: Intelsat, SES, SpaceX, Viasat</li>
                                    <li>Crescimento para $30-40 bilhões até 2030</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 8: Inovações e Tendências
        {
            id: 'innovations',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-pulse inline-block mr-2">✨</span>6. Tendências e Inovações
                    </h2>

                    <div className="flex h-5/6">
                        <div className="w-1/2 pr-4">
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Miniaturização de Satélites</h3>
                                <div className="flex space-x-4 mb-4">
                                    <div className="bg-gray-100 rounded-lg p-3 text-center flex-grow">
                                        <div className="w-12 h-12 mx-auto bg-blue-200 rounded-lg mb-2 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-blue-400 rounded"></div>
                                        </div>
                                        <p className="font-medium text-gray-700">CubeSats</p>
                                        <p className="text-xs text-gray-500">10x10x10 cm</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-3 text-center flex-grow">
                                        <div className="w-10 h-10 mx-auto bg-green-200 rounded-lg mb-2 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-green-400 rounded"></div>
                                        </div>
                                        <p className="font-medium text-gray-700">NanoSats</p>
                                        <p className="text-xs text-gray-500">1-10 kg</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-3 text-center flex-grow">
                                        <div className="w-8 h-8 mx-auto bg-yellow-200 rounded-lg mb-2 flex items-center justify-center">
                                            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                                        </div>
                                        <p className="font-medium text-gray-700">PicoSats</p>
                                        <p className="text-xs text-gray-500">&lt;1 kg</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Novos Conceitos de Design</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Satélites reconfiguráveis:</span> Reprogramação em órbita</li>
                                        <li><span className="font-medium">Satélites flexíveis:</span> Realocação de capacidade conforme demanda</li>
                                        <li><span className="font-medium">Propulsão elétrica:</span> Maior vida útil e eficiência</li>
                                        <li><span className="font-medium">Arquiteturas distribuídas:</span> Funções divididas entre múltiplos satélites</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className={`mb-6 transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Tecnologias de Produção</h3>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Manufatura aditiva (impressão 3D):</span> Componentes complexos com menor peso</li>
                                        <li><span className="font-medium">Produção em massa:</span> Linhas de montagem para satélites padronizados</li>
                                        <li><span className="font-medium">Componentes comerciais (COTS):</span> Hardware não especializado reduzindo custos</li>
                                        <li><span className="font-medium">Eletrônica integrada:</span> Subsistemas mais compactos e funcionais</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-900 transform ${animationState.started ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Integração com Outras Tecnologias</h3>
                                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li><span className="font-medium">Computação de borda espacial:</span> Processamento de dados no satélite</li>
                                        <li><span className="font-medium">Inteligência artificial embarcada:</span> Tomada de decisão autônoma</li>
                                        <li><span className="font-medium">Segurança quântica:</span> Distribuição de chaves quânticas</li>
                                        <li><span className="font-medium">Integração 5G/6G:</span> Satélites como parte da infraestrutura de telecomunicações</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 9: Aspectos Regulatórios e Sustentabilidade
        {
            id: 'regulations',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-bounce inline-block mr-2">⚖️</span>7. Aspectos Regulatórios e Sustentabilidade
                    </h2>

                    <div className="flex h-5/6">
                        <div className="w-1/2 pr-4">
                            <div className={`mb-6 transition-all duration-700 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Desafios Regulatórios</h3>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h4 className="font-medium text-blue-700 mb-2">Governança Internacional</h4>
                                    <ul className="list-disc pl-5 text-gray-700 mb-3 text-sm">
                                        <li><span className="font-medium">UIT:</span> Coordenação de espectro e órbitas</li>
                                        <li><span className="font-medium">WRC:</span> Conferência Mundial de Radiocomunicações</li>
                                        <li><span className="font-medium">COPUOS:</span> Comitê da ONU para Uso Pacífico do Espaço</li>
                                    </ul>

                                    <h4 className="font-medium text-blue-700 mb-2">Desafios na Gestão do Espectro</h4>
                                    <ul className="list-disc pl-5 text-gray-700 mb-3 text-sm">
                                        <li>Escassez de espectro nas bandas preferidas</li>
                                        <li>Compartilhamento entre diferentes serviços</li>
                                        <li>Interferência entre sistemas</li>
                                        <li>Harmonização internacional</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-500 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Desafios na Gestão de Órbitas</h3>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                                        <li>Congestionamento orbital, especialmente em GEO</li>
                                        <li>Acesso equitativo para países em desenvolvimento</li>
                                        <li>Filing especulativo ("satélites de papel")</li>
                                        <li>Coordenação de megaconstelações</li>
                                        <li>Fragmentação regulatória entre países</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className={`mb-6 transition-all duration-700 delay-700 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">O Problema do Lixo Espacial</h3>
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                                    <p className="text-gray-700 mb-2 text-sm">Mais de 900.000 objetos maiores que 1 cm em órbita, com aproximadamente 30.000 objetos rastreados regularmente.</p>

                                    <h4 className="font-medium text-red-700 mb-1">Síndrome de Kessler</h4>
                                    <p className="text-gray-700 mb-3 text-sm">Risco de reação em cadeia de colisões tornando órbitas inutilizáveis por décadas ou séculos.</p>

                                    <h4 className="font-medium text-red-700 mb-1">Fontes principais</h4>
                                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                                        <li>Satélites inativos</li>
                                        <li>Estágios superiores de foguetes</li>
                                        <li>Fragmentos de colisões</li>
                                        <li>Testes ASAT (armas anti-satélite)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`transition-all duration-700 delay-900 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-xl font-semibold mb-3 text-blue-500">Medidas de Mitigação</h3>
                                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                                        <li><span className="font-medium">Diretrizes internacionais:</span> IADC e COPUOS</li>
                                        <li><span className="font-medium">Regra dos 25 anos:</span> Remoção de órbita dentro de 25 anos</li>
                                        <li><span className="font-medium">Design para desmontagem:</span> Desintegração na reentrada</li>
                                        <li><span className="font-medium">Passivação:</span> Remoção de energia residual</li>
                                        <li><span className="font-medium">Sistemas de remoção:</span> Velas de arrasto, propulsão dedicada</li>
                                        <li><span className="font-medium">Órbitas de descarte:</span> Movimentação para órbitas menos congestionadas</li>
                                    </ul>

                                    <div className="mt-3 bg-green-100 p-2 rounded-lg text-center">
                                        <p className="text-green-800 text-sm font-medium">Tecnologias para remoção ativa de detritos em desenvolvimento!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 10: Conclusão
        {
            id: 'conclusion',
            content: (
                <div className="h-full">
                    <h2 className={`text-3xl font-bold mb-6 text-blue-600 transition-all duration-700 ${animationState.started ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="animate-pulse inline-block mr-2">🏁</span>Conclusão
                    </h2>

                    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 transition-all duration-1000 delay-300 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-gray-700 mb-4">
                            A comunicação via satélite evoluiu notavelmente desde os primeiros experimentos da década de 1950 até as sofisticadas redes globais de hoje, transformando fundamentalmente como nos conectamos e possibilitando comunicações instantâneas em escala global.
                        </p>

                        <p className="text-gray-700 mb-4">
                            À medida que avançamos para uma era de megaconstelações de satélites em órbita baixa, comunicações ópticas de alta velocidade e integração com redes terrestres 5G/6G, o potencial para revolucionar ainda mais a conectividade global é imenso.
                        </p>

                        <p className="text-gray-700">
                            No entanto, este futuro traz desafios significativos de sustentabilidade do ambiente espacial, gestão equitativa de recursos orbitais e espectro, e impactos ambientais das atividades espaciais que demandam atenção urgente.
                        </p>
                    </div>

                    <div className={`bg-blue-600 text-white p-6 rounded-lg transition-all duration-1000 delay-800 transform ${animationState.started ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="font-medium text-lg mb-2">
                            A comunicação via satélite, que começou como uma maravilha tecnológica durante a Guerra Fria, agora se estabelece como:
                        </p>

                        <ul className="list-disc pl-6 space-y-1">
                            <li>Uma infraestrutura crítica para o século XXI</li>
                            <li>Componente essencial para um futuro mais conectado</li>
                            <li>Ferramenta para promover equidade digital global</li>
                            <li>Tecnologia que deve evoluir de forma sustentável</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gray-50 w-full h-full flex flex-col">
            {/* Cabeçalho e controles – ocultados em tela cheia */}
            { !isFullscreen && (
                <div className="bg-white border-b border-gray-200 p-2 sm:p-4 lg:p-6 flex justify-between items-center shadow-sm">
                    <div className="text-gray-700 text-xs sm:text-sm lg:text-base font-medium">
                        Slide {currentSlide + 1} de {slides.length}
                    </div>

                    <div className="flex items-center">
                        <div className="hidden sm:block mr-4 text-xs sm:text-sm lg:text-base text-blue-700 font-semibold">
                            Comunicação via Satélite | Redes sem fios
                        </div>
                        <div className="flex space-x-2 sm:space-x-4 lg:space-x-6">
                            <button
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                                className={`p-1 sm:p-2 lg:p-3 rounded-full transition-colors ${currentSlide === 0 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'}`}
                                aria-label="Slide anterior"
                            >
                                <ArrowLeft size={16} className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                            </button>

                            <button
                                onClick={nextSlide}
                                disabled={currentSlide === slides.length - 1}
                                className={`p-1 sm:p-2 lg:p-3 rounded-full transition-colors ${currentSlide === slides.length - 1 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'}`}
                                aria-label="Próximo slide"
                            >
                                <ArrowRight size={16} className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                            </button>

                            <button
                                onClick={toggleFullscreen}
                                className="p-1 sm:p-2 lg:p-3 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                                aria-label="Alternar tela cheia"
                            >
                                {isFullscreen ? <Minimize size={16} className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" /> : <Maximize size={16} className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Conteúdo dos Slides */}
            <div className="flex-grow p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden relative flex justify-center items-center">
                <div className="w-full max-w-6xl mx-auto h-full bg-white rounded-lg shadow-lg p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-hidden relative">
                    {slides[currentSlide].content}
                </div>
            </div>

            {/* Rodapé e navegação – ocultados em tela cheia */}
            { !isFullscreen && (
                <div className="bg-white border-t border-gray-200 py-2 sm:py-3 lg:py-4">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 lg:px-6">
                        {/* Navegação por pontos */}
                        <div className="flex space-x-1.5 sm:space-x-2 order-2 sm:order-1 mt-2 sm:mt-0 overflow-auto max-w-full py-1 sm:py-2">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 sm:h-3 lg:h-4 rounded-full transition-all flex-shrink-0 ${
                                        currentSlide === index
                                            ? 'w-6 sm:w-8 lg:w-10 bg-blue-600'
                                            : 'w-2 sm:sm:w-3 lg:w-4 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Informações do curso e equipe */}
                        <div className="text-xs sm:text-sm lg:text-base text-gray-600 order-1 sm:order-2 text-center sm:text-right">
                            <p className="font-medium">Redes sem fios</p>
                            <p>Docente: Eng. Felix Macueia | Engenharia informatica - 4 Ano</p>
                            <p>Grupo 2: Bruna Inácio Alexandra de Massada, Miriua Orlando Alberto, Joel De Ariovaldo D. F. Romao | Março, 2025</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SatellitePresentation;
