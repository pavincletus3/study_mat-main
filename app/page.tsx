"use client";
import Footer from "@/components/footer";
import {
  Users,
  ZapIcon,
  Edit,
  FileText,
  MessageSquare,
  Upload,
  Bot,
  ArrowRight,
  ExternalLink,
  Mic,
  Notebook,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { createNewDocument } from "@/actions/actions";


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartCollaborating = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      {/* <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Notebook className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                NoteCollab
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:inline-flex px-4 py-2 rounded-md text-blue-600 border border-blue-200 hover:border-blue-400 transition-colors">
                Log in
              </button>
              <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(220,230,255,0.4),transparent_70%)]"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6">
              <span className="text-blue-700 text-sm font-medium">
                StudyMat The Place to Study, Enjoy and Collaborate
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900">
              Create, Collaborate, Communicate
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              A powerful collaborative editor with live cursor tracking, AI
              assistant, and document chat capabilities. Edit together in
              real-time and interact with your documents like never before.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={handleStartCollaborating}
                disabled={isPending}
                className="px-8 py-4 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Creating Tab..." : "Start Collaborating"}{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-8 py-4 rounded-md bg-white text-gray-700 border border-gray-200 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
                Watch Demo <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Preview Window */}
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform rotate-1 rounded-xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center border-b border-gray-200">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="w-full max-w-md mx-auto bg-white rounded-md px-3 py-1 text-sm text-gray-600 border border-gray-200">
                  studymat.com/doc/sathyabamanotes
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 min-h-[300px]">
                <div className="md:col-span-3 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Blockchain</h3>
                  <div className="h-40 border-l-2 border-blue-400 pl-3 mb-4">
                    <p className="text-gray-700">
                      Blockchain is a distributed ledger technology (DLT) that
                      uses a distributed database to record and verify
                      transactions between users. It is a decentralized system
                      that ensures...
                    </p>
                    <div className="mt-2 text-xs text-blue-600">
                      Pavin is typing...
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">
                        P
                      </div>
                      <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs">
                        S
                      </div>
                      <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">
                        A
                      </div>
                    </div>
                    <span>3 collaborators</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Chat
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs">
                          P
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg text-xs text-gray-700">
                          Can you summarize the key points?
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 text-xs">
                          AI
                        </div>
                        <div className="bg-indigo-50 p-2 rounded-lg text-xs text-gray-700">
                          Its Nothing Special, Even this technology discontinued
                          by sathyabama university Go and find
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full border border-gray-200 pl-3 pr-8 py-1 text-xs"
                      placeholder="Ask a question..."
                    />
                    <button className="absolute right-2 top-1 text-blue-500">
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats underneath preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-blue-500 mb-1">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">1,000+</div>
                <div className="text-gray-500 text-sm">Active Users</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-blue-500 mb-1">
                  <Edit className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">1k+</div>
                <div className="text-gray-500 text-sm">Tabs Created</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-blue-500 mb-1">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">10k</div>
                <div className="text-gray-500 text-sm">AI Interactions</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-blue-500 mb-1">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-gray-500 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-4">
            <span className="text-blue-700 text-sm font-medium">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Everything You Need for Seamless Collaboration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines real-time editing capabilities with advanced
            AI features to transform how teams work together on documents.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-white" />}
            title="Real-time Collaboration"
            description="See who's editing what with live cursors and text tracking. Multiple users can edit the same document simultaneously without conflicts."
            gradient="from-blue-500 to-indigo-500"
          />
          <FeatureCard
            icon={<Bot className="h-8 w-8 text-white" />}
            title="AI-Powered Assistant"
            description="Chat directly with your notes. Ask questions, get summaries, and receive smart suggestions as you write."
            gradient="from-indigo-500 to-purple-600"
          />
          <FeatureCard
            icon={<Upload className="h-8 w-8 text-white" />}
            title="Document Upload & Chat"
            description="Upload PDFs and other files, then chat with them alongside your team. Extract insights and collaborate on analysis."
            gradient="from-purple-600 to-pink-600"
          />
          <FeatureCard
            icon={<Mic className="h-8 w-8 text-white" />}
            title="Mic Access"
            description="Discuss documents in real-time with integrated Voice Chat. Keep conversations in context with your content."
            gradient="from-pink-600 to-red-500"
          />
          <FeatureCard
            icon={<ZapIcon className="h-8 w-8 text-white" />}
            title="Instant Summarization and Translation"
            description="Generate concise summaries of long documents with one click and translate into your language. Save time and boost productivity."
            gradient="from-red-500 to-orange-500"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-white" />}
            title="Secure Authentication"
            description="Enterprise-grade security with Clerk authentication. Control who has access to your documents and conversations."
            gradient="from-orange-500 to-yellow-500"
          />
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 mb-4">
                <span className="text-indigo-700 text-sm font-medium">
                  Interactive Experience
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">See How It Works</h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the power of real-time collaboration with AI
                assistance. Our platform makes document editing and team
                communication seamless.
              </p>

              <div className="space-y-6">
                <Feature
                  number="01"
                  title="Create New Tab"
                  description="Start with a blank canvas and create your own document and notes for your studies."
                />
                <Feature
                  number="02"
                  title="Invite Team Members"
                  description="Add collaborators with just an email. They'll join instantly with live cursor tracking."
                />
                <Feature
                  number="03"
                  title="Edit Together in Real-time"
                  description="See changes as they happen. No more waiting for saves or refreshes."
                />
                <Feature
                  number="04"
                  title="Chat with Your Document"
                  description="Ask questions, request summaries, or get clarifications directly from your content."
                />
                <Feature
                  number="05"
                  title="AI-Powered Assistant"
                  description="Chat with your notes, get summaries, and receive smart suggestions as you write."
                />
                <Feature
                  number="06"
                  title="Mic Access"
                  description="Talk and share your doubts with your friends while you write. Keep conversations in context with your content."
                />
                <Feature
                  number="07"
                  title="Ask for translations"
                  description="Generate the summary for your document in your native language."
                />
              </div>

              <button className="mt-10 px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                Try It Yourself <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform -rotate-2 rounded-xl blur opacity-10"></div>
              <div className="relative bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center border-b border-gray-200">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Studymat - Your study companion
                  </div>
                </div>
                <div className="p-6 min-h-[400px] flex flex-col">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Upload a PDF</h4>
                      <p className="text-sm text-gray-500">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg flex-grow flex items-center justify-center p-10">
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="text-gray-500 mb-4">
                        Drop your file here or click to browse
                      </p>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                        Select File
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-grow bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        Upload a document to start collaborating with AI and
                        your team...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 mb-4">
              <span className="text-green-700 text-sm font-medium">
                What Users Say
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Loved by Students and teachers especially Sathyabamites
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Studymat is transforming how teams collaborate on
              documents and share knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="My District dont have any train station. I have to ask my parent how to come every time. They will arrange and book tickets. But now i can write notes so that i can remember how can i go to my district...Hurray!!"
              name="Suman Adhithya"
              title="Vetti Paiyan from Theni"
              bgColor="bg-blue-50"
              accentColor="text-blue-600"
            />
            <Testimonial
              quote="Ithoda developer ennoda frienduh nu solla romba perumaiya iruku. Enga ooru perumaiya soldrathuku varthaigal pathaathu, Notebook la eluthuna page thinthu poguthu. But intha website la unlimited ah elutha mudiyuthu"
              name="Bavith Mariyan"
              title="Owner of Karaikudi tha po**ey"
              bgColor="bg-indigo-50"
              accentColor="text-indigo-600"
            />
            <Testimonial
              quote="Vanthirukka endam Super Pattaiya kelapalaam. Na oru vaati mudivu paanitu ithula notes eduthuta en pecha naaney kekamaaten, Chatgptye answer sollum"
              name="Thalapathy Vijay"
              title="Head of TVK Party"
              bgColor="bg-purple-50"
              accentColor="text-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      {/* <section
        id="pricing"
        className="py-20 px-4 bg-gradient-to-br from-white to-blue-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-4">
              <span className="text-blue-700 text-sm font-medium">
                Simple Pricing
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're an individual or a large team, we have the perfect
              plan for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for individuals just getting started"
              features={[
                "Up to 5 documents",
                "3 collaborators per document",
                "Basic AI summaries",
                "7-day history",
              ]}
              buttonText="Get Started"
              isPrimary={false}
            />
            <PricingCard
              title="Pro"
              price="$12"
              description="For professionals and small teams"
              features={[
                "Unlimited documents",
                "10 collaborators per document",
                "Advanced AI features",
                "PDF uploads & chat",
                "30-day history",
                "Priority support",
              ]}
              buttonText="Try Pro Free"
              isPrimary={true}
              badge="Popular"
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large organizations with advanced needs"
              features={[
                "Unlimited everything",
                "Custom integrations",
                "Advanced security",
                "Admin controls",
                "Dedicated support",
                "Training & onboarding",
              ]}
              buttonText="Contact Sales"
              isPrimary={false}
            />
          </div>
        </div>
      </section> */}

      {/* Creator Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Created by</h2>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
            <img
              src="/pav.jpg"
              alt="Pavin Cletus"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-xl font-medium">Pavin Cletus</h3>
          <p className="text-gray-500">Full Stack Developer</p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com/pavincletus3"
              className="text-gray-400 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/in/pavin-cletus-b1540211a"
              className="text-gray-400 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.94 7.67C6.94 8.71 6.1 9.54 5.03 9.54H5C3.96 9.54 3.13 8.71 3.13 7.67C3.13 6.64 3.97 5.8 5 5.8C6.06 5.8 6.94 6.64 6.94 7.67ZM3.36 10.92H6.65V20.65H3.36V10.92ZM9.44 10.92H12.57V12.35H12.62C13.06 11.59 14.06 10.74 15.54 10.74C19 10.74 19.63 13.02 19.63 16.03V20.65H16.32V16.55C16.32 15.41 16.3 13.96 14.75 13.96C13.18 13.96 12.93 15.19 12.93 16.47V20.65H9.62V10.92H9.44Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/pavin_cletus/"
              className="text-gray-400 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7 2C3.69 2 1 4.69 1 8V16C1 19.31 3.69 22 7 22H17C20.31 22 23 19.31 23 16V8C23 4.69 20.31 2 17 2H7ZM17 4C19.21 4 21 5.79 21 8V16C21 18.21 19.21 20 17 20H7C4.79 20 3 18.21 3 16V8C3 5.79 4.79 4 7 4H17ZM18 6C17.45 6 17 6.45 17 7C17 7.55 17.45 8 18 8C18.55 8 19 7.55 19 7C19 6.45 18.55 6 18 6ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 9C13.65 9 15 10.35 15 12C15 13.65 13.65 15 12 15C10.35 15 9 13.65 9 12C9 10.35 10.35 9 12 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Helper Components
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-6">
        <div
          className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-r ${gradient}`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

interface FeatureProps {
  number: string;
  title: string;
  description: string;
}

function Feature({ number, title, description }: FeatureProps) {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4 flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  bgColor: string;
  accentColor: string;
}

function Testimonial({
  quote,
  name,
  title,
  bgColor,
  accentColor,
}: TestimonialProps) {
  return (
    <div className={`${bgColor} rounded-xl p-8 relative overflow-hidden`}>
      <div className="absolute top-2 left-2 text-4xl opacity-20 font-serif">
        <span className={accentColor}>"</span>
      </div>
      <p className="text-gray-700 mb-6 relative z-10">{quote}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}

// interface PricingCardProps {
//   title: string;
//   price: string;
//   description: string;
//   features: string[];
//   buttonText: string;
//   isPrimary: boolean;
//   badge?: string;
// }

// function PricingCard({
//   title,
//   price,
//   description,
//   features,
//   buttonText,
//   isPrimary,
//   badge,
// }: PricingCardProps) {
//   return (
//     <div
//       className={`rounded-xl p-8 ${
//         isPrimary
//           ? "bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-xl"
//           : "bg-white border border-gray-200"
//       } relative`}
//     >
//       {badge && (
//         <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
//           {badge}
//         </div>
//       )}
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <div className="flex items-baseline mb-4">
//         <span className="text-3xl font-bold">{price}</span>
//         {price !== "Custom" && (
//           <span
//             className={`${isPrimary ? "text-blue-100" : "text-gray-500"} ml-2`}
//           >
//             /month
//           </span>
//         )}
//       </div>
//       <p className={`${isPrimary ? "text-blue-100" : "text-gray-600"} mb-6`}>
//         {description}
//       </p>

//       <ul className="space-y-3 mb-8">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center">
//             <svg
//               className={`h-5 w-5 ${
//                 isPrimary ? "text-blue-300" : "text-blue-500"
//               } mr-2`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <span className={isPrimary ? "text-white" : "text-gray-600"}>
//               {feature}
//             </span>
//           </li>
//         ))}
//       </ul>

//       <button
//         className={`w-full py-3 rounded-md font-medium ${
//           isPrimary
//             ? "bg-white text-indigo-600 hover:bg-blue-50 shadow-md"
//             : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-blue-200"
//         } transition-colors`}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// }
