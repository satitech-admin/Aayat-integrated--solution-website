"use client";

import Link from "next/link";
import { Calculator, PackageCheck } from "lucide-react";
import { useMemo, useState } from "react";

export function PalletVisualizer() {
  const [type, setType] = useState("Four-way pallet");
  const [length, setLength] = useState(1200);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(140);
  const [load, setLoad] = useState(750);
  const [quantity, setQuantity] = useState(100);
  const [usage, setUsage] = useState("Export");

  const recommendation = useMemo(() => {
    const volume = (length * width * height) / 1000000000;
    const loadBand = load > 1200 ? "heavy-duty" : load > 650 ? "industrial" : "standard";
    return {
      volume: volume.toFixed(2),
      loadBand,
      treatment: usage === "Export" ? "ISPM-15 heat-treatment recommended" : "Domestic-use specification review",
    };
  }, [height, length, load, usage, width]);

  const quoteHref = `/request-a-quote?service=Wooden%20Pallets&type=${encodeURIComponent(type)}&quantity=${quantity}`;

  return (
    <div className="visualizer glass-panel" id="pallet-visualizer">
      <div className="visualizer-preview" aria-hidden="true">
        <div className="pallet-preview">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="load-readout">
          <PackageCheck size={22} />
          <strong>{recommendation.loadBand}</strong>
          <small>{recommendation.treatment}</small>
        </div>
      </div>
      <div className="visualizer-form">
        <div className="section-heading">
          <span className="eyebrow">
            <Calculator size={15} aria-hidden="true" /> Pallet visualizer
          </span>
          <h3>Size, load, quantity, and usage in one quote-ready view.</h3>
          <p>
            Enter preliminary details to prepare a quotation request. The final specification is reviewed by the AAYAT team.
          </p>
        </div>
        <div className="grid two">
          <label className="field">
            <span>Pallet type</span>
            <select className="select" value={type} onChange={(event) => setType(event.target.value)}>
              <option>Two-way pallet</option>
              <option>Four-way pallet</option>
              <option>Heavy-duty pallet</option>
              <option>Reusable pallet</option>
              <option>One-time-use pallet</option>
            </select>
          </label>
          <label className="field">
            <span>Usage</span>
            <select className="select" value={usage} onChange={(event) => setUsage(event.target.value)}>
              <option>Export</option>
              <option>Domestic</option>
            </select>
          </label>
          <NumberField label="Length (mm)" value={length} setValue={setLength} min={300} max={3000} />
          <NumberField label="Width (mm)" value={width} setValue={setWidth} min={300} max={2500} />
          <NumberField label="Height (mm)" value={height} setValue={setHeight} min={80} max={600} />
          <NumberField label="Expected load (kg)" value={load} setValue={setLoad} min={50} max={3000} />
          <NumberField label="Quantity" value={quantity} setValue={setQuantity} min={1} max={10000} />
        </div>
        <div className="visualizer-summary">
          <span>Approx. pallet volume: {recommendation.volume} m3</span>
          <span>{recommendation.treatment}</span>
        </div>
        <Link className="btn btn-primary" href={quoteHref}>
          Request Custom Quotation
        </Link>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  setValue,
  min,
  max,
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        className="input"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </label>
  );
}
