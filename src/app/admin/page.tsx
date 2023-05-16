"use client"
import Header from '@/components/Header'
import React from 'react'

const route: { name: string; path: string } = {
    name: 'Admin',      
}

const AdminPage = () => {
  return (
    <>
        <header>opa</header>
        <main>
            <section>
                <select name="SelectEnterprises" id="SelectEnterprises">
                    <option value="">Seleccione empresa</option>
                    {
                        [1,2,3,4,5].map(item => <option key={item} value={item}>{item}</option>)
                    }
                </select>
            </section>
            <section>
                <h2>
                    Departamentos
                </h2>
                <button>
                    + Criar
                </button>
            </section>
            <section></section>
            <section></section>
            <section></section>
        </main>
    </>
  )
}

export default AdminPage