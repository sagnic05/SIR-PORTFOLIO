// EDIT HERE: all content and image paths live in this file.
const CONFIG = {
  profileImage: "assets/profile/bittu-kumar.jpg",
  resume: "assets/resume/Bittu-Kumar-Resume.pdf",
  phone: "8102528984", email: "bittukr.singh81025@gmail.com",
  stats: [[10,"+","Years of experience"],[4500,"+","Maximum team size led (peak election operations)"],[38,"","Districts, Bihar CCTV & kiosk monitoring"],[19,"","Districts, Bihar election monitoring"]],
  experience: [
    ["Brihaspathi Technologies Limited, Patna","Project Manager – IT","Dec 2025 – Present",["Managing multiple projects, including West Bengal Election, Assam Election and East Central Railway (ECR) projects.","Handling project planning, resource coordination, material and inventory tracking, vendor follow-ups and execution monitoring.","Coordinating with internal teams, clients, departments and field teams to resolve operational issues and ensure timely delivery.","Supporting ongoing project execution and coordinating projects in the pipeline."]],
    ["Graphics Trades Pvt. Ltd., Patna","Project Manager / Project In-Charge","Aug 2019 – Nov 2025",["Led government IT infrastructure and monitoring projects across Bihar, Maharashtra and Jammu & Kashmir.","Oversaw Command & Control Centre operations for BASU Patna, DMD Bihar, WRD Bihar and Planning & Development Department, Bihar.","Directed webcasting and GPS tracking during Legislative and Parliament Elections 2024 (CEO, Jammu & Kashmir) and Bihar Assembly Election 2025 across 19 districts.","Managed Data Centre and SEOC setup at Maharashtra Mantralaya.","Supervised CCTV and kiosk monitoring across 38 DRCC districts in Bihar.","Led large technical teams, including 200–4,500 members during election operations."]],
    ["Wipro InfoTech (Client: IIFL) · Partner: Renovision Automation Services Pvt. Ltd., Patna","Desktop & Network Support Engineer – Team Leader","Oct 2016 – Apr 2019",["Managed IT operations and network troubleshooting for IIFL sites across Bihar and Jharkhand.","Ensured system uptime and user support across client branches.","Led a 28-member multi-location engineering team."]],
    ["ANG India Pvt. Ltd., Cochin, Kerala","Service Engineer / Team Leader","Aug 2014 – Sep 2016",["Provided system, laptop and CCTV maintenance support for banking-sector clients.","Led a four-member team."]],
    ["Taj Techno Tec Pvt. Ltd., Patna","Desktop Service Engineer","Feb 2013 – Jul 2013",["Delivered desktop and server troubleshooting across client offices.","Supported Windows Server 2000, Windows XP and Windows 7."]]],
  skills: {
    "Project Management":["IT Project Planning & Execution","Team Leadership","Vendor Management","Client Coordination","Department Coordination","Field-Team Coordination","Resource Coordination"],
    "Networking & Infrastructure":["Network Design","Network Configuration","Network Troubleshooting","CCNA Certified (as stated in resume)","Data Centre Administration","Server Administration","Firewall & Network Security"],
    "Surveillance & Monitoring":["CCTV Systems","GPS Tracking","System Integration","Railway CCTV / MNVR Project Coordination","Command & Control Centre Operations"],
    "Government Technology":["Election Technology","Webcasting","GPS Vehicle Tracking","Government IT Infrastructure","Emergency Monitoring Systems"]},
  projects: [
    ["Bihar Animal Sciences University (BASU), Patna","Project In-Charge and Network Administrator",["Data Centre operations.","IT infrastructure setup.","System security."]],
    ["RPCAU, Samastipur","Network and CCTV maintenance",["Network maintenance.","CCTV maintenance.","Reliable communication and 24×7 surveillance support."]],
    ["Patna Nagar Nigam — Sump House Monitoring (40 Locations)","Patna Nagar Nigam",["IoT-enabled monitoring.","Real-time water-level monitoring.","Pump control."]],
    ["Water Resources Department, Bihar","Government of Bihar",["Command & Control Centre setup.","Integration of data from multiple SCADA units."]],
    ["Disaster Management Department, Bihar","Government of Bihar",["Command & Control Centre operations.","Emergency data.","Alert systems.","GIS-based situational awareness."]],
    ["Planning & Development Department, Bihar","Government of Bihar",["State-level Command & Control Centre.","CCTV and kiosk system integration across 38 districts.","Secure connectivity coordination with NIC and BSNL."]],
    ["Chief Electoral Office, Bihar","Legislative Election 2025",["State Election Monitoring System.","Webcasting.","GPS vehicle tracking across 19 districts."]],
    ["Chief Electoral Office, Jammu & Kashmir","Legislative and Parliament Elections 2024",["Webcasting project management.","GPS tracking."]],
    ["SEOC, Maharashtra Mantralaya","State Emergency Operations Centre",["Data Centre infrastructure.","Application deployment.","State Emergency Operations Centre."]],
    ["DRCC, Bihar — 38 Districts","Bihar",["CCTV monitoring system implementation.","Kiosk monitoring.","Integration with centralized platform."]]],
  certs: [["PMP Certificate","IIM Ranchi · February 2026","assets/certificates/pmp.jpg"],["Certificate Course in Hardware & Networking","Jetking · 2014","assets/certificates/jetking.jpg"],["DCA","City Zone, Patna","assets/certificates/dca.jpg"],["Sophos Firewall XG Training Certificate","Sophos","assets/certificates/sophos.jpg"]],
  awards: [["Project Excellence Award 2025–2026","Brihaspathi Technologies Limited","assets/awards/project-excellence.jpg"],["Appreciation Letter","District Magistrate (DM), Murshidabad — in recognition of project-related work","assets/awards/dm-murshidabad.jpg"]],
  education: [["B.Sc. Chemistry (Hons)","LNMU · Mar 2011 – Mar 2014","61%"],["Intermediate in Science","BSEB · Mar 2009 – Mar 2011","64.25%"],["Matriculation","BSEB · 2009","60%"]],
  // Project images: assets/projects/project-XX/project-XX-01..04.jpg (auto-derived)
  imageExt: "jpg", // change to "webp" / "avif" / "png" if you export your photographs in another format
  projectImage: (p, n) => `assets/projects/project-${String(p).padStart(2,"0")}/project-${String(p).padStart(2,"0")}-${String(n).padStart(2,"0")}.${CONFIG.imageExt}`
};
