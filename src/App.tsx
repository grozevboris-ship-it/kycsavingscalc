import { useState, useMemo } from 'react';
import { Info, DollarSign, Clock, ArrowRight, ShieldCheck, ChevronLeft, Printer, FileText } from 'lucide-react';

// Simple UI Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);
const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500 mt-1">{children}</p>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium block mb-2">{children}</label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="w-full px-3 py-2 border rounded-md" {...props} />
);
const Slider = ({ value, onValueChange, min, max, step }: { value: number[]; onValueChange: (v: number[]) => void; min: number; max: number; step: number }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={(e) => onValueChange([Number(e.target.value)])}
    className="w-full"
  />
);
const Checkbox = ({ id, checked, onCheckedChange }: { id: string; checked: boolean; onCheckedChange: (c: boolean) => void }) => (
  <input type="checkbox" id={id} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
);
const Button = ({ children, onClick, className = '', variant = 'default' }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium ${
      variant === 'outline' ? 'border bg-white' : 'bg-blue-600 text-white'
    } ${className}`}
  >
    {children}
  </button>
);

export default function App() {
  const [view, setView] = useState('calculator');
  const [userData, setUserData] = useState({ name: '', company: '' });
  const [teamSize, setTeamSize] = useState(8);
  const [annualChanges, setAnnualChanges] = useState(100);
  const [annualAdvisoryCases, setAnnualAdvisoryCases] = useState(60);
  const [annualAudits, setAnnualAudits] = useState(4);
  const [selectedProducts, setSelectedProducts] = useState({ p1: true, p2: true, p3: true });

  const HOURLY_RATE = 60;
  const BASE_TEAM = 8;
  const LEGAL_HOURLY = 500;

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

  if (view === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <FileText className="text-white w-6 h-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Personalize Your Case</CardTitle>
            <CardDescription>We'll address the ROI analysis to your leadership team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g., Jane Doe"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">Organization</Label>
              <Input
                id="company"
                placeholder="e.g., Acme Corp"
                value={userData.company}
                onChange={(e) => setUserData({ ...userData, company: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setView('calculator')} className="flex-1">
              Back
            </Button>
            <Button onClick={() => setView('report')} className="flex-1">
              View Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (view === 'report') {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">ROI Analysis Report</h1>
              <p className="text-gray-600 mt-2">Prepared for {userData.name || 'Your Team'} at {userData.company || 'Your Organization'}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setView('calculator')}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" /> Print
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Annual Savings</p>
                <p className="text-2xl font-bold">${results.dollars.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm text-gray-600">Hours Saved</p>
                <p className="text-2xl font-bold">{results.hours.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50">
              <CardContent className="p-6">
                <ShieldCheck className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-600">Risk Avoidance</p>
                <p className="text-2xl font-bold">${results.risk.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Team Size:</strong> {teamSize} FTEs</p>
              <p><strong>Annual Regulatory Changes:</strong> {annualChanges}</p>
              <p><strong>Advisory Cases:</strong> {annualAdvisoryCases}</p>
              <p><strong>Audits per Year:</strong> {annualAudits}</p>
              <p><strong>Equivalent FTE Savings:</strong> {results.fte} FTEs</p>
              <p><strong>Communication Efficiency:</strong> {results.commsPct}% reduction in email volume</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Avelin.ai ROI Calculator</h1>
          <p className="text-xl text-gray-600">Quantify the value of automated compliance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" /> Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Team Size: {teamSize} FTEs</Label>
                  <Slider value={[teamSize]} onValueChange={(v) => setTeamSize(v[0])} min={1} max={50} step={1} />
                </div>
                <div>
                  <Label>Annual Regulatory Changes: {annualChanges}</Label>
                  <Slider value={[annualChanges]} onValueChange={(v) => setAnnualChanges(v[0])} min={0} max={500} step={10} />
                </div>
                <div>
                  <Label>Annual Advisory Cases: {annualAdvisoryCases}</Label>
                  <Slider value={[annualAdvisoryCases]} onValueChange={(v) => setAnnualAdvisoryCases(v[0])} min={0} max={200} step={5} />
                </div>
                <div>
                  <Label>Annual Audits: {annualAudits}</Label>
                  <Slider value={[annualAudits]} onValueChange={(v) => setAnnualAudits(v[0])} min={0} max={20} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="p1"
                    checked={selectedProducts.p1}
                    onCheckedChange={(c) => setSelectedProducts({ ...selectedProducts, p1: c })}
                  />
                  <Label htmlFor="p1">Policy Manager - Automated policy distribution and attestation</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="p2"
                    checked={selectedProducts.p2}
                    onCheckedChange={(c) => setSelectedProducts({ ...selectedProducts, p2: c })}
                  />
                  <Label htmlFor="p2">Regulatory Change Management - Automated mapping and impact analysis</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="p3"
                    checked={selectedProducts.p3}
                    onCheckedChange={(c) => setSelectedProducts({ ...selectedProducts, p3: c })}
                  />
                  <Label htmlFor="p3">Audit Management - Streamlined evidence collection and reporting</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Total Annual Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${(results.dollars + results.risk).toLocaleString()}</p>
                <p className="text-blue-200 mt-2">Combined savings and risk avoidance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Direct Savings</span>
                  <span className="font-semibold">${results.dollars.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Avoidance</span>
                  <span className="font-semibold">${results.risk.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Saved</span>
                  <span className="font-semibold">{results.hours.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FTE Equivalent</span>
                  <span className="font-semibold">{results.fte}</span>
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setView('form')} className="w-full">
              Generate Business Case <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
