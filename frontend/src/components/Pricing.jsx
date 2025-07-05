import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Hobby',
    description: 'Perfect for side projects and experiments',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    features: [
      { name: '1 project', included: true },
      { name: '5,000 API requests/mo', included: true },
      { name: 'Community support', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Standard templates', included: true },
      { name: 'Custom domains', included: false },
      { name: 'Team collaboration', included: false },
      { name: 'Priority support', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'White-labeling', included: false }
    ],
    cta: 'Start for free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For professional developers and small teams',
    price: {
      monthly: '$29',
      yearly: '$19',
    },
    features: [
      { name: 'Unlimited projects', included: true },
      { name: '50,000 API requests/mo', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'All templates', included: true },
      { name: 'Custom domains', included: true },
      { name: 'Team collaboration (up to 5)', included: true },
      { name: 'SSO Authentication', included: false },
      { name: 'SLA guarantees', included: false },
      { name: 'White-labeling', included: false }
    ],
    cta: 'Get started',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with complex requirements',
    price: {
      monthly: '$99',
      yearly: '$79',
    },
    features: [
      { name: 'Unlimited projects', included: true },
      { name: 'Unlimited API requests', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'All templates', included: true },
      { name: 'Custom domains', included: true },
      { name: 'Team collaboration (unlimited)', included: true },
      { name: 'SSO Authentication', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'White-labeling', included: true }
    ],
    cta: 'Contact sales',
    popular: false,
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="flex justify-center bg-bg-dark items-center flex-row p-10">
      <div className="flex flex-col w-full">
        <main>
          <section>
            <div className="container mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Simple, transparent pricing
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Choose the plan that's right for you. All plans include a 14-day trial.
                </p>

                <div className="inline-flex items-center p-1 bg-dark-300 rounded-full shadow-inner">
                  <button
                    className={`px-5 py-2 rounded-full transition-all font-semibold ${
                      billingCycle === 'monthly'
                        ? 'text-white bg-gradient-to-r from-purple-400 to-pink-500 shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-5 py-2 rounded-full transition-all font-semibold ${
                      billingCycle === 'yearly'
                        ? 'text-white bg-gradient-to-r from-[#3818d6] to-[#a084f9] shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setBillingCycle('yearly')}
                  >
                    Yearly
                    <span className="ml-2 text-xs px-2 py-0.5 rounded text-white">Save 30%</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`glass rounded-2xl overflow-hidden transition-all duration-300 border-2 hover:shadow-2xl hover:scale-105 ${
                      plan.popular ? 'border-purple-600 shadow-purple/30' : 'border-gray-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-2 text-center text-sm font-medium text-white">
                        Most Popular
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-300 mb-4">{plan.description}</p>

                      <div className="flex items-end mb-4">
                        <span className="text-4xl font-extrabold text-white">
                          {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        </span>
                        <span className="text-gray-300 ml-2 mb-1">/month</span>
                      </div>
                      {billingCycle === 'yearly' && plan.name !== 'Hobby' && (
                        <p className="text-sm text-purple-300">Billed yearly</p>
                      )}

                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            {feature.included ? (
                              <Check className="mr-2 h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="mr-2 h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <div className="flex flex-col gap-3">
                          <button
                            className={`w-full py-1 text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-[#3818d6] to-[#a084f9] rounded-xl`}
                          >
                            {plan.cta}
                          </button>
                          {plan.name === 'Enterprise' && (
                            <span className="text-xs text-gray-400 text-center">
                              Custom solutions & pricing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Pricing;
