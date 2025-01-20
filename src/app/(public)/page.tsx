'use client'
import { Button, Input, Select } from 'antd';
import Header from './_components/header';
import Hero from './_components/Hero';
import { useState, useEffect } from 'react';
import Authentication from './_components/authentication';

export default function Home() {
  const [showAuthentication, setShowAuthentication] = useState(false)
  return (
    <div className="flex flex-col gap-5 bg-primary min-h-screen">
      <Header
        setShowAuthentication={setShowAuthentication} />
      <Hero />

      {showAuthentication && (<Authentication
        showAuthentication={showAuthentication}
        setShowAuthentication={setShowAuthentication}
      />)}
    </div>
  );
}
