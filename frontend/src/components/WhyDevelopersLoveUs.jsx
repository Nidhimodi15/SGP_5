import React from 'react';

const WhyDevelopersLoveUs = () => {
 return (
    <div className="flex bg-bg-dark justify-center items-center  px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start bg-[#060628] w-full max-w-7xl rounded-3xl gap-10 p-10">
        
        {/* Left Section */}
        <div className="flex flex-col flex-1">
          <h2 className="text-3xl font-bold text-white font-sans">
            Why developers <span className="text-[#ff0404]">love us ❤️</span>
          </h2>
          <p className="text-lg text-gray-400 mt-4 font-sans">
            We've built the platform we always wanted for ourselves. Fast, flexible, and designed with developer experience in mind.
          </p>
          <ul className="mt-6 text-white space-y-2 text-lg font-sans">
            <li>✔️ TypeScript & React support</li>
            <li>✔️ Serverless architecture</li>
            <li>✔️ Developer Experience</li>
            <li>✔️ Extensive documentation</li>
            <li>✔️ Flexible</li>
            <li>✔️ Fast</li>
          </ul>
        </div>

        {/* Right Section (Code block) */}
        <div className="bg-[#13132b] rounded-xl shadow-lg p-6 font-mono text-sm leading-relaxed text-gray-300 flex-1 w-full lg:max-w-xl">
          <p className="mb-2 text-gray-400">// It's this simple to get started</p>
          <code className="block mb-2 text-white">import {'{ createApp }'} from 'saasflow';</code>

          <code className="block text-white">const app = createApp({`{`}</code>
          <code className="block pl-4 text-white">name: 'My Awesome SaaS',</code>
          <code className="block pl-4 text-white">theme: 'dark',</code>
          <code className="block text-white">{`});`}</code>

          <p className="my-3 text-gray-400">// Add AI capabilities</p>
          <code className="block text-white">app.useAI({`{`}</code>
          <code className="block pl-4 text-white">model: 'advanced',</code>
          <code className="block pl-4 text-white">
            features: ['code-generation', 'debugging']
          </code>
          <code className="block text-white">{`});`}</code>

          <p className="my-3 text-gray-400">// Deploy with one command</p>
          <code className="block text-white">app.deploy();</code>
        </div>
      </div>
    </div>
  );
};

export default WhyDevelopersLoveUs;
