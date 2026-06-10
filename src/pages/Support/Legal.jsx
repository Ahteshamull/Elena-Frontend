import React from 'react';
import { useGetLegalDocQuery } from '../../redux/api/legalDocApi';

const LegalLayout = ({ title, children }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-serif text-primary-900 leading-tight mb-4">{title}</h1>
          <div className="h-1 w-20 bg-accent rounded-full"></div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Terms = () => {
  const { data, isLoading, error } = useGetLegalDocQuery('termsAndCondition');

  if (isLoading) {
    return <LegalLayout title="Terms of Service"><p>Loading...</p></LegalLayout>;
  }

  if (error) {
    return <LegalLayout title="Terms of Service"><p>Error loading content.</p></LegalLayout>;
  }

  const document = data?.data?.[0];

  return (
    <LegalLayout title="Terms of Service">
      {document?.description ? (
        <div dangerouslySetInnerHTML={{ __html: document.description }} />
      ) : data?.message ? (
        <p>{data.message}</p>
      ) : (
        <p>No content available.</p>
      )}
    </LegalLayout>
  );
};

export const Privacy = () => {
  const { data, isLoading, error } = useGetLegalDocQuery('privacyPolicy');

  if (isLoading) {
    return <LegalLayout title="Privacy Policy"><p>Loading...</p></LegalLayout>;
  }

  if (error) {
    return <LegalLayout title="Privacy Policy"><p>Error loading content.</p></LegalLayout>;
  }

  const document = data?.data?.[0];

  return (
    <LegalLayout title="Privacy Policy">
      {document?.description ? (
        <div dangerouslySetInnerHTML={{ __html: document.description }} />
      ) : data?.message ? (
        <p>{data.message}</p>
      ) : (
        <p>No content available.</p>
      )}
    </LegalLayout>
  );
};
