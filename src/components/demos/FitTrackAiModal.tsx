import React, { useState } from 'react';
import { X, Sparkles, Activity, Dumbbell, Apple, Code2, Check } from 'lucide-react';

interface FitTrackAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitTrackAiModal: React.FC<FitTrackAiModalProps> = ({ isOpen, onClose }) => {
  const [goal, setGoal] = useState<'hypertrophy' | 'fatloss' | 'strength'>('hypertrophy');
  const [weightKg, setWeightKg] = useState<number>(72);
  const [activityLevel, setActivityLevel] = useState<'moderate' | 'high'>('moderate');
  const [dietPref, setDietPref] = useState<'omnivore' | 'vegetarian' | 'vegan'>('vegetarian');
  const [activeTab, setActiveTab] = useState<'plan' | 'macros' | 'prompt_payload'>('plan');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);

  // Computed metrics
  const multiplier = activityLevel === 'moderate' ? 1.55 : 1.75;
  const bmr = 10 * weightKg + 6.25 * 175 - 5 * 21 + 5; // Mifflin-St Jeor estimate
  const maintenanceCalories = Math.round(bmr * multiplier);

  const targetCalories = goal === 'hypertrophy' 
    ? maintenanceCalories + 350 
    : goal === 'fatloss' 
      ? maintenanceCalories - 450 
      : maintenanceCalories + 100;

  const proteinGrams = Math.round(weightKg * (goal === 'hypertrophy' ? 2.2 : goal === 'fatloss' ? 2.4 : 1.9));
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col gap-5 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-label="FitTrack AI Interactive Demo"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-blue-400 font-mono uppercase tracking-wider">Mohamed Arsath Project Demo</div>
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              FitTrack AI · Routine & Macro Engine
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

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">Primary Fitness Goal</label>
            <select
              value={goal}
              onChange={e => setGoal(e.target.value as 'hypertrophy' | 'fatloss' | 'strength')}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="hypertrophy">Muscle Gain (Hypertrophy)</option>
              <option value="fatloss">Fat Loss & Conditioning</option>
              <option value="strength">Strength & Powerlifting</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">Body Weight (kg)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={45}
                max={140}
                value={weightKg}
                onChange={e => setWeightKg(Math.max(40, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <span className="text-xs text-slate-400">kg</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">Dietary Profile</label>
            <select
              value={dietPref}
              onChange={e => setDietPref(e.target.value as 'omnivore' | 'vegetarian' | 'vegan')}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="vegetarian">Vegetarian (High Protein)</option>
              <option value="omnivore">High-Protein Omnivore</option>
              <option value="vegan">Plant-Based / Vegan</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'plan' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Workout Schedule
            </button>
            <button
              onClick={() => setActiveTab('macros')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'macros' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Macro Breakdown
            </button>
            <button
              onClick={() => setActiveTab('prompt_payload')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'prompt_payload' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              AI Prompt Payload
            </button>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isGenerating ? "Synthesizing Plan..." : "Re-generate Routine"}
          </button>
        </div>

        {/* Tab 1: Workout Split */}
        {activeTab === 'plan' && hasGenerated && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Day 1 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-blue-400" /> Day 1 · Upper Body Hypertrophy
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">45-55 mins</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Incline Dumbbell Press</span>
                    <span className="font-mono text-slate-400">4 sets × 8-10 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Chest-Supported Barbell Row</span>
                    <span className="font-mono text-slate-400">4 sets × 10-12 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Lateral Dumbbell Raises</span>
                    <span className="font-mono text-slate-400">3 sets × 15 reps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead Cable Triceps Extension</span>
                    <span className="font-mono text-slate-400">3 sets × 12 reps</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-cyan-400" /> Day 2 · Lower Body Power & Core
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">50 mins</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Barbell Back Squat</span>
                    <span className="font-mono text-slate-400">4 sets × 6-8 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Romanian Deadlift (RDL)</span>
                    <span className="font-mono text-slate-400">3 sets × 10 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Bulgarian Split Squats</span>
                    <span className="font-mono text-slate-400">3 sets × 10/leg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hanging Knee Raises</span>
                    <span className="font-mono text-slate-400">3 sets × 15 reps</span>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" /> Day 3 · Pull & Posterior Chain
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">45 mins</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Neutral-Grip Lat Pulldown</span>
                    <span className="font-mono text-slate-400">4 sets × 10 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Face Pulls (Rear Delt focus)</span>
                    <span className="font-mono text-slate-400">4 sets × 15 reps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incline Bicep Curls</span>
                    <span className="font-mono text-slate-400">3 sets × 12 reps</span>
                  </div>
                </div>
              </div>

              {/* Day 4 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-purple-400" /> Day 4 · Push & Metabolic Finish
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">45 mins</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Overhead Barbell Military Press</span>
                    <span className="font-mono text-slate-400">4 sets × 8 reps</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Dips (Bodyweight or Weighted)</span>
                    <span className="font-mono text-slate-400">3 sets × 10 reps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incline Treadmill Walk</span>
                    <span className="font-mono text-slate-400">15 mins @ 12% incline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Nutrition & Macros */}
        {activeTab === 'macros' && hasGenerated && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400">Daily Calorie Target</span>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {targetCalories} <span className="text-xs text-slate-400 font-normal">kcal/day</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Estimated Basal Metabolic Rate</span>
                <div className="text-base font-mono text-slate-300">{Math.round(bmr)} kcal</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">Protein</span>
                <span className="text-xl font-bold font-mono text-blue-400 tabular-nums">{proteinGrams}g</span>
                <span className="text-[11px] text-slate-500 block">4 kcal/g</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">Carbohydrates</span>
                <span className="text-xl font-bold font-mono text-cyan-400 tabular-nums">{carbGrams}g</span>
                <span className="text-[11px] text-slate-500 block">4 kcal/g</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">Fats</span>
                <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">{fatGrams}g</span>
                <span className="text-[11px] text-slate-500 block">9 kcal/g</span>
              </div>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <Apple className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Recommended Nutrition Sources ({dietPref}):</strong>
                {dietPref === 'vegetarian' 
                  ? "Paneer, Greek yogurt, whey protein isolate, lentils (dal), chickpeas, tofu, almonds, oats, and quinoa."
                  : dietPref === 'vegan'
                    ? "Tofu, tempeh, pea & rice protein isolate, lentils, edamame, chia seeds, nutritional yeast, and peanut butter."
                    : "Chicken breast, egg whites, Greek yogurt, salmon, whey protein, basmati rice, sweet potatoes, and avocado."
                }
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Prompt Engineering Payload */}
        {activeTab === 'prompt_payload' && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Code2 className="w-4 h-4" /> Python Prompt Schema & Generative Model Context
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Validated JSON Payload
              </span>
            </div>
            <pre className="p-3 bg-slate-900 rounded-lg text-slate-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800/80">
{`# Mentro & FitTrack AI Prompt Pipeline (Python/Node Engine)
system_prompt = """
You are FitTrack AI, an evidence-based exercise physiologist and sports dietitian.
Generate a structured JSON workout routine with progressive overload metrics,
strictly adhering to user constraints: goal='${goal}', body_weight=${weightKg}kg,
diet='${dietPref}', calculated_target_kcal=${targetCalories}.
"""

payload = {
  "user_profile": {
    "weight_kg": ${weightKg},
    "fitness_goal": "${goal}",
    "diet_preference": "${dietPref}",
    "activity_multiplier": ${multiplier}
  },
  "computed_targets": {
    "bmr_kcal": ${Math.round(bmr)},
    "target_kcal": ${targetCalories},
    "protein_grams": ${proteinGrams},
    "carb_grams": ${carbGrams},
    "fat_grams": ${fatGrams}
  },
  "routine_splits": 4,
  "recovery_protocol": "48h rest interval for compound movements"
}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
