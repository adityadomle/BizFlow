import React, { useState, useEffect } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const UserTourGuide = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Tour steps configuration
  const steps = [
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to BizFlow! 🚀</h2>
          <p className="text-gray-700 leading-relaxed">
            Let's take a quick tour to help you get familiar with all the amazing features and sections of our platform.
          </p>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <span>⏱️ This tour takes about 2 minutes</span>
          </div>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="navbar"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Navigation Bar</h3>
          <p className="text-gray-700">
            Use this navigation bar to quickly jump to different sections of our platform. 
            All main areas are accessible from here.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="hero"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
          <p className="text-gray-700">
            This is our main banner showcasing our core value proposition and key call-to-action buttons.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="features"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Features Overview</h3>
          <p className="text-gray-700">
            Explore our comprehensive feature set that makes BizFlow the perfect solution for your business needs.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="services"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Services Section</h3>
          <p className="text-gray-700">
            Discover all the services we offer, from scheduling to monitoring and comprehensive business solutions.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="pricing"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Pricing Plans</h3>
          <p className="text-gray-700">
            Check out our flexible pricing options designed to fit businesses of all sizes and requirements.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="testimonials"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Customer Testimonials</h3>
          <p className="text-gray-700">
            Read what our satisfied customers have to say about their experience with BizFlow.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="newsletter"]',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Stay Connected</h3>
          <p className="text-gray-700">
            Subscribe to our newsletter to get the latest updates, tips, and exclusive offers delivered to your inbox.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: 'body',
      content: (
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tour Complete! 🎉</h2>
          <p className="text-gray-700 leading-relaxed">
            You've successfully completed the tour! You're now ready to explore BizFlow and make the most of our platform.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm font-medium">
              💡 Tip: You can restart this tour anytime by clicking the tour button.
            </p>
          </div>
        </div>
      ),
      placement: 'center',
    },
  ];

  // Auto-start tour - always start automatically
  useEffect(() => {
    // Clear any existing tour completion flag
    localStorage.removeItem('bizflow-tour-completed');
    
    console.log('Starting tour automatically in 1 second...');
    // Start tour automatically after 1 second
    setTimeout(() => {
      console.log('Setting run to true');
      setRun(true);
    }, 1000);
  }, []);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      setStepIndex(0);
      // Don't save completion flag so tour can restart on page reload
      // localStorage.setItem('bizflow-tour-completed', 'true');
    }
  };

  return (
    <>
      {/* Tour Guide Component */}
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        steps={steps}
        stepIndex={stepIndex}
        styles={{
          options: {
            primaryColor: '#3B82F6',
            backgroundColor: '#ffffff',
            textColor: '#374151',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
          },
          tooltip: {
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontSize: '16px',
            padding: '24px',
            maxWidth: '400px',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipTitle: {
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#1F2937',
          },
          tooltipContent: {
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#4B5563',
          },
          buttonNext: {
            backgroundColor: '#3B82F6',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 20px',
            transition: 'all 0.2s',
          },
          buttonBack: {
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: '600',
            marginRight: '12px',
          },
          buttonSkip: {
            color: '#9CA3AF',
            fontSize: '14px',
            fontWeight: '500',
          },
          buttonClose: {
            color: '#9CA3AF',
            fontSize: '14px',
            fontWeight: '500',
          },
          spotlight: {
            borderRadius: '8px',
          },
          beacon: {
            backgroundColor: '#3B82F6',
          },
          beaconInner: {
            backgroundColor: '#3B82F6',
          },
          progress: {
            backgroundColor: '#E5E7EB',
            borderRadius: '4px',
            height: '4px',
          },
          progressBar: {
            backgroundColor: '#3B82F6',
            borderRadius: '4px',
          },
        }}
        locale={{
          back: '← Back',
          close: 'Close',
          last: 'Finish Tour',
          next: 'Next →',
          skip: 'Skip Tour',
        }}
      />
    </>
  );
};

export default UserTourGuide;
