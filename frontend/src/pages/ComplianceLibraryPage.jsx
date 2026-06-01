/**
 * ComplianceLibraryPage.jsx
 * LP-SYS-LIBRARY — Complete Operating Standards Library
 * Premium Redesign — 13-component assembly
 */

import { useState, useCallback } from 'react';
import AnnouncementBar from '../components/home/AnnouncementBar';
import SiteHeader from '../components/home/SiteHeader';
import SiteFooter from '../components/home/SiteFooter';
import LibraryPageHero from '../components/compliance-library/LibraryPageHero';
import PathSelectorGrid from '../components/compliance-library/PathSelectorGrid';
import FeaturedProductCard from '../components/compliance-library/FeaturedProductCard';
import StandardGateCard from '../components/compliance-library/StandardGateCard';
import StarterBundleCard from '../components/compliance-library/StarterBundleCard';
import AuditWindowCalculator from '../components/compliance-library/AuditWindowCalculator';
import LibraryMetricsStrip from '../components/compliance-library/LibraryMetricsStrip';
import PrePurchaseFAQ from '../components/compliance-library/PrePurchaseFAQ';
import LeadCaptureRiskMap from '../components/compliance-library/LeadCaptureRiskMap';
import DomainComponentGrid from '../components/compliance-library/DomainComponentGrid';
import ComparisonTable from '../components/compliance-library/ComparisonTable';
import VinceQuoteSection from '../components/compliance-library/VinceQuoteSection';
import LibraryFooterCTA from '../components/compliance-library/LibraryFooterCTA';

const API = process.env.REACT_APP_BACKEND_URL;

function useBuy() {
  const [states, setStates] = useState({});
  const [errors, setErrors]  = useState({});
  const buy = useCallback(async (sku) => {
    setStates(s => ({ ...s, [sku]: 'loading' }));
    setErrors(e => ({ ...e, [sku]: null }));
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_sku: sku, origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error();
    } catch {
      setStates(s => ({ ...s, [sku]: 'idle' }));
      setErrors(e => ({ ...e, [sku]: 'Could not start checkout. Please try again.' }));
    }
  }, []);
  return { states, errors, buy };
}

export default function ComplianceLibraryPage() {
  const { buy, states, errors } = useBuy();

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <AnnouncementBar />
      <SiteHeader activePath="/compliance-library" />

      <LibraryPageHero />
      <PathSelectorGrid
        onBuyBundle={() => buy('LP-BDL-001')}
        bundleLoading={states['LP-BDL-001']}
      />
      <FeaturedProductCard
        onBuy={() => buy('LP-BDL-001')}
        loading={states['LP-BDL-001']}
        error={errors['LP-BDL-001']}
      />
      <StandardGateCard />
      <AuditWindowCalculator />
      <LibraryMetricsStrip />
      <PrePurchaseFAQ />
      <LeadCaptureRiskMap />
      <DomainComponentGrid
        onBuy={buy}
        states={states}
        errors={errors}
      />
      <ComparisonTable
        onBuyBundle={() => buy('LP-BDL-001')}
        bundleLoading={states['LP-BDL-001']}
      />
      <StarterBundleCard
        onBuy={() => buy('LP-RES-006')}
        loading={states['LP-RES-006']}
        error={errors['LP-RES-006']}
      />
      <VinceQuoteSection />
      <LibraryFooterCTA />

      <SiteFooter />
    </div>
  );
}
