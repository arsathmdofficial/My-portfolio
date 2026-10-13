import React, { useState, useEffect } from 'react';
import { X, Navigation, Car, ShieldCheck, MapPin, CheckCircle2, User, Phone, IndianRupee, ArrowRight, RotateCcw } from 'lucide-react';

interface MentroMobilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'rider' | 'partner';
}

const CHENNAI_LOCATIONS = [
  { id: 'tambaram', name: 'Tambaram Sanatorium Station', zone: 'South Chennai' },
  { id: 'omr', name: 'TIDEL Park, OMR IT Corridor', zone: 'OMR' },
  { id: 'guindy', name: 'Guindy Industrial Estate / Metro', zone: 'Central' },
  { id: 'airport', name: 'Chennai International Airport (MAA)', zone: 'South Chennai' },
  { id: 'velachery', name: 'Phoenix Marketcity, Velachery', zone: 'South Chennai' },
  { id: 'central', name: 'Puratchi Thalaivar Dr. MGR Central Station', zone: 'North Central' }
];

export const MentroMobilityModal: React.FC<MentroMobilityModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'rider' 
}) => {
  const [platformView, setPlatformView] = useState<'rider' | 'partner'>(initialMode);
  
  // Rider state
  const [pickup, setPickup] = useState<string>('tambaram');
  const [dropoff, setDropoff] = useState<string>('omr');
  const [vehicleTier, setVehicleTier] = useState<'go' | 'comfort' | 'ev'>('ev');
  const [rideState, setRideState] = useState<'idle' | 'searching' | 'matched' | 'enroute' | 'completed'>('idle');
  const [etaTimer, setEtaTimer] = useState<number>(4);

  // Partner state
  const [partnerOnline, setPartnerOnline] = useState<boolean>(true);
  const [partnerTripAccepted, setPartnerTripAccepted] = useState<boolean>(false);
  const [partnerEarnings, setPartnerEarnings] = useState<number>(1850);

  // Calculate fare
  const baseFares = { go: 140, comfort: 220, ev: 280 };
  const multiplier = pickup === dropoff ? 0.4 : 1.35;
  const estimatedFare = Math.round(baseFares[vehicleTier] * multiplier);
  const estimatedMins = pickup === dropoff ? 5 : vehicleTier === 'ev' ? 22 : 28;

  // Ride state machine transitions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rideState === 'searching') {
      timer = setTimeout(() => {
        setRideState('matched');
      }, 1500);
    } else if (rideState === 'matched') {
      timer = setTimeout(() => {
        setRideState('enroute');
      }, 2000);
    } else if (rideState === 'enroute') {
      timer = setInterval(() => {
        setEtaTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setRideState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [rideState]);

  const handleStartRide = () => {
    setEtaTimer(4);
    setRideState('searching');
  };

  const handleResetRide = () => {
    setRideState('idle');
    setEtaTimer(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col gap-4 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-label="Mentro Mobility Platform Interactive Simulation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-blue-400 font-mono uppercase tracking-wider">Mohamed Arsath Project Demo</div>
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              Mentro Mobility Platform
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher: Customer vs Partner Platform */}
        <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPlatformView('rider')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${platformView === 'rider' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Car className="w-4 h-4" /> Customer Platform (Mentro Mobility AI)
          </button>
          <button
            onClick={() => setPlatformView('partner')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${platformView === 'partner' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Driver & Support (Mentro AI Partner)
          </button>
        </div>

        {/* --- CUSTOMER PLATFORM VIEW --- */}
        {platformView === 'rider' && (
          <div className="flex flex-col gap-4">
            {/* Route Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> Pickup Location
                </label>
                <select
                  value={pickup}
                  disabled={rideState !== 'idle'}
                  onChange={e => setPickup(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60"
                >
                  {CHENNAI_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Destination
                </label>
                <select
                  value={dropoff}
                  disabled={rideState !== 'idle'}
                  onChange={e => setDropoff(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60"
                >
                  {CHENNAI_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.zone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Tier Select */}
            {rideState === 'idle' && (
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setVehicleTier('go')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${vehicleTier === 'go' ? 'border-blue-500 bg-blue-950/30' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Mentro Go</div>
                    <div className="text-[11px] text-slate-400">Compact Hatchback</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-2">₹{Math.round(baseFares.go * multiplier)}</div>
                </button>

                <button
                  onClick={() => setVehicleTier('comfort')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${vehicleTier === 'comfort' ? 'border-blue-500 bg-blue-950/30' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Mentro Comfort</div>
                    <div className="text-[11px] text-slate-400">Sedan · Air Conditioned</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-2">₹{Math.round(baseFares.comfort * multiplier)}</div>
                </button>

                <button
                  onClick={() => setVehicleTier('ev')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${vehicleTier === 'ev' ? 'border-cyan-500 bg-cyan-950/30' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
                >
                  <div className="absolute top-1 right-2 text-[10px] text-cyan-400 font-mono">ECO</div>
                  <div>
                    <div className="text-xs font-bold text-white">Premier EV</div>
                    <div className="text-[11px] text-slate-400">Zero Emission Electric</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-2">₹{Math.round(baseFares.ev * multiplier)}</div>
                </button>
              </div>
            )}

            {/* Ride Status State Machine Display */}
            {rideState === 'idle' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Estimated Trip Duration</span>
                  <div className="text-lg font-bold font-mono text-white">{estimatedMins} mins · {pickup === dropoff ? '2.4' : '18.6'} km</div>
                </div>
                <button
                  onClick={handleStartRide}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
                >
                  Confirm & Request Ride (₹{estimatedFare})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {rideState === 'searching' && (
              <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-6 text-center flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <div>
                  <div className="text-sm font-bold text-white">Dispatching Mentro AI Algorithm...</div>
                  <div className="text-xs text-slate-400 mt-1">Analyzing nearby available drivers around {CHENNAI_LOCATIONS.find(l => l.id === pickup)?.zone}</div>
                </div>
              </div>
            )}

            {(rideState === 'matched' || rideState === 'enroute') && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Ramesh K. (4.92 ★)</div>
                      <div className="text-[11px] text-slate-400">Premier EV · Tata Nexon EV · TN 09 BV 4281</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Arriving in</span>
                    <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums">{etaTimer} mins</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Driver Assigned & Verified
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">OTP: <strong className="text-white font-mono">4821</strong></span>
                    <button className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200">
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {rideState === 'completed' && (
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 flex flex-col gap-3 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Trip Completed Successfully!</h4>
                <div className="text-xs text-slate-400">
                  Fare of ₹{estimatedFare} debited via Mentro Pay. Receipt sent to your registered email.
                </div>
                <button
                  onClick={handleResetRide}
                  className="mx-auto mt-2 flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Book Another Ride
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- DRIVER & SUPPORT PARTNER PLATFORM VIEW --- */}
        {platformView === 'partner' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Driver Partner Status</span>
                <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${partnerOnline ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                  {partnerOnline ? 'Online · Accepting Rides' : 'Offline'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400">Today's Earnings</span>
                  <div className="text-base font-bold font-mono text-emerald-400 flex items-center justify-end">
                    <IndianRupee className="w-3.5 h-3.5" />{partnerEarnings}
                  </div>
                </div>

                <button
                  onClick={() => setPartnerOnline(!partnerOnline)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${partnerOnline ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-600 text-white'}`}
                >
                  {partnerOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>

            {/* Incoming trip request banner */}
            {partnerOnline && !partnerTripAccepted && (
              <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">Incoming Trip Ping (28s)</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">₹320 Payout</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>📍 <strong>Pickup:</strong> Sholinganallur Junction (1.2 km away)</div>
                  <div>🏁 <strong>Drop-off:</strong> Tambaram West Bus Stand (14.8 km)</div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setPartnerTripAccepted(true);
                      setPartnerEarnings(prev => prev + 320);
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Accept Trip
                  </button>
                  <button
                    onClick={() => setPartnerOnline(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}

            {partnerTripAccepted && (
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 flex flex-col gap-2">
                <div className="text-xs font-bold text-emerald-400">Active Passenger Trip In Progress</div>
                <div className="text-xs text-slate-300">Navigating toward Sholinganallur Junction via OMR Expressway.</div>
                <button
                  onClick={() => setPartnerTripAccepted(false)}
                  className="mt-2 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
                >
                  Mark Passenger Picked Up & Complete Trip
                </button>
              </div>
            )}

            {/* Support Ticket Queue */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-medium border-b border-slate-800 pb-1.5 block">
                Partner Support & Database Sync Queue (Mongoose & SQL API)
              </span>
              <div className="text-[11px] text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span>Driver KYC & License Verification:</span>
                  <span className="text-emerald-400 font-mono">APPROVED</span>
                </div>
                <div className="flex justify-between">
                  <span>Fastag & Toll Pass-Through sync:</span>
                  <span className="text-slate-400 font-mono">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly Bank Direct Deposit:</span>
                  <span className="text-blue-400 font-mono">SCHEDULED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
