import React from 'react';

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
  return (
    <LegalLayout title="Terms of Service">
      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">1. Acceptance of Terms</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">2. Use of Services</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">3. User Obligations</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">4. Limitation of Liability</h2>
        <p>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        </p>
      </section>
    </LegalLayout>
  );
};

export const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">1. Information We Collect</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">2. How We Use Your Information</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">3. Data Security</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary-900 mb-4">4. Your Rights</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </section>
    </LegalLayout>
  );
};
