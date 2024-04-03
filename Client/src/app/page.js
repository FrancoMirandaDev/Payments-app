'use client'

import {navigate} from "../utils/redirect.js"

export default function Home() {
  return (
    <main>
      <div className="text-center h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Sitio web para registrar los pagos bancarios</h1>
        <p className="text-lg text-gray-700">Este sitio web permite registrar los pagos bancarios de los clientes</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => navigate('/user/login')}>Comenzar</button>
      </div>
    </main>
  );
}
