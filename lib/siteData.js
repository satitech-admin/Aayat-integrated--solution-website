import {
  Award,
  Boxes,
  Building2,
  Factory,
  Globe2,
  Hammer,
  HardHat,
  LandPlot,
  Layers3,
  MapPinned,
  PackageCheck,
  Phone,
  Recycle,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

export const company = {
  name: "AAYAT Integrated Solutions",
  shortName: "AAYAT",
  phone: "+91 91589 00094",
  phoneHref: "tel:+919158900094",
  whatsapp: "+91 91589 00094",
  whatsappHref: "https://wa.me/919158900094",
  emails: ["aayatenterprisess@gmail.com", "info.aayatpallet@gmail.com"],
  coverage: ["Mumbai", "Bhiwandi", "Pune", "Gujarat", "Madhya Pradesh", "Pan-India"],
  established: "2020",
  teamSize: "11-50 employees",
  followers: "974 followers",
  primaryLocation: "Bhiwandi Wada Road, V.P Naka Nashik Road, Bhiwandi, Maharashtra, India",
  description:
    "AAYAT Integrated Solutions is a manufacturer and supplier of ISPM-15 certified wooden pallets, export packaging, warehouse infrastructure, industrial property support, and waste management services across India.",
};

export const whatsappMessages = {
  general:
    "Hello AAYAT Integrated Solutions, I would like to discuss an industrial requirement. Please contact me.",
  pallets:
    "Hello AAYAT Integrated Solutions, I would like to request a quotation for ISPM-15 certified wooden pallets. Please contact me.",
  exportPackaging:
    "Hello AAYAT Integrated Solutions, I need export packaging support for industrial goods. Please contact me.",
  racking:
    "Hello AAYAT Integrated Solutions, I would like to discuss industrial racking or warehouse installation. Please contact me.",
  leasing:
    "Hello AAYAT Integrated Solutions, I am looking for warehouse leasing or purchase support. Please contact me.",
  land:
    "Hello AAYAT Integrated Solutions, I would like support for industrial land acquisition. Please contact me.",
  factory:
    "Hello AAYAT Integrated Solutions, I want to discuss factory setup support. Please contact me.",
  waste:
    "Hello AAYAT Integrated Solutions, I need industrial waste management support. Please contact me.",
};

export function whatsappLink(message = whatsappMessages.general) {
  return `${company.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const routes = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries-we-serve" },
  { label: "Projects", href: "/projects-and-gallery" },
  { label: "Investment", href: "/investment-opportunities" },
  { label: "Locations", href: "/service-locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

export const serviceGroups = [
  {
    title: "Packaging",
    items: [
      { label: "Wooden Pallets", href: "/services/ispm-15-wooden-pallets" },
      { label: "Export Packaging", href: "/services/export-packaging" },
      { label: "Custom Crates", href: "/services/export-packaging#custom-crates" },
      { label: "Protective Packaging", href: "/services/export-packaging#protective-packaging" },
    ],
  },
  {
    title: "Warehousing",
    items: [
      { label: "Industrial Racking", href: "/services/warehouse-racking" },
      { label: "Warehouse Installation", href: "/services/warehouse-racking#installation" },
      { label: "Warehouse Leasing", href: "/services/warehouse-leasing-sales" },
      { label: "Warehouse Sales", href: "/services/warehouse-leasing-sales#sales" },
    ],
  },
  {
    title: "Industrial Property",
    items: [
      { label: "Industrial Land Acquisition", href: "/services/industrial-land-acquisition" },
      { label: "Pre-Leased Investments", href: "/services/pre-leased-investments" },
      { label: "Factory Setup Support", href: "/services/factory-setup-support" },
    ],
  },
  {
    title: "Sustainability",
    items: [
      { label: "Waste Management", href: "/services/waste-management" },
      { label: "Recycling Support", href: "/services/waste-management#recycling" },
    ],
  },
];

export const services = [
  {
    title: "ISPM-15 Certified Wooden Pallets",
    slug: "ispm-15-wooden-pallets",
    category: "Packaging",
    Icon: PackageCheck,
    accent: "#f59e0b",
    image: "/images/aayat-pallet-frame.jpg",
    imageAlt: "Custom wooden pallet frame manufactured by AAYAT",
    messageKey: "pallets",
    summary:
      "ISPM-15 heat-treated pinewood pallets, EPAL and imported pinewood pallets, custom pallets, reusable pallets, recycled pallets, and bulk dispatch support.",
    problems: [
      "Export shipment rejection because packaging is not compliant",
      "Unclear pallet sizing for load, route, and equipment constraints",
      "Frequent breakage during storage, stacking, or transportation",
    ],
    solutions: [
      "ISPM-15 certified and heat-treated pallet planning",
      "Custom-size pallets based on load and handling requirements",
      "New and recycled pallet options with quotation clarity",
      "Domestic and export-use recommendations",
    ],
    quality: [
      "Requirement-based material selection",
      "Load, fork access, and destination checks",
      "Clear production notes for repeat orders",
    ],
    faqs: [
      "What is an ISPM-15 certified pallet?",
      "Do you manufacture custom-size wooden pallets?",
      "Can I choose new or recycled pallet options?",
    ],
  },
  {
    title: "Export Packaging Services",
    slug: "export-packaging",
    category: "Packaging",
    Icon: Boxes,
    accent: "#2f80ed",
    image: "/images/aayat-open-crate.jpg",
    imageAlt: "Open wooden export crate manufactured for industrial packaging",
    messageKey: "exportPackaging",
    summary:
      "Export boxes, crates, industrial packaging works, heavy machinery packing, on-site packing, pinewood timber processing, and containerization support.",
    problems: [
      "Machinery or equipment is exposed to handling, moisture, and transit risk",
      "Export packaging needs documentation-ready process control",
      "Packing must happen at the client site without disrupting operations",
    ],
    solutions: [
      "Assessment-led export crate and wooden box design",
      "On-site packaging teams for heavy or fixed equipment",
      "Vacuum, shrink wrap, and corrosion protection options",
      "Containerization and dispatch coordination support",
    ],
    quality: [
      "Photo and drawing-based assessment",
      "Packing checklist before dispatch",
      "Destination and handling review",
    ],
    faqs: [
      "Do you provide export packaging at the client's site?",
      "Can you pack heavy machinery?",
      "Can I upload drawings or photos?",
    ],
  },
  {
    title: "Warehousing and Heavy-Duty Racking Systems",
    slug: "warehouse-racking",
    category: "Warehousing",
    Icon: Warehouse,
    accent: "#d2d8de",
    image: "/images/aayat-warehouse-racking.jpg",
    imageAlt: "AAYAT warehouse with heavy-duty industrial racking installation",
    messageKey: "racking",
    summary:
      "Heavy-duty pallet racks, selective racks, multi-tier racking, mezzanine floors, cantilever racks, slotted angle racks, planning, installation, and maintenance.",
    problems: [
      "Warehouse storage capacity is constrained by poor layout",
      "Load-bearing requirements are unclear or inconsistent",
      "Installation needs professional coordination with daily operations",
    ],
    solutions: [
      "Warehouse layout planning and racking concept design",
      "Heavy-duty and selective pallet rack installation",
      "Multi-tier, mezzanine, cantilever, and slotted angle options",
      "Maintenance and expansion planning",
    ],
    quality: [
      "Site survey before recommendation",
      "Load and aisle clearance review",
      "Installation sequencing and handover support",
    ],
    faqs: [
      "Do you install heavy-duty warehouse racks?",
      "Can you help plan a warehouse layout?",
      "Do you provide installation and maintenance?",
    ],
  },
  {
    title: "Warehouse Leasing and Sales",
    slug: "warehouse-leasing-sales",
    category: "Industrial Property",
    Icon: Building2,
    accent: "#2fbf71",
    image: "/images/aayat-warehouse-exterior.jpg",
    imageAlt: "Industrial warehouse exterior for leasing and sales support",
    messageKey: "leasing",
    summary:
      "Property discovery, location shortlisting, warehouse leasing, warehouse buying, industrial sheds, logistics facilities, documentation assistance, site visits, and negotiation support.",
    problems: [
      "The right warehouse location is hard to compare quickly",
      "Documentation, site visits, and negotiation need coordination",
      "Buy or lease decisions need area, access, timing, and budget clarity",
    ],
    solutions: [
      "Warehouse leasing and purchase shortlisting",
      "Industrial shed and logistics facility discovery",
      "Documentation and site visit coordination",
      "Requirement-led negotiation support",
    ],
    quality: [
      "Verified location and area details before client presentation",
      "Requirement-fit comparison notes",
      "Editable listings without invented availability claims",
    ],
    faqs: [
      "Can you help find warehouses for lease or purchase?",
      "Do you arrange site visits?",
      "Can requirements be shared through the quotation form?",
    ],
  },
  {
    title: "Pre-Leased Investment Opportunities",
    slug: "pre-leased-investments",
    category: "Investment",
    Icon: Layers3,
    accent: "#f97316",
    image: "/images/aayat-warehouse-exterior.jpg",
    imageAlt: "Industrial warehouse property for pre-leased investment opportunities",
    messageKey: "leasing",
    summary:
      "Investor-oriented support for pre-leased industrial assets, tenant profile assessment, location analysis, documentation support, return evaluation, and site due diligence.",
    problems: [
      "Industrial investment opportunities require careful due diligence",
      "Tenant, tenure, and documentation quality must be reviewed",
      "Returns should be evaluated without unrealistic promises",
    ],
    solutions: [
      "Pre-leased asset discovery and opportunity review",
      "Tenant profile and location assessment",
      "Documentation coordination and due diligence support",
      "Investor consultation without guaranteed-return claims",
    ],
    quality: [
      "Risk and documentation review",
      "Location and tenant-fit analysis",
      "Transparent investment brief preparation",
    ],
    faqs: [
      "How do pre-leased industrial properties work?",
      "Do you promise guaranteed returns?",
      "Can I book an investor consultation?",
    ],
  },
  {
    title: "Industrial Land Acquisition",
    slug: "industrial-land-acquisition",
    category: "Industrial Property",
    Icon: LandPlot,
    accent: "#aab3bd",
    image: "/images/aayat-warehouse-exterior.jpg",
    imageAlt: "Industrial shed and warehouse corridor for land acquisition planning",
    messageKey: "land",
    summary:
      "Industrial land identification, location selection, legal coordination, documentation assistance, and requirement-led acquisition support.",
    problems: [
      "Industrial location decisions need careful coordination",
      "Access, zoning, utilities, and documentation must be reviewed early",
      "Land requirements need a clear business and factory setup context",
    ],
    solutions: [
      "Industrial land identification and shortlisting",
      "Location suitability and access review",
      "Legal and document coordination support",
      "Requirement-led acquisition planning",
    ],
    quality: [
      "Requirement and timeline mapping",
      "State and location suitability review",
      "Documentation checklist support",
    ],
    faqs: [
      "Can you help with industrial land acquisition?",
      "Which states or cities can be considered?",
      "Can land support be combined with factory setup?",
    ],
  },
  {
    title: "Factory Setup Support",
    slug: "factory-setup-support",
    category: "Factory Setup",
    Icon: Factory,
    accent: "#aab3bd",
    image: "/images/aayat-warehouse-racking.jpg",
    imageAlt: "Warehouse infrastructure used for factory setup planning",
    messageKey: "factory",
    summary:
      "Requirement analysis, infrastructure planning, vendor coordination, factory setup support, and handover assistance for growing businesses.",
    problems: [
      "Factory plans depend on access, utilities, approvals, vendors, and timelines",
      "Setup milestones can drift without a single coordination point",
      "Industrial expansion needs practical planning before execution",
    ],
    solutions: [
      "Requirement and timeline mapping",
      "Infrastructure and vendor planning",
      "Factory setup coordination through handover",
      "Operational readiness checklist support",
    ],
    quality: [
      "Requirement and timeline mapping",
      "State and location suitability review",
      "Structured handover checklist",
    ],
    faqs: [
      "Do you provide factory setup assistance?",
      "Can you coordinate vendors?",
      "Can setup support be combined with land search?",
    ],
  },
  {
    title: "Waste Management Services",
    slug: "waste-management",
    category: "Sustainability",
    Icon: Recycle,
    accent: "#2fbf71",
    image: "/images/warehouse-aisle.jpg",
    imageAlt: "Organized warehouse inventory area for industrial waste and packaging flow review",
    messageKey: "waste",
    summary:
      "Industrial and food waste management, collection, segregation, recycling support for non-hazardous scrap, pallet recycling, and waste reduction consultation.",
    problems: [
      "Industrial sites need cleaner waste segregation and scrap coordination",
      "Packaging waste can become costly if not managed methodically",
      "Sustainability targets need practical operating steps",
    ],
    solutions: [
      "Waste assessment and segregation planning",
      "Packaging waste management and pallet recycling",
      "Scrap coordination and disposal support",
      "Waste reduction consultation for industrial operations",
    ],
    quality: [
      "Site-based waste category review",
      "Practical segregation and handling plan",
      "Sustainability notes for continuous improvement",
    ],
    faqs: [
      "Do you support wooden pallet recycling?",
      "Can you assess industrial waste at site?",
      "Do you help reduce packaging waste?",
    ],
  },
];

export const industries = [
  "Manufacturing",
  "Engineering",
  "Automotive",
  "Pharmaceutical",
  "FMCG",
  "Food and Beverage",
  "Textile",
  "Chemical",
  "Electronics",
  "Logistics",
  "E-commerce",
  "Export Houses",
  "Warehousing",
  "Infrastructure",
  "Renewable Energy",
];

export const whyChoose = [
  "Established in 2020",
  "500 pallets per day capacity",
  "ISPM-15 compliant packaging",
  "Bulk and recurring dispatch support",
  "Urgent export requirement handling",
  "Custom pallet sizing",
  "Warehouse and racking support",
  "Waste segregation and recycling coordination",
  "Pan-India service capability",
  "Single-point industrial coordination",
];

export const processSteps = [
  "Consultation",
  "Site Assessment",
  "Custom Proposal",
  "Execution",
  "Quality Inspection",
  "Support",
];

export const factorySteps = [
  "Requirement Analysis",
  "Location Selection",
  "Industrial Land Identification",
  "Legal and Document Coordination",
  "Infrastructure Planning",
  "Vendor Coordination",
  "Factory Setup Support",
  "Handover and Operational Assistance",
];

export const packagingProcess = [
  "Assessment",
  "Design",
  "Material Selection",
  "Packing",
  "Quality Check",
  "Dispatch",
];

export const trustPlaceholders = [
  "Established in 2020",
  "500 pallets per day",
  "ISPM-15 export packaging",
  "Bhiwandi, Maharashtra",
  "Mumbai to Pan-India coverage",
];

export const editableStats = [
  { label: "Established", value: "2020" },
  { label: "Manufacturing capacity", value: "500/day" },
  { label: "LinkedIn followers", value: "974" },
  { label: "Team size", value: "11-50" },
];

export const businessHighlights = [
  {
    label: "Manufacturer and supplier",
    value: "ISPM-15 certified wooden pallets",
  },
  {
    label: "Export packaging",
    value: "Crates, boxes, industrial packing, and pinewood timber processing",
  },
  {
    label: "Waste management",
    value: "Industrial, food, packaging, wood, plastic, metal, and paper scrap support",
  },
  {
    label: "Industrial infrastructure",
    value: "Racking, warehouse leasing, pre-leased assets, land, and factory setup",
  },
];

export const collaborationServices = [
  {
    title: "Wooden Packaging Solutions",
    items: [
      "ISPM-15 heat-treated pinewood pallets",
      "EPAL / EURO and imported pinewood pallets",
      "Customized pallets by load, size, and destination norms",
      "Export boxes, crates, and industrial packaging works",
      "Pinewood timber processing",
    ],
  },
  {
    title: "Waste Management and Allied Services",
    items: [
      "Industrial and food waste management",
      "Collection, segregation, and recycling of non-hazardous scrap",
      "MS / SS scrap, PVC cable scrap, plastic scrap, metal scrap",
      "Wood scrap, paper, corrugated boxes, and non-contaminated broken glass",
    ],
  },
  {
    title: "Infrastructure and Industrial Support",
    items: [
      "Warehousing and heavy-duty racking installation",
      "Warehouse leasing and sales",
      "Pre-leased investment opportunities",
      "Industrial land acquisition",
      "Factory setup support",
    ],
  },
];

export const wasteStreams = [
  "MS / SS scrap",
  "PVC cable scrap",
  "Hard plastic scrap",
  "Metal scrap",
  "Wood scrap",
  "Paper and corrugated boxes",
  "Non-contaminated broken glass",
];

export const propertyDemo = [
  {
    title: "Demo entry - replace with verified property",
    location: "Bhiwandi",
    area: "Editable area",
    type: "Warehouse / industrial shed",
    availability: "Editable availability",
    mode: "Lease or sale",
  },
  {
    title: "Demo entry - replace with verified property",
    location: "Pune",
    area: "Editable area",
    type: "Logistics facility",
    availability: "Editable availability",
    mode: "Lease",
  },
  {
    title: "Demo entry - replace with verified property",
    location: "Gujarat",
    area: "Editable area",
    type: "Industrial land / shed",
    availability: "Editable availability",
    mode: "Sale",
  },
];

export const projectDemo = [
  {
    title: "ISPM-15 pinewood pallet manufacturing",
    category: "Wooden Pallets",
    location: "Bhiwandi",
    industry: "Manufacturing",
    scope: "Heat-treated pinewood pallets, load-fit sizing, and recurring dispatch support",
    completion: "Ongoing",
    challenge: "Bulk export packaging requirements need compliance-ready pallet planning.",
    solution: "Custom pallet manufacturing aligned to load, handling, and destination norms.",
    result: "Capacity-ready production for repeat and urgent dispatch schedules.",
    image: "/images/aayat-pallet-frame.jpg",
    imageAlt: "Custom pinewood pallet frame manufactured by AAYAT",
    featured: true,
  },
  {
    title: "Export wooden pallet bin boxes",
    category: "Export Packaging",
    location: "Pune",
    industry: "Food and Agri Logistics",
    scope: "Wooden pallet bin boxes for cold storage, fruit handling, and export supply chains",
    completion: "Product line",
    challenge: "Fresh produce needs durable, stackable, ventilated wooden bin packaging.",
    solution: "ISPM-15 compliant pinewood / softwood bin boxes with forklift-friendly construction.",
    result: "Export-ready product format for bulk buyers and long-term partners.",
    image: "/images/aayat-premium-bin-poster.jpg",
    imageAlt: "AAYAT premium wooden pallet bin boxes poster",
    featured: true,
  },
  {
    title: "Heavy-duty warehouse racking installation",
    category: "Warehousing",
    location: "Bhiwandi",
    industry: "Logistics",
    scope: "Racking concept, installation planning, and warehouse layout support",
    completion: "28/04/2025",
    challenge: "Warehouse storage capacity needed organized industrial racking.",
    solution: "Heavy-duty racking system installation with practical aisle planning.",
    result: "Cleaner floor flow and improved storage readiness.",
    image: "/images/aayat-warehouse-racking.jpg",
    imageAlt: "Heavy-duty racking installation in a large industrial warehouse",
    featured: true,
  },
  {
    title: "Warehouse leasing and sales support",
    category: "Warehouse Property",
    location: "Bhiwandi",
    industry: "Supply Chain and Storage",
    scope: "Industrial warehouse shortlisting, leasing, sales, and site visit coordination",
    completion: "Available by requirement",
    challenge: "Businesses need warehouse access with clear location and documentation support.",
    solution: "Requirement-led shortlisting around Bhiwandi, Mumbai, Pune, Gujarat, MP, and Pan-India needs.",
    result: "Faster property discussions with practical comparison points.",
    image: "/images/aayat-warehouse-exterior.jpg",
    imageAlt: "Industrial warehouse exterior used for leasing and sales support",
  },
  {
    title: "Open wooden crate packaging",
    category: "Export Packaging",
    location: "Mumbai",
    industry: "Export Houses",
    scope: "Open wooden crate planning for industrial goods and storage movement",
    completion: "Requirement-led",
    challenge: "Industrial goods need safe wooden containment before handling and dispatch.",
    solution: "Custom wooden crate manufacturing using pinewood / softwood packaging logic.",
    result: "Stronger handling readiness for logistics and storage teams.",
    image: "/images/aayat-open-crate.jpg",
    imageAlt: "Open wooden crate manufactured for industrial packaging",
  },
  {
    title: "Legacy gallery - warehouse operations",
    category: "Industrial Racking",
    location: "Pan-India",
    industry: "Warehousing",
    scope: "Existing gallery image retained for warehouse operations and pallet flow",
    completion: "Gallery",
    challenge: "Older imagery should remain visible while new AAYAT images are added.",
    solution: "Combined gallery keeps previous industrial visuals plus new supplied assets.",
    result: "More complete visual story across pallets, racking, warehouses, and packaging.",
    image: "/images/warehouse-aisle.jpg",
    imageAlt: "Previous warehouse aisle image retained in the gallery",
  },
  {
    title: "Internet gallery - active forklift movement",
    category: "Warehousing",
    location: "Global reference",
    industry: "Supply Chain and Storage",
    scope: "Real warehouse racking, pallet storage, and forklift movement reference",
    completion: "Gallery reference",
    challenge: "The gallery needed additional real industrial images while keeping AAYAT photos.",
    solution: "Added a free internet warehouse image to expand the visual range.",
    result: "Gallery now shows broader warehousing and material handling context.",
    image: "/images/web-warehouse-pallet-forklift.jpg",
    imageAlt: "Forklift moving pallets inside a warehouse racking aisle",
  },
  {
    title: "Internet gallery - high-bay racking aisle",
    category: "Industrial Racking",
    location: "Global reference",
    industry: "Warehousing",
    scope: "High-bay racking aisle with forklift and industrial stock",
    completion: "Gallery reference",
    challenge: "Racking visuals needed more variety for buyers comparing warehouse support.",
    solution: "Added a real racking aisle image from a free internet photo source.",
    result: "Gallery has stronger warehouse infrastructure context.",
    image: "/images/web-industrial-forklift-worker.jpg",
    imageAlt: "Forklift operator inside a high-bay warehouse racking aisle",
  },
  {
    title: "Internet gallery - packaged goods handling",
    category: "Warehouse Property",
    location: "Global reference",
    industry: "Logistics",
    scope: "Packaged goods handling and storage reference for industrial operations",
    completion: "Gallery reference",
    challenge: "The site needed more operational visuals beyond product photos.",
    solution: "Added an additional real logistics handling image.",
    result: "Gallery now covers pallets, crates, warehouses, racking, and handling flow.",
    image: "/images/web-yellow-forklift.jpg",
    imageAlt: "Warehouse operator handling packaged goods with a forklift",
  },
];

export const testimonialPlaceholders = [
  {
    client: "Verified client name pending",
    company: "Company pending",
    position: "Position pending",
    service: "Service used pending",
    review:
      "Client testimonial placeholder. Replace this with a verified review before publishing as a real endorsement.",
    rating: "Editable",
  },
  {
    client: "Verified client name pending",
    company: "Company pending",
    position: "Position pending",
    service: "Service used pending",
    review:
      "Client testimonial placeholder. Add an approved review, client logo, and permission status in the dashboard.",
    rating: "Editable",
  },
];

export const faqs = [
  {
    question: "What is an ISPM-15 certified pallet?",
    answer:
      "ISPM-15 is an international standard for treated wood packaging used in export shipments. AAYAT can help plan export-ready pallets based on shipment requirements.",
  },
  {
    question: "Do you manufacture custom-size wooden pallets?",
    answer:
      "Yes. The pallet visualizer and quotation form collect size, load, quantity, usage, and delivery details so the team can provide a requirement-based quotation.",
  },
  {
    question: "Do you provide export packaging at the client's site?",
    answer:
      "Yes. On-site export packaging can be requested for machinery, equipment, and industrial goods where movement before packing is not practical.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "AAYAT covers Mumbai, Bhiwandi, Pune, Gujarat, Madhya Pradesh, and Pan-India requirements depending on service scope.",
  },
  {
    question: "Do you install heavy-duty warehouse racks?",
    answer:
      "Yes. Heavy-duty pallet racking, selective racks, multi-tier systems, mezzanine floors, cantilever racks, and slotted angle systems can be discussed through the quote form.",
  },
  {
    question: "Can you help find warehouses for lease or purchase?",
    answer:
      "Yes. The team can support property discovery, shortlisting, site visits, documentation coordination, and negotiation support.",
  },
  {
    question: "Do you provide factory setup assistance?",
    answer:
      "Yes. Factory setup support can include land identification, document coordination, infrastructure planning, vendor coordination, and handover assistance.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Use the Request a Quote page, WhatsApp button, phone link, or email links. The multi-step form captures service-specific details and file uploads.",
  },
  {
    question: "Can I upload drawings or requirement documents?",
    answer:
      "Yes. PDF, JPG, PNG, DOCX, and XLSX uploads are validated by type and size before submission.",
  },
  {
    question: "Do you serve clients outside Maharashtra?",
    answer:
      "Yes. Gujarat, Madhya Pradesh, and Pan-India service capability are included, subject to requirement fit and project scope.",
  },
];

export const blogPosts = [
  "What Is ISPM-15 Certification and Why Is It Important?",
  "How to Choose the Right Wooden Pallet for Export",
  "Wooden Pallets vs Plastic Pallets",
  "Industrial Racking Systems Explained",
  "Checklist for Leasing an Industrial Warehouse",
  "Important Factors Before Buying Industrial Land",
  "Export Packaging Checklist for Heavy Machinery",
  "How Pre-Leased Industrial Properties Work",
  "Steps Involved in Setting Up a Factory",
  "Sustainable Industrial Waste Management Practices",
].map((title, index) => ({
  title,
  slug: title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  category:
    [
      "Wooden Pallets",
      "Export Packaging",
      "Warehouse Management",
      "Industrial Racking",
      "Industrial Property",
      "Factory Setup",
      "Waste Management",
      "Logistics",
      "Investment Insights",
    ][index % 9],
  author: "AAYAT Editorial Team",
  date: "Editable date",
  readingTime: "Editable reading time",
  excerpt:
    "Draft article outline ready for client-approved content, SEO metadata, tags, schema markup, and internal linking.",
}));

export const locations = [
  { name: "Mumbai", x: 30, y: 58, services: ["Pallets", "Export Packaging", "Warehouse Support"] },
  { name: "Bhiwandi", x: 34, y: 52, services: ["Pallets", "Warehousing", "Leasing"] },
  { name: "Pune", x: 36, y: 64, services: ["Export Packaging", "Racking", "Factory Setup"] },
  { name: "Gujarat", x: 22, y: 42, services: ["Industrial Land", "Warehousing", "Pallets"] },
  { name: "Madhya Pradesh", x: 48, y: 42, services: ["Factory Setup", "Land", "Waste Management"] },
  { name: "Pan-India", x: 70, y: 52, services: ["Project-based coverage", "Consultation", "Coordination"] },
];

export const pageList = [
  { slug: "about-us", title: "About Us" },
  { slug: "services", title: "Services" },
  { slug: "industries-we-serve", title: "Industries We Serve" },
  { slug: "projects-and-gallery", title: "Projects and Gallery" },
  { slug: "certifications-and-quality", title: "Certifications and Quality" },
  { slug: "investment-opportunities", title: "Investment Opportunities" },
  { slug: "service-locations", title: "Service Locations" },
  { slug: "blog", title: "Industrial Insights Blog" },
  { slug: "request-a-quote", title: "Request a Quote" },
  { slug: "contact-us", title: "Contact Us" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-and-conditions", title: "Terms and Conditions" },
  { slug: "sitemap", title: "Sitemap" },
];

export const servicePageList = services.map((service) => ({
  slug: service.slug,
  title: service.title,
}));

export const iconMap = {
  Award,
  Globe2,
  Hammer,
  HardHat,
  LandPlot,
  MapPinned,
  Phone,
  ShieldCheck,
};
