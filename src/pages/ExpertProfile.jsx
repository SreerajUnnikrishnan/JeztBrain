import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Shield, MapPin, Clock, DollarSign, Star, Briefcase, Award, CheckCircle, MessageSquare, ChevronLeft } from 'lucide-react';

const mockExpertsData = {
  'expert-1': {
    id: 'expert-1',
    name: 'Dr. Sarah Chen',
    role: 'Cloud Security Architect',
    rating: 4.9,
    reviews: 128,
    certifications: ['CISSP', 'AWS Security Specialty', 'CISM', 'CCSP'],
    experience: '12 years',
    hourlyRate: 150,
    availability: 'online',
    specialty: 'Cloud Security',
    location: 'San Francisco, CA (Remote)',
    image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff&size=256',
    bio: 'Former AWS Security Engineer specializing in zero-trust architecture and enterprise cloud transformations. I help startups and Fortune 500 companies secure their cloud infrastructure against advanced persistent threats. My approach combines automated security controls with continuous compliance monitoring.',
    skills: ['AWS IAM', 'Kubernetes Security', 'Zero Trust', 'Terraform', 'SOC2 Compliance'],
    languages: ['English', 'Mandarin'],
    completedIncidents: 145,
    responseTime: '< 15 mins'
  },
  'expert-2': {
    id: 'expert-2',
    name: 'Marcus Thorne',
    role: 'Lead Penetration Tester',
    rating: 4.8,
    reviews: 94,
    certifications: ['OSCP', 'CEH', 'CompTIA PenTest+', 'CISA'],
    experience: '8 years',
    hourlyRate: 120,
    availability: 'offline',
    specialty: 'Penetration Testing',
    location: 'London, UK (Remote)',
    image: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=10B981&color=fff&size=256',
    bio: 'Offensive security expert. I find the holes before the bad guys do. Specialized in web application and network penetration testing. I\'ve discovered critical zero-days in enterprise software and helped secure infrastructure for top fintech companies.',
    skills: ['Web App PenTesting', 'Red Teaming', 'Python', 'Burp Suite', 'Metasploit'],
    languages: ['English'],
    completedIncidents: 89,
    responseTime: '< 1 hour'
  },
  'expert-3': {
    id: 'expert-3',
    name: 'Elena Rostova',
    role: 'Incident Response Lead',
    rating: 5.0,
    reviews: 215,
    certifications: ['GCIH', 'CISSP', 'GCFA', 'GREM'],
    experience: '15 years',
    hourlyRate: 200,
    availability: 'online',
    specialty: 'Incident Response',
    location: 'Berlin, Germany (Remote)',
    image: 'https://ui-avatars.com/api/?name=Elena+Rostova&background=8B5CF6&color=fff&size=256',
    bio: 'Veteran incident responder. Handled major ransomware cases and APT intrusions for Fortune 500 companies. I bring calm to chaos during critical security events, guiding teams through containment, eradication, and recovery phases.',
    skills: ['Digital Forensics', 'Malware Analysis', 'Splunk', 'CrowdStrike', 'Crisis Management'],
    languages: ['English', 'German', 'Russian'],
    completedIncidents: 312,
    responseTime: '< 5 mins'
  },
  'expert-4': {
    id: 'expert-4',
    name: 'David Kim',
    role: 'Compliance & Audit Specialist',
    rating: 4.7,
    reviews: 62,
    certifications: ['CISA', 'ISO 27001 Lead Auditor', 'CRISC'],
    experience: '10 years',
    hourlyRate: 110,
    availability: 'online',
    specialty: 'Compliance',
    location: 'Toronto, Canada (Remote)',
    image: 'https://ui-avatars.com/api/?name=David+Kim&background=F59E0B&color=fff&size=256',
    bio: 'Helping startups and enterprises navigate SOC2, ISO 27001, and HIPAA compliance without the headache. I translate complex regulatory requirements into actionable, practical security controls that make sense for your business size.',
    skills: ['SOC2', 'ISO 27001', 'HIPAA', 'Risk Assessment', 'Policy Development'],
    languages: ['English', 'Korean'],
    completedIncidents: 56,
    responseTime: '< 2 hours'
  }
};

export default function ExpertProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHiring, setIsHiring] = useState(false);

  useEffect(() => {
    async function fetchExpert() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setExpert(data);
      } catch (err) {
        console.error("Error fetching expert:", err);
        // Fallback to mock if not found in DB yet for demo purposes
        if (mockExpertsData[id]) {
          setExpert(mockExpertsData[id]);
        } else {
          navigate('/experts');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchExpert();
  }, [id, navigate]);

  const handleStartChat = async () => {
    if (!user) {
      navigate(`/auth?redirect=/experts/${id}`);
      return;
    }
    // Navigate to chat system with this expert
    navigate(`/chat?expertId=${id}`);
  };

  const handleHireNow = async () => {
    if (!user) {
      navigate(`/auth?redirect=/experts/${id}?hire=true`);
      return;
    }

    try {
      setIsHiring(true);
      // Create an incident and assign the expert
      const incidentData = {
        user_id: user.id,
        title: `Expert Engagement: ${expert.specialty}`,
        description: `Direct hire of expert ${expert.name} for ${expert.specialty} consultation/response.`,
        severitylevel: 'medium',
        status: 'open',
        ticket_number: `HRE-${Math.floor(Math.random() * 9000) + 1000}`,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('incidents').insert([incidentData]).select();
      if (error) throw error;
      const docRef = data[0];
      
      // Navigate to the incident
      navigate(`/incidents/${docRef.id}`);
    } catch (error) {
      console.error('Error hiring expert:', error);
      alert('Failed to hire expert. Please try again.');
    } finally {
      setIsHiring(false);
    }
  };

  if (!expert) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <button 
          onClick={() => navigate('/experts')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={20} /> Back to Experts
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden sticky top-24">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 relative"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-16 left-6">
                  <div className="relative">
                    <img src={expert.image} alt={expert.name} className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-sm" />
                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${expert.availability === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                </div>

                <div className="pt-20">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{expert.name}</h1>
                  <p className="text-primary font-medium mb-4">{expert.role}</p>

                  <div className="flex items-center gap-2 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <Star className="text-yellow-500 fill-current" size={20} />
                    <span className="font-bold text-gray-900 text-lg">{expert.rating || '0.0'}</span>
                    <span className="text-sm text-gray-500">({expert.reviews || 0} reviews)</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin size={18} className="text-gray-400" />
                      <span>{expert.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} className="text-gray-400" />
                      <span>{expert.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <DollarSign size={18} className="text-gray-400" />
                      <span>${expert.hourlyRate || '0'}/hr</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MessageSquare size={18} className="text-gray-400" />
                      <span>Responds {expert.responseTime || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={handleHireNow}
                      disabled={isHiring}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white transition-colors font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isHiring ? 'Processing...' : (
                        <>
                          <Shield size={18} /> Hire Now
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleStartChat}
                      className="w-full py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 transition-colors font-semibold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare size={18} /> Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="text-primary" size={24} /> About Me
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {expert.bio}
              </p>
            </div>

            {/* Skills & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="text-primary" size={24} /> Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(expert.skills || []).map(skill => (
                    <span key={skill} className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-primary" size={24} /> Certifications
                </h2>
                <ul className="space-y-3">
                  {(expert.certifications || []).map(cert => (
                    <li key={cert} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle size={18} className="text-green-500" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{expert.completedIncidents}</div>
                  <div className="text-sm text-gray-600 font-medium">Incidents Resolved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{expert.rating}</div>
                  <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{expert.experience.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Job Success</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

