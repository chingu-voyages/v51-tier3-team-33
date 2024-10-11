import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';
//import Image from 'next/image';

interface InviteUserEmailProps {
  username?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  inviteLink?: string;
}

export const InviteUserEmail = ({
  username,
  invitedByUsername,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on WeSplit App`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            {/* <Section className='mt-[32px]'>
              <Image
                src={'/images/logo/app-logo-landscape.png'}
                alt='HWF do I get this image to display'
                width={250}
                height={100}
              />
            </Section> */}
            <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
              Start Using WeSplit App!
            </Heading>
            <Text className='text-black text-[14px] leading-[24px]'>
              Hello {username},
            </Text>
            <Text className='text-black text-[14px] leading-[24px]'>
              <strong>{invitedByUsername}</strong> has invited you to join the{' '}
              <strong>WeSplit App</strong>.
            </Text>

            <Section className='text-center mt-[32px] mb-[32px]'>
              <Button
                className='bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                href={inviteLink}>
                Join the app
              </Button>
            </Section>
            <Text className='text-black text-[14px] leading-[24px]'>
              or copy and paste this URL into your browser:{' '}
              <Link
                href={inviteLink}
                className='text-blue-600 no-underline'>
                {inviteLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteUserEmail.PreviewProps = {
  username: 'alanturing',
  invitedByUsername: 'Alan',
  invitedByEmail: 'alan.turing@example.com',
  inviteLink: 'https://vercel.com/teams/invite/foo',
} as InviteUserEmailProps;

export default InviteUserEmail;
