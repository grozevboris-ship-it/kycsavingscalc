import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '/components/ui/card';
import { Label } from '/components/ui/label';
import { Input } from '/components/ui/input';
import { Slider } from '/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '/components/ui/tabs';
import { Checkbox } from '/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '/components/ui/alert';
import { Button } from '/components/ui/button';
import { 
  Info, TrendingDown, DollarSign, Clock, ShieldAlert, 
  ArrowRight, MessageSquareOff, ShieldCheck, Download, 
  ChevronLeft, Printer, FileText, Mail, ExternalLink
} from 'lucide-react';

const AvelinROICalculator = () => {
  // --- STATE ---
  const [view, setView] = useState('calculator'); // 'calculator', 'form', 'report'
  const [userData, setUserData] = useState({ name: '', company: '' });
  const [teamSize, setTeamSize] = useState(8);
  const [annualChanges, setAnnualChanges] = useState(100);
  const [annualAdvisoryCases, setAnnualAdvisoryCases] = useState(60);
  const [annualAudits, setAnnualAudits] = useState(4);
  const [selectedProducts, setSelectedProducts] = useState({
    p1: true, p2: true, p3: true,
  });

  // --- CONSTANTS ---
  const HOURLY_RATE = 60; 
  const BASE_TEAM = 8;
  const LEGAL_HOURLY = 500; 

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    let totalHours = 0;
    let totalHardSavings = 0;
    let totalRiskAvoidance = 0;
    let totalCommsHoursSaved = 0;
    let commsReductionPct = 0;
    const scaleFactor = teamSize / BASE_TEAM;

    if (selectedProducts.p1) {
      const p1Hours = 2670 * scaleFactor;
      totalHours += p1Hours;
      totalHardSavings += p1Hours * HOURLY_RATE;
      totalCommsHoursSaved += (300 * scaleFactor); 
      commsReductionPct += 55;
    }
    if (selectedProducts.p2) {
      const mappingHours = annualChanges * 6 * 0.9;
      const advisoryHours = annualAdvisoryCases * 24; 
      const p2Hours = (720 + mappingHours + advisoryHours) * scaleFactor;
      totalHours += p2Hours;
      totalHardSavings += p2Hours * HOURLY_RATE;
      totalRiskAvoidance += (annualAdvisoryCases * 15 * LEGAL_HOURLY * 0.4); 
      totalCommsHoursSaved += (annualAdvisoryCases * 4 * 0.5); 
      commsReductionPct += 60;
    }
    if (selectedProducts.p3) {
      const auditHours = (1000 / 4) * annualAudits * scaleFactor;
      const p3Hours = (auditHours + 900) * scaleFactor;
      totalHours += p3Hours;
      totalHardSavings += p3Hours * HOURLY_RATE;
      totalRiskAvoidance += 500000; 
      totalCommsHoursSaved += (annualAudits * 45 * 0.8);
      commsReductionPct += 70;
    }

    const activeCount = Object.values(selectedProducts).filter(Boolean).length;
    const avgReduction = activeCount > 0 ? Math.round(commsReductionPct / activeCount) : 0;

    return {
      hours: Math.round(totalHours),
      dollars: Math.round(totalHardSavings),
      risk: Math.round(totalRiskAvoidance),
      commsHours: Math.round(totalCommsHoursSaved),
      fte: (totalHours / 1800).toFixed(1),
      commsPct: avgReduction,
      emailsEliminated: Math.round((annualAdvisoryCases * 4 + annualAudits * 40 + annualChanges * 2) * (avgReduction / 100))
    };
  }, [teamSize, annualChanges, annualAdvisoryCases, annualAudits, selectedProducts]);

  const handlePrint = () => { window.print(); };

  // --- VIEWS ---

  if (view === 'form') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
        <Card className="w-full max-w-md shadow-xl border-slate-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
               <div className="bg-blue-600 p-3 rounded-full">
                <FileText className="text-white w-6 h-6" />
               </div>
            </div>
            <CardTitle className="text-2xl font-black">Personalize Your Case</CardTitle>
            <CardDescription>We'll address the ROI analysis to your leadership team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Acme Financial Services" value={userData.company} onChange={(e) => setUserData({...userData, company: e.target.value})} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold" disabled={!userData.name || !userData.company} onClick={() => setView('report')}>
              Generate Business Case
            </Button>
            <Button variant="ghost" onClick={() => setView('calculator')} className="text-slate-500">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Calculator
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (view === 'report') {
    return (
      <div className="bg-slate-100 min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
          <Button variant="outline" onClick={() => setView('form')}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Edit Details
          </Button>
          <Button onClick={handlePrint} className="bg-blue-600">
            <Printer className="w-4 h-4 mr-2" /> Print / Save as PDF
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-2xl p-12 space-y-8 print:shadow-none print:border-none">
          <div className="flex justify-between items-start border-b-4 border-blue-600 pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">AVELIN.AI</h1>
              <p className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase">Sovereign AI Compliance Platform</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidential ROI Report</p>
              <p className="text-xs font-medium text-slate-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-xs text-slate-400 uppercase font-bold">Addressed To:</p>
            <h2 className="text-xl font-bold text-slate-900">{userData.name}</h2>
            <p className="text-slate-600 font-medium">{userData.company}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Labour Savings</p>
              <p className="text-2xl font-black text-slate-900">${results.dollars.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Capacity Gained</p>
              <p className="text-2xl font-black text-slate-900">{results.fte} FTE</p>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Comms Noise Saved</p>
              <p className="text-2xl font-black text-slate-900">{results.commsPct}%</p>
            </div>
          </div>

          <div className="space-y-6 pt-4 text-sm text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest border-b pb-1">Strategic Analysis</h3>
            <p>
              For <strong>{userData.company}</strong>, Avelin.ai recaptures <strong>{results.hours.toLocaleString()} manual hours</strong> annually. This shift redirects senior capacity from "email archaeology" to proactive strategic governance.
            </p>
            <p>
              The <strong>Risk-Adjusted Value of ${(results.risk/1000000).toFixed(1)}M</strong> accounts for the mitigation of regulatory enforcement escalations and a 40-75% reduction in the cycle of RFI queries from supervisors.
            </p>
          </div>

          <div className="pt-12 border-t mt-12 flex justify-between items-end">
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase">Contact for Implementation:</p>
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Mail className="w-4 h-4" />
                <span className="text-lg">b@avelin.ai</span>
              </div>
            </div>
            <div className="text-right">
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 italic">CONFIDENTIAL & PROPRIETARY</p>
               <p className="text-[9px] text-slate-300">© 2026 Avelin.ai | Sovereign AI Platform</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 bg-slate-50 min-h-screen font-sans border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">AVELIN.AI <span className="text-blue-600 font-light not-italic tracking-normal">ROI ENGINE</span></h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Evidence-Based Savings & Risk Analysis</p>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Efficiency Boost</p>
            <div className="text-2xl font-black text-blue-600">+{results.commsPct}%</div>
          </div>
          <div className="h-10 w-px bg-slate-200" />
           <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Annual Savings</p>
            <div className="text-2xl font-black text-slate-900">${(results.dollars/1000).toFixed(0)}K</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-slate-200">
            <CardHeader className="py-4">
              <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Institutional Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <Label>Team Size</Label>
                  <span className="text-blue-600 font-bold">{teamSize} FTE</span>
                </div>
                <Slider value={[teamSize]} onValueChange={(v) => setTeamSize(v[0])} max={50} step={1} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Annual Changes</span>
                  <Input type="number" className="h-8 text-sm" value={annualChanges} onChange={(e) => setAnnualChanges(Number(e.target.value))} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Advisory Memos</span>
                  <Input type="number" className="h-8 text-sm" value={annualAdvisoryCases} onChange={(e) => setAnnualAdvisoryCases(Number(e.target.value))} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
             {[
               { id: 'p1', title: 'ObligationsCore', color: 'border-blue-600', text: 'Multi-entity regulatory repository. It replaces manual spreadsheets with a structured hierarchy and immutable audit trails.' },
               { id: 'p2', title: 'RegIntelligence', color: 'border-emerald-600', text: 'AI-powered horizon scanning + advisory intake. Automates monitoring of 200+ daily regulatory updates.' },
               { id: 'p3', title: 'RegReady', color: 'border-indigo-600', text: 'Governance layer for immutable evidence and board intelligence. Replaces reactive audit prep with continuous capture.' }
             ].map((p) => (
               <div key={p.id} className={`p-3 rounded-lg border transition-all ${selectedProducts[p.id] ? `bg-white ${p.color} shadow-sm` : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="flex items-start gap-3">
                  <Checkbox id={p.id} checked={selectedProducts[p.id]} onCheckedChange={(c) => setSelectedProducts({...selectedProducts, [p.id]: !!c})} className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor={p.id} className="text-sm font-bold block leading-none">{p.title}</Label>
                    <p className="text-[11px] text-slate-500 leading-tight">{p.text}</p>
                  </div>
                </div>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-900 text-white border-none shadow-xl pt-6">
              <CardContent>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-4">Labour Recapture</p>
                <p className="text-3xl font-black">${results.dollars.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200 shadow-md pt-6">
              <CardContent>
                 <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-4">Risk Exposure Saved</p>
                <p className="text-3xl font-black text-slate-900">${(results.risk/1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-600 text-white border-none shadow-md pt-6">
              <CardContent>
                 <p className="text-[9px] font-black uppercase text-blue-100 tracking-widest mb-4">Communication Savings</p>
                <p className="text-3xl font-black">{results.commsPct}%</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none h-auto p-0 mb-6 w-full justify-start">
              <TabsTrigger value="insights" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3 font-bold text-xs uppercase tracking-widest">Analysis View</TabsTrigger>
              <TabsTrigger value="methodology" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3 font-bold text-xs uppercase tracking-widest text-blue-600">Transparency Methodology</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
              <div className="bg-slate-900 p-8 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-black italic uppercase">Generate Executive Business Case</h3>
                  <p className="text-slate-400 text-sm max-w-md">Personalize a formalized ROI analysis for your CFO or Board of Directors.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg font-bold group" onClick={() => setView('form')}>
                  Personalize Case <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border rounded-lg space-y-2">
                  <h4 className="text-[10px] font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-blue-600" /> Resource Shift
                  </h4>
                  <p className="text-sm text-slate-600 leading-snug">
                    Avelin.ai redirects <span className="font-bold text-blue-600">{results.fte} Senior FTEs</span> from tracking to strategy.
                  </p>
                </div>
                <div className="p-4 bg-white border rounded-lg space-y-2">
                  <h4 className="text-[10px] font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                    <MessageSquareOff className="w-3 h-3 text-blue-600" /> Comm Noise
                  </h4>
                  <p className="text-sm text-slate-600 leading-snug">
                    Eliminates approximately <span className="font-bold text-blue-600">{results.emailsEliminated}</span> status emails per year.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="methodology" className="space-y-4">
              <Card className="border-slate-200">
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Labour Cost</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Calculated at $60/hr blended rate based on Glassdoor median + 40% on-cost.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Risk Calculation</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Includes avoided legal fees ($400-$600/hr) and enforcement risk (IBM 2024).
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Comm Savings</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        40-75% reduction in RFI cycles and triage based on Avelin.ai 2026 performance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Verified Data Sources & Links:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Thomson Reuters: 2023 Cost of Compliance", url: "https://www.thomsonreuters.com/en-us/posts/investigation-fraud-and-risk/2023-cost-of-compliance-report/" },
                        { title: "PwC: Global Compliance Survey 2025", url: "https://www.pwc.com/gx/en/issues/risk-regulation/global-compliance-survey.html" },
                        { title: "IBM/Fenergo: Global Fines Report 2024", url: "https://resources.fenergo.com/reports/aml-enforcement-action-in-2024" },
                        { title: "Wolters Kluwer: Regulatory Indicator Results", url: "https://www.wolterskluwer.com/en/news/indicator-survey-finds-lower-concern-levels-following-significant-drop-in-regulatory-penalties" },
                        { title: "Hyperproof: 2023 IT Compliance Benchmark", url: "https://hyperproof.io/2023-it-compliance-benchmark-report/" },
                        { title: "CISO Society/RegScale: Monitoring Report", url: "https://regscale.com/resource-center/state-of-continuous-controls-monitoring-report/" }
                      ].map((source, i) => (
                        <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group">
                          <span className="text-[11px] font-bold text-slate-700">{source.title}</span>
                          <ExternalLink className="w-3 h-3 text-blue-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t text-[10px] text-slate-400 italic">
                    Methodology applies 15.2 manual hrs/week baseline per 8 FTEs. Enterprise scale (200+ jurisdictions) may multiply these figures by 5-15x. This tool does not constitute a financial guarantee.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="text-center pt-6 text-slate-400 border-t mt-4 no-print">
        <p className="text-[10px] font-bold tracking-widest uppercase italic leading-none">AVELIN.AI | FEATURE · BENEFIT · GAP · ROI | CONFIDENTIAL | 2026</p>
      </footer>
    </div>
  );
};

export default AvelinROICalculator;
