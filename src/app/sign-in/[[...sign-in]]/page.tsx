'use client';

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
