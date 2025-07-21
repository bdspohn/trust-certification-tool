import React from 'react';
import Head from 'next/head';
import TrusteeDashboard from '../components/TrusteeDashboard';

export default function TrusteeDashboardPage() {
  return (
    <>
      <Head>
        <title>Trustee Dashboard - Trusto</title>
        <meta name="description" content="Manage your trusts, track institution connections, and receive real-time notifications" />
      </Head>
      
      <TrusteeDashboard />
    </>
  );
}

// This page would typically be protected by authentication
// export async function getServerSideProps(context) {
//   // Check if user is authenticated
//   // Redirect to login if not authenticated
//   // Fetch user's trust data if authenticated
//   return { props: {} };
// }