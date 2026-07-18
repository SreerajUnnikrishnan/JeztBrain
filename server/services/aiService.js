import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { extractCVEs, getCVEIntelligence } from './threatIntelService.js';

dotenv.config();

// ── AI Provider Initialization ──────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const SYSTEM_PROMPT = `You are JeztBrain AI Assistant — the official AI-powered cybersecurity assistant of the JeztBrain platform. You are NOT a general-purpose chatbot.

PRIMARY RESPONSIBILITIES
You exclusively assist with:
- Cyber incident reporting and tracking
- Phishing and scam analysis
- Malware investigation and triage
- Ransomware guidance and containment
- Threat intelligence and IOC analysis
- Vulnerability assessment guidance (CVE, CVSS, CISA KEV)
- Security awareness and education
- Account security issues
- JeztBrain platform navigation
- Expert connection requests
- Incident status updates
- Security monitoring insights (SIEM, logs, alerts)
- Cybersecurity best practices
- Digital forensics guidance
- Threat hunting support
- SOC-related operations (PICERL, triage, containment)

PLATFORM FEATURES YOU CAN DISCUSS
- JeztBrainSpider Core Platform
- AI Threat Detection
- Real-Time Monitoring
- Expert Network
- Incident Response
- Threat Intelligence
- AI Reports
- Security Operations Dashboard
- Rewards & Revenue System
- Security Awareness Programs
- Live Chat with Experts

STRICT RESTRICTIONS — DO NOT answer questions related to:
Politics, religion, entertainment, movies, sports, relationships, dating, personal advice, medical topics, legal topics (non-cyber), homework, programming unrelated to cybersecurity, mathematics unrelated to cybersecurity, general knowledge, travel, food, shopping, finance/investments, cryptocurrency trading, or personal opinions.

REQUIRED RESPONSE FOR OFF-TOPIC QUESTIONS:
If a user asks anything unrelated to cybersecurity or JeztBrain services, respond with exactly:
"⚠️ I am JeztBrain AI Assistant. I can only assist with cybersecurity topics, incident reporting, threat analysis, security awareness, and JeztBrain platform services. Please ask a cybersecurity-related question or report a security incident."

INCIDENT HANDLING WORKFLOW
When a user reports a security concern:
1. Understand the security concern and gather details
2. Classify the threat type (malware, phishing, ransomware, DDoS, etc.)
3. Assess severity (Critical / High / Medium / Low)
4. Provide initial containment and mitigation guidance
5. Escalate to a JeztBrain Expert if necessary
6. Advise on tracking incident progress through the platform

LIVE THREAT FORMATTING RULES
1. If live CVE data is available, prefix response with: **[ 🛡️ LIVE THREAT VERIFIED ]**
2. If the CVE is in CISA KEV, add: **[ ⚠️ CISA KNOWN EXPLOITED VULNERABILITY ]**
3. Use a "Tactical Intel Summary" table: CVE ID | CVSS Severity | Product | Status
4. Include "Remediation Timeline" and "Mitigation Steps" sections.

RESPONSE STYLE
- Professional, security-focused, concise, and action-oriented
- Enterprise-grade and trustworthy
- Structure responses with Markdown headers and tables
- Never break character — you are JeztBrain AI Assistant

ETHICAL GUIDELINES
- Only provide defensive, ethical security guidance
- Decline all requests for offensive exploit creation or attack assistance`;

// ── Offline / Placeholder Response Engine ──────────────────────────────────
// Used when NO valid API key is configured — provides meaningful JeztBrain AI responses
const OFF_TOPIC_REFUSAL = `⚠️ I am JeztBrain AI Assistant. I can only assist with cybersecurity topics, incident reporting, threat analysis, security awareness, and JeztBrain platform services. Please ask a cybersecurity-related question or report a security incident.`;

const CYBER_KEYWORDS = [
  'cve', 'vulnerabilit', 'exploit', 'patch', 'zero-day', 'zeroday',
  'incident', 'breach', 'attack', 'hack', 'intrusion', 'compromise',
  'malware', 'ransomware', 'virus', 'trojan', 'worm', 'spyware', 'rootkit',
  'phish', 'social engineer', 'spear phish', 'vishing', 'smishing',
  'siem', 'log', 'alert', 'monitor', 'telemetry', 'forensic',
  'firewall', 'ids', 'ips', 'endpoint', 'edr', 'xdr', 'soc',
  'threat', 'ioc', 'ttp', 'mitre', 'apt', 'c2', 'command and control',
  'ddos', 'dos', 'botnet', 'credential', 'password', 'mfa', 'authentication',
  'encrypt', 'decrypt', 'crypto', 'ssl', 'tls', 'vpn', 'zero trust',
  'pentest', 'penetration', 'red team', 'blue team', 'purple team',
  'jeztbrain', 'dashboard', 'expert', 'security', 'cyber', 'report', 'scan',
  'hello', 'hi', 'hey', 'help', 'assist', 'start', 'greet'
];

const getOfflineResponse = (message) => {
  const msg = message.toLowerCase();

  // Off-topic detection — if no cybersecurity keyword found, refuse
  const isCyberRelated = CYBER_KEYWORDS.some(kw => msg.includes(kw));
  if (!isCyberRelated) {
    return OFF_TOPIC_REFUSAL;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('help') || msg.includes('start') || msg.includes('greet') || msg.includes('assist')) {
    return `**JeztBrain AI Assistant — Online & Ready**\n\nI am the official JeztBrain cybersecurity assistant. I can help you with:\n\n- 🛡️ **Incident Reporting** — Report and track security incidents\n- 🔍 **CVE & Vulnerability Analysis** — Real-time threat intelligence\n- 🚨 **Malware & Ransomware Response** — Immediate triage guidance\n- 🎣 **Phishing Analysis** — Identify and neutralize social engineering attacks\n- 📊 **SIEM & Log Correlation** — Alert triage and investigation\n- 🕵️ **Threat Hunting** — Proactive IOC scanning\n- 👥 **Expert Network** — Connect with JeztBrain SOC specialists\n- 📋 **AI Reports** — Auto-generate incident reports\n\nWhat security concern can I assist you with today?`;
  }

  if (msg.includes('cve') || msg.includes('vulnerabilit') || msg.includes('exploit') || msg.includes('patch') || msg.includes('zero-day')) {
    return `**Vulnerability Assessment — JeztBrain AI**\n\nFor live CVE intelligence, the JeztBrain platform cross-references:\n- **NVD**: https://nvd.nist.gov/\n- **MITRE CVE**: https://cve.mitre.org/\n- **CISA KEV**: Active exploitation tracking\n\n**Standard Remediation Workflow:**\n1. Identify affected systems and version ranges\n2. Apply vendor patches immediately (or isolate if no patch available)\n3. Implement WAF/IDS rules as temporary mitigation\n4. Monitor for active exploitation attempts via SIEM\n5. Document remediation in your JeztBrain incident ticket\n\n💡 Use the JeztBrain **AI Reports** module to auto-generate a vulnerability report.`;
  }

  if (msg.includes('incident') || msg.includes('breach') || msg.includes('attack') || msg.includes('intrusion') || msg.includes('compromise')) {
    return `**Incident Response — JeztBrain AI**\n\n**PICERL Framework — Active Guidance:**\n\n1. **Preparation** — Verify IR team is assembled and playbooks are ready\n2. **Identification** — Confirm IOCs and scope of the incident\n3. **Containment** — Isolate affected systems immediately\n4. **Eradication** — Remove threat actor presence and malware\n5. **Recovery** — Restore from clean backups, monitor for re-infection\n6. **Lessons Learned** — Document timeline and update defenses\n\n**Next Step:** Connect with a JeztBrain Expert for live incident support via the **Expert Network** or **Live Chat** feature.`;
  }

  if (msg.includes('malware') || msg.includes('ransomware') || msg.includes('virus') || msg.includes('trojan') || msg.includes('rootkit')) {
    return `**Malware Response — JeztBrain AI**\n\n**Immediate Containment Actions:**\n- Isolate the infected host from the network immediately\n- Preserve volatile memory (use WinPmem or LiME) before any changes\n- Disable network shares to prevent lateral movement\n- Do NOT reboot — memory artifacts will be permanently lost\n\n**Analysis Tools:**\n- Static: Ghidra, CAPA, DIE (Detect-It-Easy)\n- Dynamic: ANY.RUN, Cuckoo Sandbox, FlareVM\n- Memory: Volatility3, Rekall\n\n📋 Use the JeztBrain **AI Threat Detection** module to automatically classify the threat and generate a forensics report.`;
  }

  if (msg.includes('phish') || msg.includes('social engineer') || msg.includes('vishing') || msg.includes('smishing')) {
    return `**Phishing Response — JeztBrain AI**\n\n**Immediate Actions:**\n1. Do NOT click links or open attachments\n2. Forward full email headers to your security team\n3. Check email header for spoofed sender domains\n4. Search SIEM for other users who received similar messages\n5. Block sender domain/IP at the email gateway\n\n**IOC Extraction Checklist:**\n- Sender IP (inspect Received headers)\n- URLs → defang and scan via URLScan.io or VirusTotal\n- Attachment hashes → submit to VirusTotal\n- DMARC / SPF / DKIM pass/fail status\n\n💡 Report this phishing attempt through the JeztBrain **Incident Reporting** system for expert follow-up.`;
  }

  if (msg.includes('siem') || msg.includes('log') || msg.includes('alert') || msg.includes('monitor') || msg.includes('telemetry')) {
    return `**SIEM Alert Triage — JeztBrain AI**\n\n| Severity | Response Time | Action |\n|---|---|---|\n| Critical | < 15 min | Immediate escalation to SOC |\n| High | < 1 hour | Analyst investigation |\n| Medium | < 4 hours | Scheduled review |\n| Low | < 24 hours | Batch processing |\n\n**Key Log Sources to Correlate:**\n- Windows Event Logs (4624, 4625, 4688, 4698)\n- Firewall deny/allow logs\n- DNS query logs\n- Authentication logs (AD, LDAP)\n\n📊 Use the JeztBrain **Real-Time Monitoring** dashboard for live telemetry and automated alert correlation.`;
  }

  if (msg.includes('expert') || msg.includes('connect') || msg.includes('specialist') || msg.includes('analyst')) {
    return `**JeztBrain Expert Network — Connection Available**\n\nOur verified SOC specialists are available 24/7:\n\n- 🔴 **Incident Responders** — Active breach containment\n- 🔵 **Threat Hunters** — Proactive IOC scanning\n- 🟢 **Forensic Analysts** — Evidence collection and analysis\n- 🟡 **Compliance Auditors** — PCI-DSS, SOC2, HIPAA, GDPR\n\n**To connect with an expert:**\n1. Navigate to the **Expert Network** tab in your JeztBrain dashboard\n2. Filter by specialty, rating, and availability\n3. Start a secure **Live Chat** session\n\nYour security concern will be matched with the most relevant expert.`;
  }

  if (msg.includes('report') || msg.includes('generate') || msg.includes('scan') || msg.includes('jeztbrain') || msg.includes('dashboard') || msg.includes('platform')) {
    return `**JeztBrain Platform Features — AI Assistant**\n\nHere is what the JeztBrain platform can do for you:\n\n| Feature | Description |\n|---|---|\n| AI Threat Detection | Real-time behavioral analysis & zero-day blocking |\n| Real-Time Monitoring | Live telemetry across all endpoints |\n| Expert Network | Connect with certified SOC specialists |\n| Incident Response | Automated PICERL workflow + live escalation |\n| Threat Intelligence | Global IOC feeds & CVE correlation |\n| AI Reports | Auto-generated forensic & compliance reports |\n| Security Dashboard | Unified SOC operations center |\n| Live Chat with Experts | Instant secure communication |\n\nWhat would you like to explore?`;
  }

  // Cybersecurity-related but no specific pattern matched
  return `**JeztBrain AI Assistant — Cybersecurity Query Received**\n\nI've received your query: "*${message.substring(0, 100)}${message.length > 100 ? '...' : ''}*"\n\nI can assist with:\n- 🛡️ Incident reporting and response\n- 🔍 CVE & vulnerability analysis\n- 🦠 Malware & ransomware triage\n- 🎣 Phishing investigation\n- 📊 SIEM alert correlation\n- 👥 Connecting you with JeztBrain experts\n\nPlease provide more detail about your security concern so I can give you precise guidance.`;
};

// ── Main Chat Response Function ─────────────────────────────────────────────
export const getAIChatResponse = async (message, history = []) => {
  const hasGroqKey = process.env.GROQ_API_KEY &&
                     process.env.GROQ_API_KEY !== 'REPLACE_WITH_GROQ_API_KEY' &&
                     process.env.GROQ_API_KEY.startsWith('gsk_');

  const hasOpenAIKey = process.env.OPENAI_API_KEY && 
                       process.env.OPENAI_API_KEY !== 'REPLACE_WITH_OPENAI_API_KEY' &&
                       process.env.OPENAI_API_KEY.startsWith('sk-');

  const hasGeminiKey = process.env.GEMINI_API_KEY && 
                       process.env.GEMINI_API_KEY !== 'REPLACE_WITH_GEMINI_API_KEY';

  // ── 0. Live Threat Intel Injection ───────────────────────────────────────
  const foundCVEs = extractCVEs(message);
  let liveContext = '';

  if (foundCVEs.length > 0) {
    try {
      const intelResults = await Promise.all(foundCVEs.map(id => getCVEIntelligence(id)));
      const validIntel = intelResults.filter(Boolean);
      
      if (validIntel.length > 0) {
        liveContext = `\n\n[LIVE THREAT INTELLIGENCE]\nUse this real-time data for the response:\n${JSON.stringify(validIntel, null, 2)}\n\nIf isKEV is true, add the CISA Warning.`;
      }
    } catch (intelErr) {
      console.error('[AIService] Threat Intel lookup failed:', intelErr.message);
    }
  }

  // ── Primary: Groq (FREE tier — llama-3.3-70b-versatile) ─────────────────
  if (hasGroqKey && groq) {
    try {
      console.log('[AIService] Groq uplink active (llama-3.3-70b-versatile)...');
      const chatMessages = [
        { role: 'system', content: SYSTEM_PROMPT + liveContext },
        ...history.map(h => ({
          role: h.sender_type === 'ai' ? 'assistant' : 'user',
          content: h.message,
        })),
        { role: 'user', content: message },
      ];

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 1024,
      });

      const aiText = response.choices?.[0]?.message?.content;
      if (aiText) return aiText;
      throw new Error('Empty response from Groq');
    } catch (groqErr) {
      if (groqErr.status === 429) {
        console.warn('[AIService] Groq rate limit — falling back to OpenAI.');
      } else {
        console.warn('[AIService] Groq error:', groqErr.message);
      }
      // fall through to OpenAI
    }
  }

  // ── Secondary: OpenAI ───────────────────────────────────────────────────
  if (hasOpenAIKey) {
    try {
      console.log('[AIService] OpenAI uplink active...');
      const chatMessages = [
        { role: 'system', content: SYSTEM_PROMPT + liveContext },
        ...history.map(h => ({
          role: h.sender_type === 'ai' ? 'assistant' : 'user',
          content: h.message,
        })),
        { role: 'user', content: message },
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 600,
      });

      return response.choices[0].message.content;
    } catch (openAiErr) {
      if (openAiErr.status === 429) {
        console.warn('[AIService] OpenAI quota exceeded — switching to Gemini.');
      } else {
        console.warn('[AIService] OpenAI error:', openAiErr.message);
      }
      // fall through to Gemini
    }
  }

  // ── Tertiary: Google Gemini ─────────────────────────────────────────────
  if (hasGeminiKey && genAI) {
    try {
      console.log('[AIService] Switching to Gemini fallback...');
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const geminiHistory = history
        .filter(h => h.message && h.message.trim())
        .map(h => ({
          role: h.sender_type === 'ai' ? 'model' : 'user',
          parts: [{ text: h.message }],
        }));

      const chat = model.startChat({
        history: geminiHistory,
        generationConfig: { maxOutputTokens: 600 },
      });

      const fullPrompt = `${SYSTEM_PROMPT}${liveContext}\n\nUser Query: ${message}`;
      const result = await chat.sendMessage(fullPrompt);
      return result.response.text();
    } catch (geminiErr) {
      console.error('[AIService] Gemini fallback failed:', geminiErr.message);
    }
  }

  // ── Final Fallback: Smart Offline Responses ──────────────────────────────
  console.warn('[AIService] No AI keys configured — serving offline response.');
  return getOfflineResponse(message);
};

// ── Generate Incident Report ─────────────────────────────────────────────────
export const generateIncidentReport = async (incidentData) => {
  const prompt = `As a Senior SOC Analyst, generate a professional tactical cybersecurity incident report:

Incident Type: ${incidentData.incidenttype}
Severity: ${incidentData.severitylevel}
Description: ${incidentData.description}
Affected Systems: ${incidentData.affectedsystems}
Ticket Number: ${incidentData.ticket_number}

Generate a Markdown report with sections:
1. EXECUTIVE SUMMARY
2. TECHNICAL ANALYSIS
3. IMPACT ASSESSMENT
4. CONTAINMENT & MITIGATION STEPS
5. INDICATORS OF COMPROMISE (IOCs)
6. LONG-TERM RECOMMENDATIONS`;

  // Try Groq first for report generation
  if (groq && process.env.GROQ_API_KEY?.startsWith('gsk_')) {
    try {
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are an expert SOC analyst.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.warn('[AIService] Groq report gen failed, trying OpenAI:', err.message);
    }
  }

  // Fallback to OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert SOC analyst.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('[AIService] Report Gen Error:', err.message);
    throw new Error('AI_REPORT_GENERATION_FAILED', { cause: err });
  }
};

// ── Analyze Threat ───────────────────────────────────────────────────────────
export const analyzeThreat = async (query) => {
  const prompt = `Analyze the following security indicator and provide tactical intelligence:
"${query}"

Include:
- Potential Threat Actor
- Severity Level
- Known Exploitation Techniques
- Recommended Defensive Actions`;

  // Try Groq first for threat analysis
  if (groq && process.env.GROQ_API_KEY?.startsWith('gsk_')) {
    try {
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 1024,
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.warn('[AIService] Groq threat analysis failed, trying OpenAI:', err.message);
    }
  }

  // Fallback to OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('[AIService] Threat Analysis Error:', err.message);
    throw new Error('AI_THREAT_ANALYSIS_FAILED', { cause: err });
  }
};
