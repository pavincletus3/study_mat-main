import React from "react";
import Link from "next/link";
import { Notebook } from "lucide-react";

function Footer() {
  return (
    <footer className="pt-20 pb-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Notebook className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Studymat
              </span>
            </div>
            <p className="text-gray-500 mb-4 max-w-xs">
              Transforming how teams collaborate on documents with real-time
              editing and AI assistance.
            </p>
            {/* <div className="flex space-x-4">
              <SocialLink
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.39 4.49A13.98 13.98 0 011.67 3.15a4.917 4.917 0 001.523 6.574 4.88 4.88 0 01-2.23-.616v.061a4.917 4.917 0 003.95 4.82 4.912 4.912 0 01-2.224.084 4.917 4.917 0 004.6 3.42 9.862 9.862 0 01-6.114 2.107c-.398 0-.79-.023-1.175-.068a13.92 13.92 0 007.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A9.935 9.935 0 0024 4.557z" />
                  </svg>
                }
              />
              <SocialLink
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <SocialLink
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div> */}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Documentation</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="https://nextjs.org/docs">Nextjs</FooterLink>
              </li>
              <li>
                <FooterLink href="https://developers.cloudflare.com/">
                  Cloudflare
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://clerk.com/docs">Clerk</FooterLink>
              </li>
              <li>
                <FooterLink href="https://firebase.google.com/docs">
                  Firebase
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Working</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Testimonials</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Know Developer</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">About</FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.sathyabama.ac.in/">
                  Study
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StudyMat. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      {children}
    </Link>
  );
}
// function SocialLink({ icon }: { icon: React.ReactNode }) {
//   return (
//     <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
//       {icon}
//     </a>
//   );
// }

export default Footer;
