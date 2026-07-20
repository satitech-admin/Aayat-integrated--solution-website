"use client";

import Link from "next/link";
import { Layers3, Ruler } from "lucide-react";
import { useMemo, useState } from "react";

export function RackConfigurator() {
  const [bayCount, setBayCount] = useState(5);
  const [levels, setLevels] = useState(4);
  const [rackType, setRackType] = useState("Selective pallet rack");
  const [aisle, setAisle] = useState("Forklift aisle");

  const capacitySignal = useMemo(() => bayCount * levels * 2, [bayCount, levels]);

  return (
    <div className="rack-configurator glass-panel" id="rack-configurator">
      <div>
        <span className="eyebrow">
          <Ruler size={15} aria-hidden="true" /> Rack configurator concept
        </span>
        <h3>Plan storage density before the site visit.</h3>
        <p>
          This interactive concept gathers layout intent. Final rack design should be confirmed after load, floor, aisle, and equipment checks.
        </p>
        <div className="grid two">
          <label className="field">
            <span>Rack type</span>
            <select className="select" value={rackType} onChange={(event) => setRackType(event.target.value)}>
              <option>Selective pallet rack</option>
              <option>Heavy-duty pallet rack</option>
              <option>Multi-tier racking</option>
              <option>Mezzanine floor</option>
              <option>Cantilever rack</option>
              <option>Slotted angle rack</option>
            </select>
          </label>
          <label className="field">
            <span>Aisle plan</span>
            <select className="select" value={aisle} onChange={(event) => setAisle(event.target.value)}>
              <option>Forklift aisle</option>
              <option>Manual picking aisle</option>
              <option>Narrow aisle</option>
              <option>Mixed movement</option>
            </select>
          </label>
          <label className="field range-field">
            <span>Bay count: {bayCount}</span>
            <input type="range" min={2} max={12} value={bayCount} onChange={(event) => setBayCount(Number(event.target.value))} />
          </label>
          <label className="field range-field">
            <span>Levels: {levels}</span>
            <input type="range" min={2} max={8} value={levels} onChange={(event) => setLevels(Number(event.target.value))} />
          </label>
        </div>
        <div className="visualizer-summary">
          <span>{rackType}</span>
          <span>{aisle}</span>
          <span>Concept storage positions: {capacitySignal}</span>
        </div>
        <Link className="btn btn-primary" href="/request-a-quote?service=Industrial%20Racking">
          Share Racking Requirement
        </Link>
      </div>
      <div className="rack-preview" aria-hidden="true" style={{ "--bays": bayCount, "--levels": levels }}>
        {Array.from({ length: bayCount }).map((_, bay) => (
          <div className="rack-bay" key={bay}>
            {Array.from({ length: levels }).map((__, level) => (
              <span key={level}>
                <Layers3 size={14} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
